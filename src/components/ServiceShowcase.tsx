'use client';
import { useEffect, useState } from 'react';
import { Arrow, Photo, Pill } from './ui';
import { serviceStatusLabel, type Service, type ServiceStatus } from '@/content/services';
import type { PhotoName } from '@/content/images';

const KIND: Record<ServiceStatus, 'built' | 'cap' | 'eng'> = { built: 'built', evidenced: 'built', capability: 'cap', solutions: 'eng' };

export interface ShowcaseItem { service: Service; photo: PhotoName; pos?: string; blurb: string; points: string[] }

/** Interactive service showcase: hover, focus or tap a panel to open it. Stacks vertically on tablets and phones. */
export default function ServiceShowcase({ items }: { items: ShowcaseItem[] }) {
  const [open, setOpen] = useState(0);
  const [hoverable, setHoverable] = useState(false);
  useEffect(() => { setHoverable(window.matchMedia('(min-width: 1181px) and (hover: hover)').matches); }, []);

  return (
    <div className="showcase" role="group" aria-label="Services">
      {items.map(({ service: s, photo, pos, blurb, points }, i) => {
        const isOpen = open === i;
        return (
          <article key={s.slug} className="sp" data-open={isOpen} onMouseEnter={hoverable ? () => setOpen(i) : undefined}>
            <div className="sp__img"><Photo name={photo} pos={pos} sizes="(min-width:1181px) 45vw, 100vw" alt="" /></div>
            <span className="sp__n">{s.n}</span>
            <span className="sp__vert" aria-hidden="true">{s.short}</span>
            <span className="sp__mt" aria-hidden="true">{s.short}</span>
            <button type="button" className="sp__toggle" aria-expanded={isOpen} aria-controls={`sp-${s.slug}`} aria-label={`${s.title}: ${isOpen ? 'expanded' : 'show details'}`} onClick={() => setOpen(i)} onFocus={() => setOpen(i)} />
            <div className="sp__body" id={`sp-${s.slug}`}>
              <Pill kind={KIND[s.status]}>{serviceStatusLabel[s.status]}</Pill>
              <h3>{s.title}</h3>
              <p>{blurb}</p>
              <ul className="sp__list">{points.map((p) => <li key={p}>{p}</li>)}</ul>
              <a className="go" href={`/services/${s.slug}/`} tabIndex={isOpen ? 0 : -1}>Explore {s.short} <Arrow /></a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
