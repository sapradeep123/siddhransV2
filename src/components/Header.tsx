'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { nav, site } from '@/content/site';
import { Button, Logo } from './ui';

export default function Header() {
  const path = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    const onResize = () => { if (window.innerWidth > 1180) setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [open]);

  const active = (href: string) => path === href || (href !== '/' && path.startsWith(href));
  const fade = reduce ? { duration: 0 } : { duration: 0.35 };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav">
        <div className="nav__bar">
          <Logo />
          <nav className="nav__links" aria-label="Primary">
            {nav.map((n) => (<a key={n.href} href={n.href} aria-current={active(n.href) ? 'page' : undefined}>{n.label}</a>))}
          </nav>
          <Button small href="/contact/" className="nav__cta">Talk to an engineer</Button>
          <button ref={btn} className="nav__burger" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <m.div id="mobile-menu" className="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade}>
            <nav aria-label="Primary" style={{ position: 'relative' }}>
              {nav.map((n, i) => (
                <m.a key={n.href} href={n.href} aria-current={active(n.href) ? 'page' : undefined} initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.08 + i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}>
                  <small>{String(i + 1).padStart(2, '0')}</small>{n.label}
                </m.a>
              ))}
              <m.a href="/contact/" initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.08 + nav.length * 0.06, ease: [0.2, 0.8, 0.2, 1] }} style={{ color: 'var(--yellow)' }}>
                <small>→</small>Talk to an engineer
              </m.a>
            </nav>
            <div className="menu__foot">
              <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span>{site.city}, {site.country}</span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
