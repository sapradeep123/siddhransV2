'use client';
import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { BillingUI, Laptop, LmsUI, OpsUI, Phone, PhoneLmsUI, PhoneTalentUI, PosUI, TalentUI, Tablet } from './concept';

interface Family { id: string; n: string; title: string; sub: string; headline: string; text: string; points: string[]; systems: string[]; devices: 'lms' | 'talent' | 'business' | 'sector' }

const FAMILIES: Family[] = [
  { id: 'lms', n: '01', title: 'Education & training', sub: 'Learning management and online training', headline: 'Siddhrans LMS', devices: 'lms',
    text: 'A structured way to run programmes, deliver content, assess learners and process results, in one platform instead of spreadsheets, email and paper.',
    points: ['Programmes, batches and content in one system', 'Assessment and examination workflows', 'Result processing and reporting', 'A platform basis for examination-grade solutions'], systems: ['Siddhrans LMS', 'Online training programmes'] },
  { id: 'talent', n: '02', title: 'Talent & placement', sub: 'Three sector platforms, one engineering pattern', headline: 'Talent platforms', devices: 'talent',
    text: 'Structured talent records, searchable discovery and placement workflows, tailored to film and creative, staffing, and sports talent markets.',
    points: ['Structured talent records in place of paper', 'Searchable discovery across each sector', 'Profile, search and placement workflow', 'One engineering base, three distinct markets'], systems: ['Talent Sandalwood', 'Talent Workforce', 'Talent Sports Force'] },
  { id: 'business', n: '03', title: 'Business operations', sub: 'Billing, retail, hospitality, fitness, projects', headline: 'Operational systems', devices: 'business',
    text: 'Full-stack, database-backed, workflow-driven systems for the day-to-day running of a business, from GST-compliant billing to counters, kitchens and project tracking.',
    points: ['GST-compliant billing and records', 'Point-of-sale and operational workflows', 'Database applications and reporting', 'Built around how the business actually works'], systems: ['GST Billing', 'Point of Sale', 'Restaurant', 'Catering', 'Gym Master', 'Project Management System'] },
  { id: 'sector', n: '04', title: 'Sector systems', sub: 'Salon, cargo, dialysis, film event, inventory', headline: 'Sector systems', devices: 'sector',
    text: 'Domain-specific management systems that carry the records and workflows of a particular sector, built on the same engineering core.',
    points: ['Records and workflows specific to each sector', 'Database-backed and workflow-driven', 'Operational reporting', 'Engineered once, adapted per sector'], systems: ['Salon', 'Cargo', 'Dialysis', 'Film Event', 'Inventory management'] },
];

function Devices({ kind }: { kind: Family['devices'] }) {
  if (kind === 'lms') return (<><div className="stage__laptop"><Laptop><LmsUI /></Laptop></div><div className="stage__phone"><Phone><PhoneLmsUI /></Phone></div></>);
  if (kind === 'talent') return (<><div className="stage__laptop"><Laptop><TalentUI /></Laptop></div><div className="stage__phone"><Phone><PhoneTalentUI /></Phone></div></>);
  if (kind === 'business') return (<><div className="stage__laptop"><Laptop><BillingUI /></Laptop></div><div className="stage__tablet"><Tablet><PosUI /></Tablet></div></>);
  return (<div className="stage__laptop" style={{ width: '92%' }}><Laptop><OpsUI /></Laptop></div>);
}

/** Tabbed product showcase with device mockups. All interfaces are concept designs with placeholder data. */
export default function ProductExplorer() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const f = FAMILIES[i];

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + FAMILIES.length) % FAMILIES.length;
    setI(n); refs.current[n]?.focus();
  };

  return (
    <div className="explorer">
      <div className="explorer__tabs" role="tablist" aria-label="Product families" aria-orientation="vertical" onKeyDown={onKey}>
        {FAMILIES.map((x, k) => (
          <button key={x.id} ref={(el) => { refs.current[k] = el; }} id={`tab-${x.id}`} role="tab" className="xt" aria-selected={i === k} aria-controls="stage-panel" tabIndex={i === k ? 0 : -1} onClick={() => setI(k)}>
            <small>{x.n}</small><b>{x.title}</b><span>{x.sub}</span>
          </button>
        ))}
      </div>
      <div className="explorer__stage" id="stage-panel" role="tabpanel" aria-labelledby={`tab-${f.id}`}>
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={f.id} initial={reduce ? false : { opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }} transition={{ duration: reduce ? 0 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}>
            <div className="stage__devices"><Devices kind={f.devices} /></div>
            <div className="stage__info">
              <div>
                <span className="eyebrow">{f.title}</span>
                <h3>{f.headline}</h3>
                <p>{f.text}</p>
                <ul className="stage__list">{f.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
              <div>
                <span className="mono" style={{ color: 'var(--slate-400)' }}>Systems in this family</span>
                <ul className="stage__chips" style={{ margin: '14px 0 0', padding: 0 }}>{f.systems.map((s) => <li key={s}>{s}</li>)}</ul>
                <p className="stage__note">Concept interface designs with placeholder data, illustrating the kind of software in this family. They are not screenshots of delivered products.</p>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
