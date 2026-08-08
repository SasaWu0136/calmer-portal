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
    <header className="border-b border-line bg-paper/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-content px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-lg" aria-label="Calmer home">
          <CalmWave score={1} width={30} height={22} strokeColor="#3F6E5D" />
          <span className="font-display text-lg tracking-tight text-ink">Calmer</span>
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-3 py-2 rounded-full text-sm transition-colors focus-ring',
                  active ? 'bg-tram-light text-tram-dark font-medium' : 'text-inkSoft hover:text-ink hover:bg-paperDim'
                )}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/admin"
          className="hidden sm:inline-block text-xs text-inkSoft hover:text-ink underline underline-offset-4 focus-ring rounded"
        >
          Admin
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
