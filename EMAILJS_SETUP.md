# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS for your portfolio's contact form.

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add an Email Service

1. Go to [Email Services](https://dashboard.emailjs.com/admin/services)
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the instructions to connect your email account
5. **Copy the Service ID** - you'll need this later

### Recommended: Gmail Setup

If using Gmail:
1. Select "Gmail" as your service
2. Connect your Gmail account
3. Grant necessary permissions
4. Your Service ID will be something like: `service_abc123`

## Step 3: Create an Email Template

1. Go to [Email Templates](https://dashboard.emailjs.com/admin/templates)
2. Click "Create New Template"
3. **IMPORTANT:** Use this EXACT template structure (form field names must match):

### Email Subject Line:
```
{{subject}} - Portfolio Contact Form
```

### Email Content (Body):
```
New message from your portfolio contact form!

From: {{name}}
Email: {{email}}
Subject: {{subject}}

Message:
{{message}}

---
Reply to this email to respond directly to {{name}} at {{email}}
```

### To Email:
- Set to: `ktmjathur2001@mail.com`

### From Name:
- Set to: `{{name}}`

### Reply To:
- Set to: `{{email}}`

4. **Template Variables (must match form field names exactly):**
   - `{{name}}` - Sender's name (from form field "name")
   - `{{email}}` - Sender's email (from form field "email")
   - `{{subject}}` - Message subject (from form field "subject")
   - `{{message}}` - Message content (from form field "message")

5. **Save the template**
6. **Copy the Template ID** - you'll need this later

## Step 4: Get Your Public Key

1. Go to [Account > General](https://dashboard.emailjs.com/admin/account)
2. Scroll to "API Keys" section
3. **Copy your Public Key** (it looks like: `xyz123ABC_def456`)

## Step 5: Update Environment Variables

Open your `.env` file and update these values:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123       # From Step 2
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789     # From Step 3
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xyz123ABC_def456     # From Step 4
```

**Example:**
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_8x9y2z1
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_a1b2c3
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xR9kP3mN2vL8qW5s
```

## Step 6: Restart Development Server

After updating the environment variables:

```bash
# Stop the current dev server (Ctrl + C)
# Then restart it
npm run dev
```

## Step 7: Test the Contact Form

1. Go to your portfolio's contact page
2. Fill out all fields:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: This is a test message from EmailJS integration
3. Click "Send Message"
4. You should see a success message
5. Check your email (ktmjathur2001@mail.com) for the message

## Troubleshooting

### Error: "Failed to fetch" or CORS Error
This is the most common error. Here's how to fix it:

1. **Check your email service is connected:**
   - Go to EmailJS Dashboard > Email Services
   - Make sure your service shows "Connected" status
   - If it says "Reconnect", click it and reconnect your email

2. **Verify template variables match form fields:**
   - Template must use: `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`
   - NOT: `{{from_name}}`, `{{from_email}}`, etc.
   - Field names are case-sensitive!

3. **Check domain restrictions:**
   - Go to Account > Security
   - If you added domain restrictions, add `localhost:3000` for development
   - Or temporarily disable domain restrictions for testing

4. **Clear browser cache:**
   ```bash
   # Stop dev server
   # Clear browser cache and cookies
   # Restart dev server
   npm run dev
   ```

### Error: "EmailJS configuration is missing"
- Make sure all three environment variables are set in `.env`
- Restart your development server after updating `.env`
- Check for typos in variable names (must match exactly)
- Ensure variables start with `NEXT_PUBLIC_`

### Emails not sending
- Verify your Service ID, Template ID, and Public Key are correct
- Check that your email service is properly connected in EmailJS dashboard
- Make sure your email service is active (not paused)
- Check EmailJS dashboard > Logs for error details
- Verify the email service has permission to send emails

### Template variable errors
- **Form field names MUST match template variables:**
  - Form has: `name`, `email`, `subject`, `message`
  - Template needs: `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`
- Double-check spelling and case sensitivity

### Emails going to spam
- In your EmailJS template, use a clear subject line
- Add your domain to SPF/DKIM records (advanced)
- Ask recipients to whitelist your email address

### Status 400 / 403 errors
- Public Key might be incorrect
- Service or Template ID might be wrong
- Check EmailJS dashboard for account status

## Free Tier Limits

EmailJS free tier includes:
- **200 emails per month**
- 2 email services
- 2 email templates
- Standard support

If you need more, consider upgrading to a paid plan.

## Security Notes

- Never commit your `.env` file to Git
- The `.env` file is already in `.gitignore`
- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- EmailJS uses these public keys safely with domain restrictions

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/
- Dashboard: https://dashboard.emailjs.com/

## Alternative: Domain Restrictions

For added security, restrict your Public Key to your domain:

1. Go to EmailJS Dashboard > Account > Security
2. Add your domain (e.g., `yourportfolio.com`)
3. This prevents others from using your API key

---

**Setup Complete!** 🎉

Your contact form is now fully functional with EmailJS integration.
