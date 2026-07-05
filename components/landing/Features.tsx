'use client';

import { motion } from 'framer-motion';
import { Boxes, ScanLine, BellRing, LineChart, ShieldCheck, FileBarChart } from 'lucide-react';

const FEATURES = [
  {
    icon: Boxes,
    title: 'Unified inventory',
    description: 'Every SKU, batch, and warehouse location in one searchable, filterable catalog.',
  },
  {
    icon: BellRing,
    title: 'Expiry & stock alerts',
    description: 'Automated notifications for near-expiry batches and low-stock thresholds.',
  },
  {
    icon: ScanLine,
    title: 'Barcode & QR tracking',
    description: 'Generate scannable codes for every product to speed up receiving and audits.',
  },
  {
    icon: LineChart,
    title: 'Live analytics',
    description: 'Dashboards that surface inventory value, turnover, and category performance.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-based access',
    description: 'Admins, managers, and viewers each get exactly the access they need.',
  },
  {
    icon: FileBarChart,
    title: 'Exportable reports',
    description: 'One-click PDF and Excel exports for audits, stakeholders, and compliance.',
  },
];

export function Features() {
  return (
    <section id="features" className="bg-surface-light py-28">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Features
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Everything your catalog needs, nothing it doesn't
          </h2>
          <p className="mt-4 text-ink-soft">
            Built for teams who need precision without complexity — every feature earns its place.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-surface-border bg-white p-7 shadow-soft transition-shadow hover:shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <feature.icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
