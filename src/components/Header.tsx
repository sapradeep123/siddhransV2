'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { nav, site } from '@/content/site';
import { Button, Logo } from './ui';

const BLURB: Record<string, string> = {
  '/services/ai-ml-intelligent-automation/': 'Agents, copilots and automation',
  '/services/enterprise-software-engineering/': 'Enterprise software and 15 systems',
  '/services/embedded-systems-industrial-iot/': 'IoT, firmware, PCB and edge AI',
  '/services/cybersecurity/': 'Security, cloud and managed services',
};

export default function Header() {
  const path = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [away, setAway] = useState(false);
  useEffect(() => {
    const f = document.getElementById('site-footer');
    if (!f || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setAway(e.isIntersecting), { rootMargin: '0px 0px -12% 0px' });
    io.observe(f);
    return () => io.disconnect();
  }, [path]);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  useEffect(() => {
    if (!open) return;
    // focus moves into the sheet; Tab cycles between the menu button and the sheet; Escape closes and returns focus
    sheet.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); return; }
      if (e.key !== 'Tab') return;
      const items = [btn.current, ...Array.from(sheet.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])].filter(Boolean) as HTMLElement[];
      const first = items[0], last = items[items.length - 1], cur = document.activeElement;
      if (e.shiftKey && cur === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.innerWidth > 1280) setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [open]);

  const active = (href: string) => path === href || (href !== '/' && path.startsWith(href));
  const fade = reduce ? { duration: 0 } : { duration: 0.35 };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className={`nav${away && !open ? " nav--away" : ""}`}>
        <div className="nav__bar">
          <Logo />
          <nav className="nav__links" aria-label="Primary">
            {nav.map((n) => (<a key={n.href} href={n.href} aria-current={active(n.href) ? 'page' : undefined}>{n.label}</a>))}
          </nav>
          <Button small href="/contact/" className="nav__cta">Start a project</Button>
          <button ref={btn} className="nav__burger" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <m.div id="mobile-menu" className="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade} onClick={(e: MouseEvent) => { if (e.target === e.currentTarget) setOpen(false); }}>
            <m.div ref={sheet} className="menu__sheet" initial={reduce ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}>
              <nav aria-label="Primary" className="menu__nav">
                <p className="menu__lab" aria-hidden="true">What we do</p>
                <div className="menu__cap">
                  {nav.slice(0, 4).map((n, i) => (
                    <a key={n.href} href={n.href} aria-label={n.label} aria-describedby={`mb-${i}`} aria-current={active(n.href) ? 'page' : undefined}><b>{n.label}</b><span id={`mb-${i}`}>{BLURB[n.href]}</span></a>
                  ))}
                </div>
                <p className="menu__lab" aria-hidden="true">Company</p>
                <div className="menu__co">
                  {nav.slice(4).map((n) => (<a key={n.href} href={n.href} aria-current={active(n.href) ? 'page' : undefined}>{n.label}</a>))}
                </div>
              </nav>
              <Button href="/contact/" className="menu__cta">Start a project</Button>
              <div className="menu__foot">
                {site.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`}>{p.display}</a>)}
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <span>{site.city}, {site.country}</span>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
