'use client';

import { motion } from 'framer-motion';
import { Package, Layers, Timer } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Package,
    title: 'Structured product records',
    description:
      'Category, origin, batch number, and stock — captured consistently for every item you manage.',
  },
  {
    icon: Layers,
    title: 'Category-first organization',
    description: 'Group, filter, and report on your catalog exactly the way your team thinks about it.',
  },
  {
    icon: Timer,
    title: 'Time-aware tracking',
    description: 'Manufacturing and expiry dates drive automatic status badges — no manual review needed.',
  },
];

export function ProductHighlights() {
  return (
    <section id="products" className="bg-white py-28">
      <div className="container-app">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center lg:text-left"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary lg:mx-0">
                <item.icon size={26} />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
