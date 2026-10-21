"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';

export type ContactFormErrorMessages = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormProps = {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  footnote: string;
  errors: ContactFormErrorMessages;
  /** The WhatsApp message template, with `{name}` `{email}` `{message}` placeholders. */
  whatsappTemplate: string;
  /** Digits only, e.g. "971522755551" (contact-page form, §5.7; number from site-settings). */
  whatsappNumber: string;
};

function buildWhatsappMessage(template: string, values: { name: string; email: string; message: string }): string {
  return template
    .replaceAll('{name}', values.name)
    .replaceAll('{email}', values.email)
    .replaceAll('{message}', values.message);
}

export default function ContactForm({
  nameLabel,
  namePlaceholder,
  emailLabel,
  emailPlaceholder,
  messageLabel,
  messagePlaceholder,
  submitLabel,
  submittingLabel,
  footnote,
  errors,
  whatsappTemplate,
  whatsappNumber,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();

  const contactFormSchema = z.object({
    name: z.string().min(2, { message: errors.name }),
    email: z.string().email({ message: errors.email }),
    message: z.string().min(10, { message: errors.message }),
    // Honeypot: real visitors never see or fill this field (visually hidden below).
    website: z.string().optional(),
  });

  type ContactFormValues = z.infer<typeof contactFormSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    const whatsappMessage = buildWhatsappMessage(whatsappTemplate, data);
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp synchronously, in the same tick as the click, so browser popup
    // blockers don't block it — never await anything before this call.
    window.open(whatsappUrl, '_blank');

    // Fire-and-forget: record the submission in the CMS without ever blocking or
    // delaying the WhatsApp handoff above.
    fetch('/api/contact', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, page: pathname }),
    }).catch(() => {
      // Non-fatal — the visitor already has WhatsApp open; losing the CMS copy of
      // this submission isn't worth surfacing an error for.
    });

    setIsSubmitting(false);
    form.reset();
  };

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-8 md:p-10 rounded-3xl shadow-xl">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot — visually hidden from sighted users, left out of the tab order, but
            still present in the DOM for simple bots that fill every input. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" {...form.register('website')} />
        </div>
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-medium">
            {nameLabel}
          </label>
          <input
            id="name"
            type="text"
            placeholder={namePlaceholder}
            {...form.register("name")}
            className="w-full bg-background/50 border border-border/50 rounded-xl px-5 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500/80">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-medium">
            {emailLabel}
          </label>
          <input
            id="email"
            type="email"
            placeholder={emailPlaceholder}
            {...form.register("email")}
            className="w-full bg-background/50 border border-border/50 rounded-xl px-5 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500/80">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-medium">
            {messageLabel}
          </label>
          <textarea
            id="message"
            placeholder={messagePlaceholder}
            {...form.register("message")}
            className="w-full bg-background/50 border border-border/50 rounded-xl px-5 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all min-h-[160px] resize-none"
          />
          {form.formState.errors.message && (
            <p className="text-sm text-red-500/80">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 rounded-xl bg-accent text-accent-foreground font-medium flex items-center justify-center gap-3 hover:bg-accent/90 disabled:opacity-50 transition-all"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {submittingLabel}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              {submitLabel}
            </>
          )}
        </motion.button>

        <p className="text-center text-xs text-foreground/40">
          {footnote}
        </p>
      </form>
    </div>
  );
}
