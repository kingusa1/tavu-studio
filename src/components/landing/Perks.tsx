"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const perks = [
  "Small group classes for personalized attention",
  "State-of-the-art Pilates equipment and facilities",
  "Expert instructors with international certifications",
  "Complimentary wellness consultation for new members"
];

export default function Perks() {
  return (
    <section id="perks" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] left-[15%] w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto glass p-10 lg:p-12 rounded-3xl border border-accent/10">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-headline font-bold text-primary">
              Why Choose TAVÚ?
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
            {perks.map((perk, index) => (
              <div key={index} className="flex items-start space-x-4">
                <CheckCircle2 className="w-8 h-8 flex-shrink-0 mt-1 text-accent" />
                <div>
                  <p className="text-xl font-body text-foreground">{perk}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="rounded-full font-headline transition-transform duration-300 hover:scale-105 px-10 py-7 text-lg bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
            >
              <Link href="#contact">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
