import type { Metadata } from 'next';
import ProductExplorer from '@/components/ProductExplorer';
import { Laptop, LmsUI, Phone, PhoneTalentUI } from '@/components/concept';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { BigCta, Button, Crumbs, Eyebrow, PhotoCard, Pill, SecHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Products & Solutions',
  description: 'Fifteen named software systems built since 2016, and a proposed secure examination environment combining software, infrastructure and security.',
  alternates: { canonical: '/products/' },
};

const EXAM = ['Candidate', 'Exam lab & candidate device', 'Secure boot & endpoint controls', 'Identity & authentication', 'Controlled, isolated network', 'Examination server & platform', 'Secure data & database', 'Result processing', 'Audit logging, monitoring & recovery'];

export default function Products() {
  return (
    <>
      <header className="hero" style={{ paddingBottom: 0 }}>
        <div className="hero__bg" aria-hidden="true"><div className="hero__grid" /></div>
        <div className="container hero__inner" style={{ paddingBottom: 'clamp(70px,8vw,120px)' }}>
          <div className="hero__copy">
            <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Products & Solutions' }]} />
            <h1 className="h-xl" style={{ margin: '20px 0 22px' }}>Software we have <span className="hl">built</span>. Solutions we can engineer.</h1>
            <p className="lede">Fifteen named systems built since 2016: full-stack, database-backed, workflow-driven. Plus solution architectures that combine software, infrastructure and security.</p>
            <div className="hero__actions" style={{ marginTop: 34 }}>
              <Button href="#showcase">Explore the showcase</Button>
              <Button href="/case-studies/" variant="ghost">Read the case studies</Button>
            </div>
          </div>
          <div style={{ position: 'relative', paddingBottom: '9%' }}>
            <div style={{ width: '90%' }}><Laptop><LmsUI /></Laptop></div>
            <div style={{ position: 'absolute', right: 0, bottom: 0, width: '24%' }}><Phone><PhoneTalentUI /></Phone></div>
          </div>
        </div>
      </header>

      <section className="sec sec--navy diag-top" id="systems" aria-labelledby="h-sy" style={{ marginTop: 0 }}>
        <div className="container">
          <Reveal id="showcase"><SecHead row eyebrow="Product showcase" title={<span id="h-sy">Fifteen named systems, four families.</span>} lede="Choose a family to see the kind of interface and workflow it provides. Every interface is a concept design with placeholder data, shown to illustrate the software, not a screenshot of a delivered product." /></Reveal>
          <Reveal delay={0.05}><ProductExplorer /></Reveal>
        </div>
      </section>

      <section className="sec sec--white" aria-labelledby="h-eng">
        <div className="container">
          <Reveal><SecHead row eyebrow="How it is engineered" title={<span id="h-eng">The same engineering core under every system.</span>} lede="From the company profile: full-stack, database-backed, workflow-driven software in production use." /></Reveal>
          <Stagger className="cardgrid">
            {[['Full-stack', 'Web and mobile front ends, application logic and data layer engineered together.'], ['Database-backed', 'Structured, queryable records instead of spreadsheets and paper.'], ['Workflow-driven', 'Approvals, assessments, placements and billing modelled as explicit workflows.']].map(([t, d], i) => (
              <StaggerItem key={t}><div className="card" style={{ height: '100%' }}><small>{String(i + 1).padStart(2, '0')}</small><h3>{t}</h3><p>{d}</p></div></StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="sec sec--mist" id="case-studies" aria-labelledby="h-cs">
        <div className="container">
          <Reveal><SecHead row eyebrow="Case studies" title={<span id="h-cs">Two platforms, in detail.</span>} lede="How the learning platform and the talent platforms came about, what they cover, and what they enabled." /></Reveal>
          <Stagger className="cardgrid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
            <StaggerItem>
              <a className="casecard" href="/case-studies/#lms"><PhotoCard name="lecture-hall" sizes="(min-width:960px) 48vw, 100vw" pos="50% 40%" /><Pill kind="built">Systems built</Pill><h3>Siddhrans LMS</h3><p>Training delivery, structured end to end: programmes, content, assessment and results.</p><span className="linkarrow" style={{ color: '#fff', alignSelf: 'flex-start' }}>Read the case study</span></a>
            </StaggerItem>
            <StaggerItem>
              <a className="casecard" href="/case-studies/#talent"><PhotoCard name="interview-panel" sizes="(min-width:960px) 48vw, 100vw" pos="50% 40%" /><Pill kind="built">Systems built</Pill><h3>Talent platforms</h3><p>One engineering pattern, three talent markets: film, staffing and sports.</p><span className="linkarrow" style={{ color: '#fff', alignSelf: 'flex-start' }}>Read the case study</span></a>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="sec sec--dark diag-both" aria-labelledby="h-ex">
        <div className="container">
          <Reveal>
            <div className="sec-head sec-head--row">
              <div style={{ display: 'grid', gap: 18 }}><Eyebrow>Integrated solution</Eyebrow><div><Pill kind="prop">Proposed solution</Pill></div><h2 id="h-ex" className="h-xl">Securing the complete examination environment.</h2></div>
              <p className="lede">One use case where the whole company shows up: software, infrastructure and security engineered as a single chain. Presented as a solution architecture, not a completed deployment.</p>
            </div>
          </Reveal>
          <div className="exam" role="list" aria-label="Examination environment chain">
            {EXAM.map((e, i) => (<div className="exam__s" role="listitem" key={e} data-n={String(i + 1).padStart(2, '0')} style={{ ['--i' as string]: i } as React.CSSProperties}>{e}</div>))}
          </div>
          <div className="two" style={{ marginTop: 'clamp(36px,5vw,64px)' }}>
            <ul className="tickgrid tickgrid--one">
              <li><span><b>Software engineering:</b> examination platform and result processing, built on our delivered LMS engineering.</span></li>
              <li><span><b>Cloud &amp; infrastructure:</b> exam servers, controlled networks, hardened labs, backup.</span></li>
              <li><span><b>Cybersecurity:</b> secure boot, identity controls, isolation, monitoring.</span></li>
              <li><span><b>Data &amp; analytics:</b> secure records, audit trails, operational analytics.</span></li>
            </ul>
            <div className="notice" style={{ marginTop: 0 }}><b>Status. </b>Proposed solution: an integration of delivered examination-platform engineering with our infrastructure and security capability, presented as a solution architecture and not as a completed deployment.</div>
          </div>
        </div>
      </section>
      <BigCta title="Looking for a system like one of these?" />
    </>
  );
}
