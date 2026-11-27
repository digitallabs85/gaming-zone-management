'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Gamepad2, LogOut, Menu, X } from 'lucide-react';
import { NAV } from '@/lib/nav';
import { useAuth } from '@/store/auth';
import { AUTHENTICATION } from '@/lib/config';
import { seed } from '@/lib/seed';

function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const pathname = usePathname();
  const router = useRouter();

    useEffect(() => {
    Promise.resolve(useAuth.persist.rehydrate()).then(() => {
      if (!AUTHENTICATION) useAuth.getState().guestLogin();
      setReady(true);
    });
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const current = NAV.find((n) => pathname.startsWith(n.href));
  const allowed = !!user && (!current || current.roles.includes(user.role));

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace('/login');
    else if (!allowed) router.replace('/dashboard');
  }, [ready, user, allowed, router]);

  const ok = ready && !!user && allowed;
  const links = user ? NAV.filter((n) => n.roles.includes(user.role)) : [];
  const initials =
    user?.name
      ?.split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'GZ';

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 print:bg-white print:text-black">
      <div
        inert={!ok}
        className={
          ok
            ? 'relative flex min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200'
            : 'hidden'
        }
      >
        {/* Ambient neon depth & subtle grid (hidden on print) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 overflow-hidden print:hidden"
        >
          <div className="absolute -left-32 -top-32 h-96 w-96 bg-cyan-500/[0.08] blur-[120px]" />
          <div className="absolute -bottom-32 right-0 h-96 w-96 bg-fuchsia-600/[0.07] blur-[130px]" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        {/* Mobile backdrop */}
        {mobileOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden print:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col justify-between border-r border-white/[0.08] bg-[#0b0e16]/95 p-4 backdrop-blur-xl transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 print:hidden ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-6 overflow-y-auto">
            {/* Brand Header */}
            <div className="flex items-center justify-between px-1 pt-1">
              <Link href="/dashboard" className="group flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 via-indigo-500/15 to-fuchsia-500/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-shadow group-hover:shadow-[0_0_26px_rgba(6,182,212,0.35)]">
                  <Gamepad2 size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold uppercase tracking-[0.14em] text-white">
                    {seed.settings.businessName}
                  </span>
                </div>
              </Link>

              <button
                type="button"
                aria-label="Close sidebar"
                onClick={() => setMobileOpen(false)}
                className="border border-white/[0.08] p-1.5 text-slate-400 hover:bg-white/[0.06] hover:text-white lg:hidden"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-1.5">
              <span className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Navigation
              </span>
              <nav className="flex flex-col gap-1">
                {links.map(({ href, label, icon: Icon }) => {
                  const active = pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`group relative flex items-center gap-3 border px-3 py-2.5 text-base font-medium transition-all duration-150 ${
                        active
                          ? 'border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 via-cyan-500/[0.06] to-transparent text-white shadow-[0_0_20px_rgba(6,182,212,0.12)]'
                          : 'border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-slate-100'
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                      )}
                      <Icon
                        size={20}
                        className={
                          active
                            ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                            : 'text-slate-500 transition-colors group-hover:text-slate-300'
                        }
                      />
                      <span className="truncate">{label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* User Footer Card */}
          <div className="flex flex-col gap-3 border border-white/[0.08] bg-white/[0.03] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-fuchsia-400/30 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/25 text-sm font-bold tracking-wider text-white">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold text-slate-100">
                  {user?.name}
                </p>
                <span className="mt-0.5 inline-block border border-fuchsia-500/30 bg-fuchsia-500/10 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-fuchsia-300">
                  {user?.role}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                logout();
                router.replace('/login');
              }}
              className="flex w-full items-center justify-center gap-2 border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm font-medium text-slate-400 transition-colors cursor-pointer hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Shell */}
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#07080d]/80 px-4 backdrop-blur-xl lg:px-8 print:hidden">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open navigation"
                onClick={() => setMobileOpen(true)}
                className="border border-white/[0.08] bg-white/[0.03] p-2 text-slate-300 hover:bg-white/[0.08] hover:text-white lg:hidden"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-base font-semibold uppercase tracking-[0.12em] text-slate-200">
                {current?.label ?? 'Dashboard'}
              </h1>
            </div>

            <div className="hidden items-center gap-2 border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-sm text-slate-400 sm:flex">
              <span className="h-1.5 w-1.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span>Session Active</span>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-0 print:p-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}