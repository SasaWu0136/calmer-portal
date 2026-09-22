'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import CalmWave from './CalmWave';

const LINKS = [
  { href: '/journey', label: 'Plan a journey' },
  { href: '/quiet-spaces', label: 'Quiet spaces' },
  { href: '/map', label: 'Map' },
  { href: '/preferences', label: 'Preferences' }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/70 bg-paper/75 backdrop-blur-xl sticky top-0 z-40">
      <div className="mx-auto max-w-content px-5 sm:px-8 h-[4.5rem] flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-lg" aria-label="Calmer home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-tram text-white shadow-soft">
            <CalmWave score={1} width={24} height={18} strokeColor="#FFFFFF" />
          </span>
          <span className="font-display text-xl tracking-tight text-ink">Calmer</span>
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-4 py-2 rounded-full text-sm transition-colors focus-ring',
                  active ? 'bg-tram-light text-tram-dark font-medium' : 'text-inkSoft hover:text-ink hover:bg-paperDim'
                )}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/journey" className="hidden 2xl:inline-flex rounded-full bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-tram-dark focus-ring">
          Plan a route
        </Link>
      </div>

      <nav aria-label="Main mobile" className="md:hidden border-t border-line px-4 py-2 flex flex-wrap gap-1.5">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'px-3 py-1.5 rounded-full text-xs transition-colors focus-ring',
                active ? 'bg-tram-light text-tram-dark font-medium' : 'text-inkSoft hover:text-ink hover:bg-paperDim'
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
