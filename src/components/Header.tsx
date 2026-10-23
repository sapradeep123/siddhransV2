'use client';
import Link from '@/components/Link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav } from '@/content/site';
import { Logo } from './ui';

export default function Header() {
  const path = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const active = (href: string) => path === href || (href !== '/' && path.startsWith(href));

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="hdr">
        <div className="wrap">
          <Logo />
          <button ref={btn} className="burger" aria-expanded={open} aria-controls="primary-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            <span></span><span></span><span></span>
          </button>
          <nav className={`nav${open ? ' open' : ''}`} id="primary-nav" aria-label="Primary">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? 'page' : undefined}>{n.label}</Link>
            ))}
            <Link className="btn solid sm cta" href="/contact/">Talk to an engineer</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
