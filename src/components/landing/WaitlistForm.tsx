"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Send, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// --- Schema ---
const waitlistFormSchema = z.object({
  name: z.string().min(2, { message: "What shall we call you?" }),
  email: z.string().email({ message: "We need a valid email to send your key." }),
  phone: z.string().min(5, { message: "Just to reach you securely." }),
})

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>

export default function WaitlistForm() {
  // --- State ---
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  // --- Form ---
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: { name: "", email: "", phone: "" },
  })

  // --- Questions Flow ---
  const questions = [
    {
      key: 'name' as const,
      label: "What is your name?",
      placeholder: "e.g. Sarah",
      type: "text"
    },
    {
      key: 'email' as const,
      label: `Hello, ${form.getValues('name') || 'Guest'}. What's your email?`,
      placeholder: "name@example.com",
      type: "email"
    },
    {
      key: 'phone' as const,
      label: "And your phone number?",
      placeholder: "+971 ...",
      type: "tel"
    },
  ];

  // --- Handlers ---
  const nextStep = async () => {
    const currentField = questions[step].key;
    const isValid = await form.trigger(currentField);
    if (isValid) {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => {
    setStep(s => Math.max(0, s - 1));
  }

  const onSubmit = async () => {
    setIsSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    // Construct a fake form element for EmailJS since we are custom handling
    const formElement = document.createElement('form');
    const data = form.getValues();

    // Hidden inputs
    ['name', 'email', 'phone'].forEach(key => {
      const input = document.createElement('input');
      input.name = key;
      input.value = data[key as keyof WaitlistFormValues];
      formElement.appendChild(input);
    });
    // Mock country/source/consent for now or add them to the flow if critical
    // For this high-level demo, keeping it minimal:
    const source = document.createElement('input'); source.name = 'source'; source.value = 'Portal'; formElement.appendChild(source);

    try {
      await emailjs.sendForm(serviceId, templateId, formElement, publicKey);
      setIsCompleted(true);
      toast({
        title: "Welcome to TAVÚ!",
        description: "We'll be in touch shortly to start your journey.",
      });
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly at connect@tavustudio.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-accent" />
        </div>
        <h3 className="text-4xl font-body font-bold text-primary mb-4">Welcome to TAVÚ!</h3>
        <p className="text-foreground/70 font-headline text-xl">We'll be in touch shortly to start your journey.</p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6 md:px-12 relative">
      {/* Progress */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/10">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-3xl md:text-5xl font-body text-primary leading-tight">
              {questions[step].label}
            </h3>

            <input
              type={questions[step].type}
              {...form.register(questions[step].key)}
              placeholder={questions[step].placeholder}
              className="w-full bg-transparent border-b-2 border-primary/20 text-3xl md:text-5xl py-4 text-accent placeholder-foreground/20 focus:outline-none focus:border-accent transition-colors font-headline"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (step === questions.length - 1) onSubmit();
                  else nextStep();
                }
              }}
            />
            {form.formState.errors[questions[step].key]?.message && (
              <p className="text-red-400 text-sm animate-pulse">{form.formState.errors[questions[step].key]?.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-8">
            <div className="flex gap-4">
              {step > 0 && (
                <Button onClick={prevStep} variant="ghost" className="text-foreground/40 hover:text-foreground">
                  <ArrowLeft className="w-6 h-6 mr-2" /> Back
                </Button>
              )}
            </div>

            {step < questions.length - 1 ? (
              <Button onClick={nextStep} className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 rounded-full text-lg font-bold shadow-lg shadow-accent/20">
                Next Step <ArrowRight className="ml-2" />
              </Button>
            ) : (
              <Button onClick={onSubmit} disabled={isSubmitting} className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 rounded-full text-lg font-bold shadow-lg shadow-accent/20">
                {isSubmitting ? 'Sending...' : 'Get Started'} <Send className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
