'use client';

import { motion } from 'framer-motion';

const STATS = [
  { value: '12,000+', label: 'Products tracked' },
  { value: '340+', label: 'Teams onboarded' },
  { value: '99.9%', label: 'Platform uptime' },
  { value: '24/7', label: 'Monitoring & alerts' },
];

export function Stats() {
  return (
    <section className="border-y border-surface-border bg-primary">
      <div className="container-app grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-white/70">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
