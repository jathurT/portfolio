import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Rate limiting (simple in-memory implementation)
const requestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // Max requests
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now - record.timestamp > RATE_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured. Please set RESEND_API_KEY environment variable.",
        },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email to yourself (notification)
    const { data: notificationData, error: notificationError } =
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>", // Replace with your verified domain
        to: [process.env.NOTIFICATION_EMAIL || "your.email@example.com"], // Your email
        replyTo: validatedData.email,
        subject: `Portfolio Contact: ${validatedData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Contact Form Submission</h2>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>From:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              <p><strong>Subject:</strong> ${validatedData.subject}</p>
            </div>
            <div style="margin: 20px 0;">
              <h3 style="color: #374151;">Message:</h3>
              <p style="line-height: 1.6; color: #4b5563;">${validatedData.message.replace(
                /\n/g,
                "<br>"
              )}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #6b7280; font-size: 12px;">
              This email was sent from your portfolio contact form.
            </p>
          </div>
        `,
      });

    if (notificationError) {
      console.error("Error sending notification email:", notificationError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send message. Please try again.",
          error: notificationError.message,
        },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const { error: confirmationError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // Replace with your verified domain
      to: [validatedData.email],
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Contacting Me!</h2>
          <p style="line-height: 1.6; color: #4b5563;">
            Hi ${validatedData.name},
          </p>
          <p style="line-height: 1.6; color: #4b5563;">
            Thank you for reaching out! I've received your message and will get back to you as soon as possible.
          </p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Message:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${validatedData.message.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>
          <p style="line-height: 1.6; color: #4b5563;">
            Best regards,<br>
            Your Name
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this message.
          </p>
        </div>
      `,
    });

    if (confirmationError) {
      console.error("Error sending confirmation email:", confirmationError);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data",
          error: error.issues[0]?.message || "Validation failed",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
