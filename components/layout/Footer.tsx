import Link from 'next/link';
import { ActivitySquare, Mail, MapPin, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Product Catalog', href: '#products' },
      { label: 'Quality Standards', href: '#quality' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Elikem', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Newsroom', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Support Center', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-ink text-white">
      <div className="container-app grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <ActivitySquare size={20} />
            </span>
            <span className="font-display text-xl font-bold">Elikem</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            A premium product management platform built for teams who treat inventory, quality,
            and expiry tracking as mission-critical — not an afterthought.
          </p>
          <div className="mt-6 flex gap-3">
            {[Linkedin, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-primary"
                aria-label="Social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/50">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" /> Accra, Ghana
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" /> +233 000 000 000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" /> hello@elikem.app
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>© 2026 Elikem. All rights reserved.</p>
          <p>Developed by Ramdas</p>
        </div>
      </div>
    </footer>
  );
}
