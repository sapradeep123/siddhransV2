'use client';
import { useEffect, useRef, useState } from 'react';
import { lifecycle } from '@/content/site';

/** Eight lifecycle stages; the progress rail fills and the stages light up in sequence when scrolled into view. */
export default function Lifecycle() {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setLit(lifecycle.length); return; }
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let n = 0;
      timer = setInterval(() => { n += 1; setLit(n); if (n >= lifecycle.length) clearInterval(timer); }, 320);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); if (timer) clearInterval(timer); };
  }, []);

  return (
    <div className="life" ref={ref} style={{ ['--p' as string]: lit / lifecycle.length }}>
      <div className="life__rail" aria-hidden="true"><i /></div>
      {lifecycle.map(([t, d], i) => (
        <div key={t} className={`life__step${i < lit ? ' on' : ''}`}>
          <div className="life__dot">{String(i + 1).padStart(2, '0')}</div>
          <h3>{t}</h3>
          <p>{d}</p>
        </div>
      ))}
    </div>
  );
}
