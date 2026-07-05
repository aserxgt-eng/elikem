'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { useToast } from '@/lib/hooks/useToast';

export function Contact() {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Wire this up to your email service (e.g. Firebase Functions + SendGrid) in production.
    setTimeout(() => {
      setSubmitting(false);
      showToast('success', 'Thanks — your message has been sent.');
      (e.target as HTMLFormElement).reset();
    }, 900);
  }

  return (
    <section id="contact" className="bg-surface-light py-28">
      <div className="container-app grid gap-12 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Contact
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink">
            Let's talk about your catalog
          </h2>
          <p className="mt-4 text-ink-soft">
            Questions about onboarding, pricing, or a specific workflow? Reach out — a real person
            will get back to you within one business day.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-ink-soft">
              <Mail size={18} className="text-primary" /> hello@elikem.app
            </div>
            <div className="flex items-center gap-3 text-sm text-ink-soft">
              <Phone size={18} className="text-primary" /> +233 000 000 000
            </div>
            <div className="flex items-center gap-3 text-sm text-ink-soft">
              <MapPin size={18} className="text-primary" /> Accra, Ghana
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 space-y-5 rounded-2xl border border-surface-border bg-white p-8 shadow-soft"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Full name" placeholder="Ama Mensah" required />
            <Input label="Email" type="email" placeholder="ama@company.com" required />
          </div>
          <Input label="Subject" placeholder="How can we help?" required />
          <Textarea label="Message" placeholder="Tell us a bit about what you're looking for..." required />
          <Button type="submit" size="lg" loading={submitting} className="w-full sm:w-auto">
            Send message <Send size={16} />
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
