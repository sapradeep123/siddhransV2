import type { Metadata } from 'next';
import { Cta, PageHero, RawSvg, Sheet, Tag } from '@/components/ui';
import { interfaceSchematics } from '@/components/svgart';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Two delivered platforms in detail: Siddhrans LMS for training delivery, and the Talent platforms for three talent markets.',
  alternates: { canonical: '/case-studies/' },
};

export default function CaseStudies() {
  return (
    <>
      <PageHero photo="lab-porthole" crumbs={[{ href: '/', label: 'Home' }, { label: 'Case Studies' }]}>
        <h1>Two platforms, <mark>in detail</mark>.</h1>
        <p className="lede" style={{ maxWidth: '60ch' }}>Delivered software from our engineering practice. Client names are not published.</p>
      </PageHero>

      <section id="lms" aria-labelledby="h-lms"><div className="wrap">
        <Sheet n="01" a="Education & training" b="Systems built" />
        <div className="two">
          <div>
            <Tag kind="delivered">Systems built</Tag>
            <h2 id="h-lms" style={{ margin: '18px 0 20px', maxWidth: '18ch' }}>Siddhrans LMS — training delivery, structured end to end.</h2>
            <h3 className="mono" style={{ fontSize: 13, color: 'var(--green-ink)', margin: '28px 0 8px' }}>The business requirement</h3>
            <p className="lede" style={{ margin: 0 }}>Training providers needed a structured way to run programmes, deliver content, assess learners and process results — without stitching together spreadsheets, email and paper.</p>
            <h3 className="mono" style={{ fontSize: 13, color: 'var(--green-ink)', margin: '28px 0 8px' }}>What it enabled</h3>
            <ul className="ticks one"><li>Programmes, batches and content in one system</li><li>Assessment and result workflows in the same platform</li><li>Reporting over training operations</li><li>A platform basis for examination-grade solutions</li></ul>
          </div>
          <div>
            <div className="fig" style={{ padding: 12 }}><RawSvg html={interfaceSchematics.lms} /></div>
            <h3 className="mono" style={{ fontSize: 13, color: 'var(--green-ink)', margin: '28px 0 8px' }}>Engineered solution</h3>
            <ol className="ticks one"><li>Programme &amp; batch management</li><li>Content delivery &amp; learner workflows</li><li>Assessment &amp; examination workflows</li><li>Result processing</li><li>Records &amp; operational reporting</li></ol>
            <p className="fine" style={{ marginTop: 18 }}>Engineering involved: web application engineering, database design, workflow and result processing, reporting. Interface drawing is a generic schematic, not a screenshot.</p>
          </div>
        </div>
      </div></section>

      <section id="talent" style={{ background: 'var(--white)', borderTop: '1px solid var(--rule)' }} aria-labelledby="h-tal"><div className="wrap">
        <Sheet n="02" a="Talent & placement" b="Systems built" />
        <div className="two">
          <div>
            <Tag kind="delivered">Systems built</Tag>
            <h2 id="h-tal" style={{ margin: '18px 0 20px', maxWidth: '18ch' }}>Talent platforms — one pattern, three talent markets.</h2>
            <h3 className="mono" style={{ fontSize: 13, color: 'var(--green-ink)', margin: '28px 0 8px' }}>The business requirement</h3>
            <p className="lede" style={{ margin: 0 }}>Talent-driven sectors ran discovery and placement through personal networks and paper records — slow, narrow and hard to audit.</p>
            <h3 className="mono" style={{ fontSize: 13, color: 'var(--green-ink)', margin: '28px 0 8px' }}>What it enabled</h3>
            <ul className="ticks one"><li>Structured talent records in place of paper</li><li>Searchable discovery across each sector</li><li>One engineering base, three distinct markets</li></ul>
          </div>
          <div>
            <div className="fig" style={{ padding: 12 }}><RawSvg html={interfaceSchematics.talent} /></div>
            <h3 className="mono" style={{ fontSize: 13, color: 'var(--green-ink)', margin: '28px 0 8px' }}>What Siddhrans built</h3>
            <p style={{ margin: '0 0 10px', color: 'var(--ink-2)' }}>A family of three sector platforms on a shared engineering pattern — profiles, discovery and placement workflows tailored per market.</p>
            <ul className="ticks one"><li><b>Talent Sandalwood:</b> film and creative-industry talent</li><li><b>Talent Workforce:</b> staffing and workforce placement</li><li><b>Talent Sports Force:</b> sports talent and placement</li></ul>
          </div>
        </div>
      </div></section>
      <Cta title="Have a similar problem to solve?" />
    </>
  );
}
