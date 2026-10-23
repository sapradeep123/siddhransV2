import type { Metadata } from 'next';
import { Cta, Fig, PageHero, Photo, Sheet } from '@/components/ui';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'An engineering company from Bengaluru, building since 2016. Founder-led, with software first and the whole technology stack now under one roof.',
  alternates: { canonical: '/about/' },
};

const PRINCIPLES: [string, string, string][] = [
  ['Build', 'Build what matters', 'Understand the business problem before touching technology.'],
  ['Secure', 'Secure what matters', 'Treat protection as layers of concrete controls, not a product badge.'],
  ['Automate', 'Automate what slows you down', 'Apply AI and workflow where they earn their place, with people in the loop.'],
  ['Modernise', 'Modernise what holds you back', 'Upgrade legacy applications, servers and infrastructure safely.'],
  ['Say', 'Say only what we can evidence', 'We label delivered software, engineering capability and proposed solutions separately.'],
  ['Stay', 'Stay accountable', 'The team that built the system is the team best placed to run it.'],
];

export default function About() {
  return (
    <>
      <PageHero photo="lab-porthole" crumbs={[{ href: '/', label: 'Home' }, { label: 'About' }]}>
        <h1>An engineering company from Bengaluru, building <mark>since {site.founded}</mark>.</h1>
        <p className="lede" style={{ maxWidth: '62ch' }}>Siddhrans began as a software engineering practice, designing and building business applications, web platforms and workflow systems for organisations across education, logistics, healthcare, events and retail.</p>
      </PageHero>

      <section aria-labelledby="h-st"><div className="wrap">
        <Sheet n="01" a="Company" b="Software first, then the whole stack" />
        <div className="cols2" style={{ alignItems: 'start' }}>
          <p className="pull" id="h-st">The same build discipline, extended into AI, automation, cybersecurity and infrastructure.</p>
          <div>
            <p className="lede">That practice now operates as {site.name}. Our software history is the foundation — repositioned, not hidden — and the reason we can take responsibility for what we build.</p>
            <p className="lede" style={{ marginTop: 18 }}>Our newest engineering focus is embedded systems and industrial IoT: connecting machines and sensors to the software and analytics that make them useful.</p>
          </div>
        </div>
        <div className="timeline rv">
          <div><b>2016</b><p style={{ margin: 0, color: 'var(--ink-2)' }}><strong>Web &amp; application engineering.</strong> Practice established in Bengaluru. First business systems: salon and cargo management, corporate websites, early workflow applications.</p></div>
          <div><b>2016 – 2020</b><p style={{ margin: 0, color: 'var(--ink-2)' }}><strong>Sector systems &amp; productisation.</strong> Dialysis, film-event and inventory systems delivered. Product family built: GST Billing, POS, Restaurant, Catering, Gym Master, Project Management — plus Siddhrans LMS and the Talent platforms.</p></div>
          <div><b>Today</b><p style={{ margin: 0, color: 'var(--ink-2)' }}><strong>Full lifecycle.</strong> AI, automation, cybersecurity, infrastructure and embedded engineering added to the engineering core.</p></div>
        </div>
      </div></section>

      <div className="ph band"><Photo name="solder-board" sizes="100vw" /><Fig name="solder-board" /></div>

      <section id="leadership" aria-labelledby="h-ld"><div className="wrap">
        <Sheet n="02" a="Leadership" b="Founder-led" />
        <div className="cols2">
          <div><h2 id="h-ld" style={{ maxWidth: '16ch' }}>Founder-led since day one.</h2><p className="lede" style={{ marginTop: 20 }}>The same leadership that built the delivery record directs the company today.</p></div>
          <div className="side" style={{ alignSelf: 'end' }}>
            <dl>{site.leadership.map((p) => (<div key={p.name}><dt>{p.role}</dt><dd>{p.name}</dd></div>))}</dl>
          </div>
        </div>
      </div></section>

      <section style={{ background: 'var(--white)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }} aria-labelledby="h-pr"><div className="wrap">
        <Sheet n="03" a="Principles" b="What we stand for" />
        <h2 id="h-pr" style={{ maxWidth: '20ch' }}>Honest about what we have built, and what we can build.</h2>
        <div className="caps rv">{PRINCIPLES.map(([k, t, d]) => (<div key={k}><span className="mono">{k}</span><h3>{t}</h3><p>{d}</p></div>))}</div>
      </div></section>
      <Cta title="Want to know whether we are the right engineering partner?" />
    </>
  );
}
