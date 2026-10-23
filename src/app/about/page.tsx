import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { Eyebrow, Photo, PageHero, SecHead } from '@/components/ui';
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
  ['Evidence', 'Say only what we can evidence', 'We label delivered software, engineering capability and proposed solutions separately.'],
  ['Accountable', 'Stay accountable', 'The team that built the system is the team best placed to run it.'],
];

export default function About() {
  return (
    <>
      <PageHero photo="factory-corridor" pos="50% 60%" crumbs={[{ href: '/', label: 'Home' }, { label: 'About' }]}>
        <h1 className="h-xl">An engineering company from Bengaluru, building <span className="hl">since {site.founded}</span>.</h1>
        <p className="lede" style={{ maxWidth: '62ch' }}>Siddhrans began as a software engineering practice, designing and building business applications, web platforms and workflow systems for organisations across education, logistics, healthcare, events and retail.</p>
      </PageHero>

      <section className="sec sec--white" aria-labelledby="h-st">
        <div className="container">
          <div className="story" style={{ alignItems: 'start' }}>
            <Reveal><p id="h-st" className="h-lg">The same build discipline, extended into AI, automation, cybersecurity and infrastructure.</p></Reveal>
            <Reveal delay={0.08}>
              <p className="lede">That practice now operates as {site.name}. Our software history is the foundation, repositioned and not hidden, and the reason we can take responsibility for what we build.</p>
              <p className="lede" style={{ marginTop: 18 }}>Our newest engineering focus is embedded systems and industrial IoT: connecting machines and sensors to the software and analytics that make them useful.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec sec--navy diag-top" aria-labelledby="h-tl">
        <div className="container">
          <Reveal><SecHead eyebrow="Track record" title={<span id="h-tl">From first client sites to sector platforms.</span>} /></Reveal>
          <Stagger className="timeline">
            <StaggerItem><div className="tl" style={{ height: '100%' }}><b>2016</b><strong>Web &amp; application engineering</strong><p>Practice established in Bengaluru. First business systems: salon and cargo management, corporate websites, early workflow applications.</p></div></StaggerItem>
            <StaggerItem><div className="tl" style={{ height: '100%' }}><b>2016 – 2020</b><strong>Sector systems &amp; productisation</strong><p>Dialysis, film-event and inventory systems delivered. Product family built: GST Billing, POS, Restaurant, Catering, Gym Master, Project Management, plus Siddhrans LMS and the Talent platforms.</p></div></StaggerItem>
            <StaggerItem><div className="tl" style={{ height: '100%' }}><b>Today</b><strong>Full lifecycle</strong><p>AI, automation, cybersecurity, infrastructure and embedded engineering added to the engineering core.</p></div></StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="sec sec--white" id="leadership" aria-labelledby="h-ld">
        <div className="container">
          <div className="story">
            <Reveal>
              <Eyebrow>Leadership</Eyebrow>
              <h2 id="h-ld" className="h-xl" style={{ margin: '18px 0 20px' }}>Founder-led since day one.</h2>
              <p className="lede">The same leadership that built the delivery record directs the company today.</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="people" style={{ gridTemplateColumns: '1fr' }}>
                {site.leadership.map((p) => (<div className="person" key={p.name}><i aria-hidden="true">{p.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</i><div><b>{p.name}</b><span>{p.role}</span></div></div>))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="bandphoto">
        <Photo name="solder-board" sizes="100vw" pos="50% 55%" />
        <span className="photo__cap"><b>Illustrative image</b> · Circuit-board assembly</span>
      </div>

      <section className="sec sec--mist" aria-labelledby="h-pr">
        <div className="container">
          <Reveal><SecHead row eyebrow="Principles" title={<span id="h-pr">Honest about what we have built, and what we can build.</span>} /></Reveal>
          <Stagger className="cardgrid">
            {PRINCIPLES.map(([k, t, d]) => (<StaggerItem key={k}><div className="card" style={{ height: '100%' }}><small>{k}</small><h3>{t}</h3><p>{d}</p></div></StaggerItem>))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
