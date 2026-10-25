import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { Eyebrow, Photo, PageHero, Pill, SecHead } from '@/components/ui';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'A Bengaluru engineering company building since 2016. Founder-led, AI-led and software-first: AI and intelligent automation, enterprise software, and embedded systems that take intelligence into machines.',
  alternates: { canonical: '/about/' },
};

const PRINCIPLES: [string, string, string][] = [
  ['Intelligence', 'Put AI where it earns its place', 'In software and in machines, with people in the loop and the whole chain designed together.'],
  ['Secure', 'Secure what matters', 'Treat protection as layers of concrete controls, not a product badge.'],
  ['Automate', 'Automate what slows you down', 'Apply AI and workflow where they earn their place, with people in the loop.'],
  ['Modernise', 'Modernise what holds you back', 'Upgrade legacy applications, servers and infrastructure safely.'],
  ['Evidence', 'Say only what we can evidence', 'We publish what we built and delivered, and leave out client names, results and figures we cannot evidence.'],
  ['Accountable', 'Stay accountable', 'The team that built the system is the team best placed to run it.'],
];

export default function About() {
  return (
    <>
      <PageHero photo="ai-vision-capsules" pos="50% 50%" crumbs={[{ href: '/', label: 'Home' }, { label: 'About' }]}>
        <h1 className="h-xl">An AI-led engineering company, building <span className="hl">since {site.founded}</span>.</h1>
        <p className="lede" style={{ maxWidth: '62ch' }}>Siddhrans began in Bengaluru as a software engineering practice, building business applications, web platforms and workflow systems for education, logistics, healthcare, events and retail. Today we apply AI across that software and across the machines it connects to.</p>
      </PageHero>

      <section className="sec sec--white" aria-labelledby="h-st">
        <div className="container">
          <div className="story" style={{ alignItems: 'start' }}>
            <Reveal><p id="h-st" className="h-lg">The same build discipline, extended into AI and down to the hardware.</p></Reveal>
            <Reveal delay={0.08}>
              <p className="lede">That practice now operates as {site.name}. Our software history is the foundation, not hidden, and the reason we can take responsibility for what we build and bring AI into it.</p>
              <p className="lede" style={{ marginTop: 18 }}>Our differentiation is the chain: AI and software on one side, sensors, firmware and electronics on the other, designed together and kept accountable to one team. VLSI work is offered as design support per engagement; we claim no fabricated silicon.</p>
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
            <StaggerItem><div className="tl" style={{ height: '100%' }}><b>Today</b><strong>AI-led, full lifecycle</strong><p>AI and intelligent automation on the software core, embedded and IoT engineering for machines, and cloud, cybersecurity and managed services beneath.</p></div></StaggerItem>
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
        <Photo name="hw-bench-soldering" sizes="100vw" pos="50% 55%" />
        <span className="photo__cap"><b>Representative illustration</b> · Electronics bench</span>
      </div>

      <section className="sec sec--navy on-dark" id="evidence" aria-labelledby="h-ev">
        <div className="container">
          <Reveal><SecHead row eyebrow="How we label our work" title={<span id="h-ev">What we deliver, and how we show it.</span>} lede="What we delivered, what we can do, and which images are illustrations are kept distinct." /></Reveal>
          <Stagger className="cardgrid">
            {([['built', 'Developed & delivered', 'Software and engineering solutions built and handed over to clients, including firmware, source code, hardware or prototypes and technical documentation. Delivery is not manufacturing or large-scale deployment, which clients take on.'], ['cap', 'Engineering capability', 'Areas where we have engineering experience and can design, build and support solutions.'], ['cap', 'Scoped per engagement', 'Design support described by its scope, such as VLSI design support. No tape-out, fabrication or foundry is claimed.'], ['concept', 'Representative illustration', 'Delivered equipment is typically handed to clients or confidential, so images are licensed stock or AI-generated illustrations. Details are on the Image Credits page.']] as const).map(([k, t, d]) => (
              <StaggerItem key={t}><div className="tl" style={{ height: '100%' }}><Pill kind={k}>{t}</Pill><p style={{ marginTop: 14 }}>{d}</p></div></StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

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
