'use client';
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface TabItem { id: string; label: string; node: ReactNode }

/** Accessible tabs (arrow keys, roving tabindex). Only the selected panel is mounted, so hidden images are never requested. */
export default function TabSet({ items, label, idp, className = '' }: { items: TabItem[]; label: string; idp: string; className?: string }) {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + items.length) % items.length;
    setI(n); refs.current[n]?.focus();
  };
  const cur = items[i];
  return (
    <div className={`v4-tabs ${className}`.trim()}>
      <div className="v4-tabs__list" role="tablist" aria-label={label} onKeyDown={onKey}>
        {items.map((x, k) => (
          <button key={x.id} ref={(el) => { refs.current[k] = el; }} type="button" role="tab" id={`${idp}-t-${x.id}`} className="v4-tab" aria-selected={i === k} aria-controls={`${idp}-p`} tabIndex={i === k ? 0 : -1} onClick={() => setI(k)}>{x.label}</button>
        ))}
      </div>
      <div id={`${idp}-p`} role="tabpanel" aria-labelledby={`${idp}-t-${cur.id}`} className="v4-tabs__panel">{cur.node}</div>
    </div>
  );
}
