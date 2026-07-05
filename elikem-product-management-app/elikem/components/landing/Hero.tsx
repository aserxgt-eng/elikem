'use client';

/**
 * Hero section — signature element is the animated "pulse line" that draws
 * itself on load, echoing a vitals monitor without using any medical iconography.
 * This reinforces the healthcare-grade-quality positioning without copying
 * any specific brand's imagery.
 */
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-40 pb-24">
      {/* Faint grid backdrop for a technical, precise feel */}
      <div className="absolute inset-0 bg-hero-grid bg-[size:48px_48px] opacity-[0.4] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_40%,transparent_100%)]" />

      <div className="container-app relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary"
          >
            <ShieldCheck size={14} /> Trusted inventory intelligence
          </motion.div>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]">
            {'Know exactly what’s'.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                className="mr-3 inline-block"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <span className="text-gradient">in every batch, every shelf.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft"
          >
            Elikem gives operations, quality, and warehouse teams one clean source of truth for
            stock levels, expiry dates, and batch traceability — with the polish of a platform
            you'd trust with your entire catalog.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/register">
              <Button size="lg" className="group w-full sm:w-auto">
                Start free
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore the platform
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-10 flex items-center gap-6 text-sm text-ink-muted"
          >
            <span>No credit card required</span>
            <span className="h-1 w-1 rounded-full bg-ink-muted" />
            <span>Set up in minutes</span>
          </motion.div>
        </div>

        {/* Vitals-style pulse line visual — the page's signature motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          <div className="rounded-3xl border border-surface-border bg-surface-light p-8 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Inventory Health
                </p>
                <p className="mt-1 font-display text-3xl font-bold text-ink">98.6% Optimal</p>
              </div>
              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                Live
              </span>
            </div>

            <svg viewBox="0 0 400 120" className="mt-6 w-full">
              <path
                d="M0,60 L60,60 L80,20 L100,100 L120,40 L140,60 L200,60 L220,30 L240,90 L260,60 L400,60"
                fill="none"
                stroke="#0066CC"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1000"
                className="animate-pulse-line"
              />
            </svg>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: 'Active SKUs', value: '2,481' },
                { label: 'Near Expiry', value: '32' },
                { label: 'Avg. Turnover', value: '6.2d' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white p-3 text-center shadow-soft">
                  <p className="font-display text-lg font-bold text-ink">{stat.value}</p>
                  <p className="text-[11px] text-ink-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-4 shadow-elevated sm:block">
            <p className="text-xs text-ink-muted">Batch verified</p>
            <p className="font-display text-sm font-bold text-primary">#EL-2026-0417</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
