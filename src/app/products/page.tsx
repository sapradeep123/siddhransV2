import type { Metadata } from 'next';
import Link from '@/components/Link';
import { Arrow, Cta, PageHero, RawSvg, Sheet, Tag } from '@/components/ui';
import { interfaceSchematics } from '@/components/svgart';

export const metadata: Metadata = {
  title: 'Products & Solutions',
  description: 'Fifteen named software systems built since 2016, and a proposed secure examination environment combining software, infrastructure and security.',
  alternates: { canonical: '/products/' },
};

const fams: { key: keyof typeof interfaceSchematics; group: string; items: [string, string][] }[] = [
  { key: 'lms', group: 'Education & training', items: [['Siddhrans LMS', 'Programme and batch management, content delivery, assessment and result workflows, reporting.'], ['Online training programmes', 'Online training delivery.']] },
  { key: 'talent', group: 'Talent & placement', items: [['Talent Sandalwood', 'Film and creative-industry talent: profiles, search, placement workflow.'], ['Talent Workforce', 'Staffing and workforce placement.'], ['Talent Sports Force', 'Sports talent and placement.']] },
  { key: 'ops', group: 'Business operations', items: [['GST Billing', 'GST-compliant billing and records.'], ['Point of Sale', ''], ['Restaurant', ''], ['Catering', ''], ['Gym Master', ''], ['Project Management System', '']] },
  { key: 'sector', group: 'Sector systems', items: [['Salon', ''], ['Cargo', ''], ['Dialysis', ''], ['Film Event', ''], ['Inventory management', '']] },
];
const EXAM = ['Candidate', 'Exam lab & candidate device', 'Secure boot & endpoint controls', 'Identity & authentication', 'Controlled, isolated network', 'Examination server & platform', 'Secure data & database', 'Result processing', 'Audit logging, monitoring & recovery'];

export default function Products() {
  return (
    <>
      <PageHero photo="code-screen" crumbs={[{ href: '/', label: 'Home' }, { label: 'Products & Solutions' }]}>
        <h1>Software we have <mark>built</mark>. Solutions we can engineer.</h1>
        <p className="lede" style={{ maxWidth: '60ch' }}>Fifteen named systems built since 2016 — full-stack, database-backed, workflow-driven — and solution architectures that combine software, infrastructure and security.</p>
      </PageHero>

      <section id="systems" aria-labelledby="h-sy"><div className="wrap">
        <Sheet n="01" a="Systems built" b="Since 2016" />
        <h2 id="h-sy" style={{ maxWidth: '22ch' }}>Fifteen named systems, four families.</h2>
        <div className="fams rv">
          {fams.map((f) => (
            <div className="fam" key={f.key}>
              <RawSvg html={interfaceSchematics[f.key]} />
              <div>
                <span className="mono">{f.group}</span>
                <ul>{f.items.map(([n, d]) => <li key={n}>{n}{d && <small>{d}</small>}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
        <p className="fine" style={{ marginTop: 22 }}>Interface drawings are generic schematics, not screenshots of these products. Client names are not listed. Descriptions are shown only where the company profile provides them.</p>
      </div></section>

      <section id="case-studies" style={{ background: 'var(--white)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }} aria-labelledby="h-cs"><div className="wrap">
        <Sheet n="02" a="Case studies" b="Delivered platforms" />
        <h2 id="h-cs" style={{ maxWidth: '22ch' }}>Two platforms, in detail.</h2>
        <p className="lede" style={{ marginTop: 18 }}>The Siddhrans LMS and the Talent platforms are described in full on the <Link href="/case-studies/" style={{ textDecoration: 'underline', textDecorationColor: 'var(--yellow)', textDecorationThickness: 3, textUnderlineOffset: 4 }}>case studies page</Link>.</p>
        <div style={{ marginTop: 28 }}><Link className="btn" href="/case-studies/">Read the case studies <Arrow /></Link></div>
      </div></section>

      <section aria-labelledby="h-ex"><div className="wrap">
        <Sheet n="03" a="Integrated solution" b="Proposed" />
        <div className="cols2" style={{ alignItems: 'end' }}>
          <div><Tag kind="prop">Proposed solution</Tag><h2 id="h-ex" style={{ marginTop: 18, maxWidth: '20ch' }}>Securing the complete examination environment.</h2></div>
          <p className="lede" style={{ margin: 0 }}>One use case where the whole company shows up: software, infrastructure and security engineered as a single chain. Presented as a solution architecture, not a completed deployment.</p>
        </div>
        <div className="exam rv">{EXAM.map((e) => <div key={e}>{e}</div>)}</div>
        <div className="two" style={{ marginTop: 48 }}>
          <div><h3>Where each discipline enters</h3>
            <ul className="ticks one" style={{ marginTop: 14 }}>
              <li><b>Software engineering:</b> examination platform and result processing, built on our delivered LMS engineering.</li>
              <li><b>Cloud &amp; infrastructure:</b> exam servers, controlled networks, hardened labs, backup.</li>
              <li><b>Cybersecurity:</b> secure boot, identity controls, isolation, monitoring.</li>
              <li><b>Data &amp; analytics:</b> secure records, audit trails, operational analytics.</li>
            </ul></div>
          <div className="notebox" style={{ marginTop: 0 }}><b>Status. </b>Proposed solution: an integration of delivered examination-platform engineering with our infrastructure and security capability, presented as a solution architecture and not as a completed deployment.</div>
        </div>
      </div></section>
      <Cta title="Looking for a system like one of these?" />
    </>
  );
}
