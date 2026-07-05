import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-light px-6 text-center">
      <p className="font-display text-6xl font-extrabold text-primary">404</p>
      <h1 className="font-display text-2xl font-bold text-ink">Page not found</h1>
      <p className="max-w-sm text-sm text-ink-soft">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
