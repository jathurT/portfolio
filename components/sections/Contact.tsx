"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal, Magnetic, Icon } from "@/components/lib/motion";
import type { ContactFormData } from "@/types";

export default function Contact() {
  const data = PORTFOLIO_DATA;
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) emailjs.init(publicKey);
  }, []);

  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(
        () => setSubmitStatus({ type: null, message: "" }),
        6000
      );
      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        time: new Date().toLocaleString(),
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (response.status === 200) {
        setSubmitStatus({
          type: "success",
          message:
            "message sent — thanks. i'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send email. Status: " + response.status);
      }
    } catch (error: unknown) {
      console.error("EmailJS Error:", error);
      let errorMessage = "failed to send. please try again later.";
      if (error && typeof error === "object") {
        const e = error as { text?: string; message?: string };
        if (e.text) errorMessage = `error: ${e.text}`;
        else if (e.message) errorMessage = e.message;
      }
      setSubmitStatus({ type: "error", message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="section contact"
      id="contact"
      data-section-label="contact"
    >
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="num">10</span>
            <span className="line" />
            <span>get in touch</span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="contact-title">
            let&apos;s build
            <br />
            something<span className="accent-text">.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="contact-sub">
            I just wrapped my internship at IronOne and I&apos;m looking for a
            full-time software engineering role — backend, devops / platform,
            ai/ml, or anywhere the lines blur. If you&apos;ve got a system that
            should hold up, I&apos;d love to talk.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-name">name</label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="your name"
                />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-email">email</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="cf-field">
              <label htmlFor="cf-subject">subject</label>
              <input
                id="cf-subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="what's this about?"
              />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-message">message</label>
              <textarea
                id="cf-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="your message…"
              />
            </div>

            <button
              type="submit"
              className="btn btn-fill cf-submit"
              data-link=""
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="cf-spinner" />
                  sending…
                </>
              ) : (
                <>
                  send message <Icon.ArrR />
                </>
              )}
            </button>

            {submitStatus.type && (
              <div
                className={
                  "cf-status " +
                  (submitStatus.type === "success" ? "ok" : "err")
                }
                role="status"
              >
                {submitStatus.message}
              </div>
            )}
          </form>
        </Reveal>

        <Reveal delay={220} className="contact-actions">
          <Magnetic strength={0.25}>
            <a
              className="btn btn-ghost"
              data-link=""
              href={"mailto:" + data.person.email}
            >
              {data.person.email} <Icon.ArrR />
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              className="btn btn-ghost"
              data-link=""
              href={data.person.socials.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              linkedin <Icon.ArrUR />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={280} className="socials">
          <a
            data-link=""
            href={data.person.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            github · @jathurT
          </a>
          <a
            data-link=""
            href={data.person.socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            linkedin · @jathurt
          </a>
          <a
            data-link=""
            href={data.person.socials.leetcode}
            target="_blank"
            rel="noreferrer"
          >
            leetcode · @ktmjathur2001
          </a>
          <a
            data-link=""
            href={data.person.socials.medium}
            target="_blank"
            rel="noreferrer"
          >
            medium · @jathurt
          </a>
        </Reveal>
      </div>
    </section>
  );
}
