'use client';
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { BillingUI, Laptop, LmsUI, OpsUI, Phone, PhoneLmsUI, PhoneTalentUI, PosUI, Tablet, TalentUI } from '@/components/concept';
import { Pill } from '@/components/ui';

type Kind = 'lms' | 'talent' | 'biz' | 'sector';
interface Family { id: string; title: string; sub: string; text: string; points: string[]; systems: string[]; kind: Kind }

// Names, family descriptions and points are the verified texts from the company profile (also used on /products/).
// Exactly 15 systems: 1 + 3 + 6 + 5. Online training programmes are part of Siddhrans LMS.
export const FAMILIES: Family[] = [
  { id: 'lms', title: 'Education & training', sub: 'Siddhrans LMS, including its online training programmes', kind: 'lms',
    text: 'A structured way to run programmes, deliver content, assess learners and process results, in one platform instead of spreadsheets, email and paper.',
    points: ['Programmes, batches and content in one system', 'Assessment and examination workflows', 'Result processing and reporting', 'A platform basis for examination-grade solutions'], systems: ['Siddhrans LMS'] },
  { id: 'talent', title: 'Talent & placement', sub: 'Three sector platforms, one engineering pattern', kind: 'talent',
    text: 'Structured talent records, searchable discovery and placement workflows, tailored to film and creative, staffing, and sports talent markets.',
    points: ['Structured talent records in place of paper', 'Searchable discovery across each sector', 'Profile, search and placement workflow', 'One engineering base, three distinct markets'], systems: ['Talent Sandalwood', 'Talent Workforce', 'Talent Sports Force'] },
  { id: 'business', title: 'Business operations', sub: 'Billing, retail, hospitality, fitness, projects', kind: 'biz',
    text: 'Full-stack, database-backed, workflow-driven systems for the day-to-day running of a business, from GST-compliant billing to counters, kitchens and project tracking.',
    points: ['GST-compliant billing and records', 'Point-of-sale and operational workflows', 'Database applications and reporting', 'Built around how the business actually works'], systems: ['GST Billing', 'Point of Sale', 'Restaurant', 'Catering', 'Gym Master', 'Project Management System'] },
  { id: 'sector', title: 'Sector systems', sub: 'Salon, cargo, dialysis, film event, inventory', kind: 'sector',
    text: 'Domain-specific management systems that carry the records and workflows of a particular sector, built on the same engineering core.',
    points: ['Records and workflows specific to each sector', 'Database-backed and workflow-driven', 'Operational reporting', 'Engineered once, adapted per sector'], systems: ['Salon', 'Cargo', 'Dialysis', 'Film Event', 'Inventory management'] },
];

function Devices({ kind }: { kind: Kind }): ReactNode {
  if (kind === 'lms') return (<><div className="stage__laptop"><Laptop><LmsUI /></Laptop></div><div className="stage__phone"><Phone><PhoneLmsUI /></Phone></div></>);
  if (kind === 'talent') return (<><div className="stage__laptop"><Laptop><TalentUI /></Laptop></div><div className="stage__phone"><Phone><PhoneTalentUI /></Phone></div></>);
  if (kind === 'biz') return (<><div className="stage__laptop"><Laptop><BillingUI /></Laptop></div><div className="stage__tablet"><Tablet><PosUI /></Tablet></div></>);
  return (<div className="stage__laptop" style={{ width: '92%' }}><Laptop><OpsUI /></Laptop></div>);
}

const ALL = FAMILIES.flatMap((f) => f.systems.map((s) => ({ name: s, fam: f })));

/** Portfolio selector: pick any of the 15 systems; the panel shows the verified family text and a concept interface. */
export default function PortfolioSelector() {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = ALL[i];
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + ALL.length) % ALL.length;
    setI(n); refs.current[n]?.focus();
  };
  let idx = -1;
  return (
    <div className="v4-pf">
      <div className="v4-pf__sel" role="tablist" aria-label="The 15 systems" aria-orientation="vertical" onKeyDown={onKey}>
        <p className="mono v4-pf__hint">15 systems · choose one</p>
        {FAMILIES.map((f) => (
          <div className="v4-pf__grp" key={f.id}>
            <b className="v4-pf__gl">{f.title}</b>
            <div className="v4-pf__pills">
              {f.systems.map((s) => { idx += 1; const k = idx; return (
                <button key={s} ref={(el) => { refs.current[k] = el; }} type="button" role="tab" id={`pf-t-${k}`} className="v4-tab" aria-selected={i === k} aria-controls="pf-panel" tabIndex={i === k ? 0 : -1} onClick={() => setI(k)}>{s}</button>
              ); })}
            </div>
          </div>
        ))}
      </div>
      <div className="v4-pf__panel" id="pf-panel" role="tabpanel" aria-labelledby={`pf-t-${i}`}>
        <div className="stage__devices v4-pf__dev" aria-hidden="true"><Devices kind={cur.fam.kind} /></div>
        <p className="v4-cl">Concept interface with placeholder data, not a screenshot of a delivered product</p>
        <div className="v4-pf__info">
          <div>
            <span className="mono v4-pf__fam">{cur.fam.title} · {cur.fam.sub}</span>
            <h3>{cur.name}</h3>
            <p>{cur.fam.text}</p>
          </div>
          <div>
            <ul className="stage__list">{cur.fam.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <div style={{ marginTop: 16 }}><Pill kind="built">Systems built</Pill></div>
          </div>
        </div>
      </div>
    </div>
  );
}
