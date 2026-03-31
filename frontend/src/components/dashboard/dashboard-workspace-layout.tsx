"use client";

import type { ReactNode } from "react";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DashboardNavItem = {
  to: string;
  icon: LucideIcon;
  label: string;
  description: string;
};

type DashboardWorkspaceLayoutProps = {
  workspaceLabel: string;
  workspaceName: string;
  workspaceDescription: string;
  navItems: DashboardNavItem[];
  actions?: ReactNode;
  headerMeta?: ReactNode;
  sidebarFooter?: ReactNode;
  children: ReactNode;
};

const isItemActive = (pathname: string, item: DashboardNavItem) =>
  pathname === item.to || pathname.startsWith(`${item.to}/`);

export function DashboardWorkspaceLayout({
  workspaceLabel,
  workspaceName,
  workspaceDescription,
  navItems,
  actions,
  headerMeta,
  sidebarFooter,
  children,
}: DashboardWorkspaceLayoutProps) {
  const location = useLocation();
  const activeItem =
    navItems.find((item) => isItemActive(location.pathname, item)) ?? navItems[0];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 self-start overflow-y-auto border-r border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] backdrop-blur lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-5 py-6">
            <Badge className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-100">
              {workspaceLabel}
            </Badge>
            <h1 className="mt-4 bg-linear-to-r from-white via-slate-100 to-sky-100 bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
              {workspaceName}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {workspaceDescription}
            </p>
          </div>

          <div className="flex-1 px-4 py-6">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-[22px] border px-4 py-3 transition-colors",
                      isActive
                        ? "border-sky-400/20 bg-sky-500/10 text-foreground shadow-[0_18px_38px_-30px_rgba(56,189,248,0.65)]"
                        : "border-transparent bg-transparent text-muted-foreground hover:border-white/10 hover:bg-white/[0.03] hover:text-foreground",
                    )
                  }
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 grid size-9 place-items-center rounded-2xl border border-white/10 bg-white/[0.03]">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="mt-1 text-xs text-inherit/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </NavLink>
              ))}
            </nav>
          </div>

          {sidebarFooter ? (
            <div className="border-t border-white/10 px-4 py-4">{sidebarFooter}</div>
          ) : null}

          <div className="border-t border-white/10 px-4 py-4">
            <Button
              asChild
              variant="outline"
              className="w-full rounded-full border-white/15 bg-white/[0.03]"
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
            Log out
              </Link>
            </Button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-background/85 backdrop-blur-xl">
            <div className="grid gap-3 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-8">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-100">
                    {workspaceLabel}
                  </Badge>
                  {headerMeta}
                </div>

                <h2 className="mt-2 truncate bg-linear-to-r from-white via-slate-100 to-sky-100 bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
                  {activeItem.label}
                </h2>
                <p className="mt-1 hidden max-w-xl text-sm leading-6 text-muted-foreground md:block">
                  {activeItem.description}
                </p>
              </div>

              {actions ? (
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  {actions}
                </div>
              ) : null}
            </div>
          </header>

          <div className="relative flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_42%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.1),transparent_36%)]" />
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-background/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-4">
          {navItems.map((item) => {
            const active = isItemActive(location.pathname, item);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "flex min-w-0 flex-col items-center justify-center gap-1 px-2 py-3 text-[11px] font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </main>
  );
}
