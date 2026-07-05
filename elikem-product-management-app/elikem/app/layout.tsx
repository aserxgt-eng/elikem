import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/hooks/useAuth';
import { ToastProvider } from '@/lib/hooks/useToast';

const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
});
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Elikem — Modern Product Management',
  description:
    'Elikem is a premium product management platform for tracking inventory, expiry, and quality — built for teams that treat their catalog like it matters.',
  keywords: ['Elikem', 'product management', 'inventory', 'dashboard', 'quality tracking'],
  authors: [{ name: 'Ramdas' }],
  openGraph: {
    title: 'Elikem — Modern Product Management',
    description:
      'Track inventory, expiry, and quality in one clean, premium dashboard.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-sans">
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
