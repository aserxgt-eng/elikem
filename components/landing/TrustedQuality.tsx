'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const POINTS = [
  'Full batch-level traceability from manufacture to shelf',
  'Automated expiry monitoring with configurable alert windows',
  'Audit-ready export trails for every product change',
  'Encrypted authentication and role-based data access',
];

export function TrustedQuality() {
  return (
    <section id="quality" className="bg-white py-28">
      <div className="container-app grid items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Trusted Quality
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Built to the standard your catalog deserves
          </h2>
          <p className="mt-4 max-w-lg text-ink-soft">
            Elikem was designed around the same rigor used in regulated, quality-sensitive
            industries — so every product record stays accurate, traceable, and audit-ready.
          </p>

          <ul className="mt-8 space-y-4">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                <span className="text-sm text-ink-soft">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl bg-gradient-to-br from-primary to-secondary p-1"
        >
          <div className="rounded-[calc(1.5rem-4px)] bg-white p-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Compliance score', value: '100%' },
                { label: 'Batches verified', value: '18.4k' },
                { label: 'Avg. resolve time', value: '2.1h' },
                { label: 'Data accuracy', value: '99.98%' },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-surface-border p-5 text-center"
                >
                  <p className="font-display text-2xl font-extrabold text-ink">{metric.value}</p>
                  <p className="mt-1 text-xs text-ink-muted">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
