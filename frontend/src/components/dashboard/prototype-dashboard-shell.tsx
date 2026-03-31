"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
};

type DashboardPanelProps = {
  className?: string;
  delay?: number;
  children: ReactNode;
};

type DashboardMetricCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  detail: string;
  tone?: "violet" | "sky" | "emerald" | "amber" | "rose";
};

type SectionHeadingProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  meta?: ReactNode;
};

const toneStyles = {
  violet:
    "border-violet-400/20 bg-violet-500/10 text-violet-200 shadow-[0_18px_40px_-28px_rgba(168,85,247,0.85)]",
  sky: "border-sky-400/20 bg-sky-500/10 text-sky-200 shadow-[0_18px_40px_-28px_rgba(56,189,248,0.85)]",
  emerald:
    "border-emerald-400/20 bg-emerald-500/10 text-emerald-200 shadow-[0_18px_40px_-28px_rgba(16,185,129,0.85)]",
  amber:
    "border-amber-400/20 bg-amber-500/10 text-amber-100 shadow-[0_18px_40px_-28px_rgba(245,158,11,0.85)]",
  rose: "border-rose-400/20 bg-rose-500/10 text-rose-100 shadow-[0_18px_40px_-28px_rgba(244,63,94,0.85)]",
} as const;

export function DashboardShell({
  eyebrow,
  title,
  description,
  actions,
  aside,
  meta,
  children,
}: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_32px_90px_-55px_rgba(56,189,248,0.45)] backdrop-blur-xl lg:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),transparent_48%,rgba(59,130,246,0.08))]" />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(300px,0.82fr)] lg:items-end">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-[11px] font-semibold tracking-[0.2em] uppercase text-sky-100">
                    {eyebrow}
                  </Badge>
                  {meta}
                </div>

                <div className="max-w-2xl space-y-3">
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    {title}
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    {description}
                  </p>
                </div>

                {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
              </div>

              {aside}
            </div>
          </motion.section>

          <div className="mt-6 space-y-6">{children}</div>
        </div>
      </div>
    </main>
  );
}

export function DashboardPanel({
  className,
  delay = 0,
  children,
}: DashboardPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <Card
        className={cn(
          "gap-0 rounded-[28px] border-white/10 bg-white/[0.04] py-0 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_26px_70px_-55px_rgba(15,23,42,0.95),0_0_42px_-34px_rgba(56,189,248,0.35)] backdrop-blur-xl",
          className,
        )}
      >
        {children}
      </Card>
    </motion.section>
  );
}

export function DashboardMetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = "sky",
}: DashboardMetricCardProps) {
  return (
    <Card className="gap-0 rounded-[24px] border-white/10 bg-white/[0.035] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_60px_-50px_rgba(15,23,42,0.95),0_0_36px_-30px_rgba(96,165,250,0.28)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="bg-linear-to-r from-white via-slate-100 to-sky-100 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
            {value}
          </p>
          <p className="text-xs leading-5 text-muted-foreground">{detail}</p>
        </div>

        <div
          className={cn(
            "grid size-12 place-items-center rounded-2xl border",
            toneStyles[tone],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

export function SectionHeading({
  icon: Icon,
  title,
  description,
  meta,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-foreground">
          <Icon className="h-5 w-5" />
        </div>

        <div className="space-y-1">
          <h2 className="bg-linear-to-r from-white via-slate-100 to-sky-100 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {meta ?? null}
    </div>
  );
}
