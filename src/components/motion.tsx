'use client';
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';

const EASE = [0.2, 0.8, 0.2, 1] as const;

/** Loads only Motion's DOM animation features (small bundle). */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict>{children}</LazyMotion>;
}

/** Scroll-triggered fade-up. Content is visible in the server HTML; <RevealInit/> hides and then reveals it
 *  only after JavaScript runs (and never when the visitor prefers reduced motion), so nothing is lost without JS. */
export function Reveal({ children, delay = 0, className = '', style, id }: { children: ReactNode; delay?: number; y?: number; className?: string; style?: CSSProperties; id?: string }) {
  return <div id={id} className={`rv ${className}`.trim()} style={delay ? { ...style, transitionDelay: `${delay}s` } : style}>{children}</div>;
}

/** Container that staggers its StaggerItem children as it scrolls into view. */
export function Stagger({ children, className = '', style }: { children: ReactNode; className?: string; gap?: number; style?: CSSProperties }) {
  return <div className={`rv-stagger ${className}`.trim()} style={style}>{children}</div>;
}

export function StaggerItem({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={`rv-item ${className}`.trim()} style={style}>{children}</div>;
}

/** Marks elements as revealed as they enter the viewport (progressive enhancement). */
export function RevealInit() {
  const path = usePathname();
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv, .rv-stagger'));
    if (reduce || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    document.documentElement.classList.add('rv-ready');
    const vh = window.innerHeight;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((e) => { if (e.getBoundingClientRect().top < vh * 0.92) e.classList.add('in'); else io.observe(e); });
    return () => io.disconnect();
  }, [path]);
  return null;
}

/** Gentle vertical parallax tied to scroll position. */
export function Parallax({ children, speed = 40, className, style }: { children: ReactNode; speed?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  // Same element either way (no hydration mismatch); the transform is simply omitted for reduced motion.
  return <m.div ref={ref} className={`m-parallax ${className ?? ''}`} style={reduce ? style : { ...style, y }}>{children}</m.div>;
}

/** Image that drifts slightly inside its fixed frame while scrolling. */
export function ParallaxFrame({ children, amount = 7, className }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`pf ${className ?? ''}`} style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100%' }}>
      <m.div style={reduce ? { height: '100%', width: '100%' } : { y, height: `${100 + amount * 2}%`, marginTop: `-${amount}%`, width: '100%' }}>{children}</m.div>
    </div>
  );
}

export { m, useReducedMotion };
