import Link from 'next/link';
import { ActivitySquare } from 'lucide-react';

/** Shared shell for login/register/forgot-password screens. */
export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-16 sm:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <ActivitySquare size={20} />
            </span>
            <span className="font-display text-xl font-bold text-ink">Elikem</span>
          </Link>

          <h1 className="mt-10 font-display text-2xl font-bold text-ink">{title}</h1>
          <p className="mt-2 text-sm text-ink-soft">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary to-secondary lg:block">
        <div className="absolute inset-0 bg-hero-grid bg-[size:40px_40px] opacity-10" />
        <div className="flex h-full flex-col items-center justify-center p-16 text-white">
          <blockquote className="max-w-md text-center font-display text-2xl font-semibold leading-snug">
            "Elikem replaced three spreadsheets and a shared drive. Now expiry tracking is
            actually automatic."
          </blockquote>
          <p className="mt-6 text-sm text-white/70">Operations Lead, Regional Distribution</p>
        </div>
      </div>
    </div>
  );
}
