"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const WHATSAPP_NUMBER = "971522755551";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    const whatsappMessage = `Hello TAVU,

I would like to get in touch.

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
Sent from tavustudio.com`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    form.reset();
  };

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-8 md:p-10 rounded-3xl shadow-xl">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
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
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
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
            Message
          </label>
          <textarea
            id="message"
            placeholder="How can we help you?"
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
              Opening WhatsApp...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </motion.button>

        <p className="text-center text-xs text-foreground/40">
          You'll be redirected to WhatsApp to continue the conversation
        </p>
      </form>
    </div>
  );
}
