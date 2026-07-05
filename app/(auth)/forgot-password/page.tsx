'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/validations/auth';
import { resetPassword } from '@/lib/services/auth';
import { useToast } from '@/lib/hooks/useToast';

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setSubmitting(true);
    try {
      await resetPassword(values.email);
      setSent(true);
    } catch (err: any) {
      showToast('error', 'Could not send reset email. Please check the address and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll email you a secure link to choose a new password."
    >
      {sent ? (
        <div className="rounded-xl border border-success/20 bg-success/5 p-5 text-center">
          <CheckCircle2 className="mx-auto text-success" size={32} />
          <p className="mt-3 text-sm font-medium text-ink">Check your inbox</p>
          <p className="mt-1 text-sm text-ink-soft">
            If an account exists for that email, a reset link is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email address"
            type="email"
            placeholder="you@company.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Button type="submit" className="w-full" size="lg" loading={submitting}>
            Send reset link
          </Button>
        </form>
      )}

      <p className="mt-8 text-center text-sm text-ink-soft">
        Remembered it?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
