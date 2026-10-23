import HeroCollage from '@/components/HeroCollage';
import Lifecycle from '@/components/Lifecycle';
import ServiceShowcase, { type ShowcaseItem } from '@/components/ServiceShowcase';
import { LoopFigure, SignalChain } from '@/components/diagrams';
import { Laptop, LmsUI, Phone, PhoneTalentUI } from '@/components/concept';
import { Reveal, Stagger, StaggerItem, ParallaxFrame } from '@/components/motion';
import { Art, Arrow, BigCta, Button, Eyebrow, Photo, PhotoCard, Pill, SecHead } from '@/components/ui';
import { serviceBySlug } from '@/content/services';
import { site } from '@/content/site';

const svc = (slug: string) => serviceBySlug(slug)!;
const SHOWCASE: ShowcaseItem[] = [
  { service: svc('enterprise-software-engineering'), photo: 'dev-team', pos: '50% 40%', blurb: 'Applications, portals, workflow and operational systems, engineered, database-backed and in production use.', points: ['Web & mobile engineering', 'Workflow & approvals', 'Billing, POS & operations', 'Legacy modernisation'] },
  { service: svc('ai-ml-intelligent-automation'), photo: 'data-wall', pos: '60% 40%', blurb: 'Applied AI wired into data, process and oversight, with people in the loop.', points: ['Copilots & assistants', 'Document intelligence', 'Knowledge retrieval', 'Predictive analytics'] },
  { service: svc('cybersecurity'), photo: 'access-reader', pos: '60% 50%', blurb: 'Protection as layers of concrete controls, not a product badge.', points: ['Identity & access', 'Hardening & patching', 'Monitoring & audit trails', 'Recovery'] },
  { service: svc('cloud-infrastructure'), photo: 'fibre-patch', pos: '50% 50%', blurb: 'Servers, migration, databases, backup and high availability, administered and watched.', points: ['Windows & Linux', 'Cloud migration', 'Backup & recovery', 'High availability'] },
  { service: svc('embedded-systems-industrial-iot'), photo: 'solder-bench', pos: '55% 50%', blurb: 'Sensors, controllers, connectivity and dashboards, engineered from the machine to the decision.', points: ['Sensor integration', 'Firmware', 'BLE · LoRaWAN · NB-IoT', 'Dashboards & alerts'] },
];

const MARQUEE = ['Enterprise software', 'AI & automation', 'Cybersecurity', 'Cloud & infrastructure', 'Embedded & industrial IoT', 'Data & integration', 'Managed services'];

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero" aria-labelledby="h1">
        <div className="hero__bg" aria-hidden="true"><div className="hero__grid" /></div>
        <div className="container hero__inner">
          <div className="hero__copy">
            <Eyebrow>Bengaluru · Engineering practice since {site.founded}</Eyebrow>
            <h1 id="h1" className="h-display">
              <span className="line"><span>Engineering the</span></span>
              <span className="line"><span>systems your</span></span>
              <span className="line"><span>business <span className="hl">runs on.</span></span></span>
            </h1>
            <p className="lede">Enterprise software, AI and automation, cybersecurity and infrastructure, plus embedded and industrial IoT systems that connect machines to decisions. One accountable engineering partner.</p>
            <div className="hero__actions">
              <Button href="/contact/">Discuss a project</Button>
              <Button href="/services/" variant="ghost">Explore capabilities</Button>
            </div>
            <div className="hero__trust">
              <div><b>Since {site.founded}</b>Engineering practice in Bengaluru</div>
              <div><b>15 named systems</b>Software built and in use</div>
              <div><b>Founder-led</b>Same leadership from day one</div>
            </div>
          </div>
          <HeroCollage />
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[0, 1].map((k) => (<span key={k} style={{ display: 'contents' }}>{MARQUEE.map((t) => <span key={`${k}-${t}`}>{t}</span>)}</span>))}
          </div>
        </div>
      </section>

      {/* ============ LIFECYCLE ============ */}
      <section className="sec sec--white" id="approach" aria-labelledby="h-approach">
        <div className="container">
          <Reveal>
            <SecHead row eyebrow="Our approach" title={<span id="h-approach">One partner across the whole technology lifecycle.</span>} lede="Most suppliers cover one stage. Siddhrans is organised to cover the whole arc, and to stay accountable for what it builds. Intelligence at the top is only as good as the engineering beneath it." />
          </Reveal>
          <Lifecycle />
          <Reveal delay={0.1}>
            <p className="h-md" style={{ marginTop: 56, maxWidth: '34ch' }}>Engineering, intelligence, automation, security and infrastructure, <span className="underline-y">delivered as one accountable engagement.</span></p>
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICES SHOWCASE ============ */}
      <section className="sec sec--navy diag-top" id="capabilities" aria-labelledby="h-cap">
        <div className="glow" style={{ right: '-10%', top: '8%', width: '40vw', aspectRatio: '1', background: 'rgba(25,196,110,.35)' }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal><SecHead row eyebrow="Capabilities" title={<span id="h-cap">Eight disciplines, one engineering system.</span>} lede="Open any panel to see how we work. Each carries an honest status label: software we have built, engineering capability, or embedded engineering solutions." /></Reveal>
          <Reveal delay={0.05}><ServiceShowcase items={SHOWCASE} /></Reveal>
          <Stagger className="bento" style={{ marginTop: 14, gridAutoRows: 'clamp(210px,18vw,260px)' }}>
            <StaggerItem className="bcell" style={{ gridColumn: 'span 4' }}>
              <a className="bi" href="/services/rpa-business-automation/"><Art kind="flow" /><div className="tagrow"><Pill kind="cap">Engineering capability</Pill></div><h3>RPA &amp; Business Automation</h3><p>Turn a process into a controlled system: rules, workflow, integration, and people only for exceptions.</p></a>
            </StaggerItem>
            <StaggerItem className="bcell" style={{ gridColumn: 'span 4' }}>
              <a className="bi" href="/services/data-analytics-integration/"><Art kind="chart" /><div className="tagrow"><Pill kind="built">Evidenced in built systems</Pill></div><h3>Data, Analytics &amp; Integration</h3><p>From systems of record to decisions: APIs, dashboards and reporting.</p></a>
            </StaggerItem>
            <StaggerItem className="bcell" style={{ gridColumn: 'span 4' }}>
              <a className="bi" href="/services/managed-technology-services/"><Art kind="loop" /><div className="tagrow"><Pill kind="cap">Engineering capability</Pill></div><h3>Managed Technology Services</h3><p>An extended engineering team: plan, build, run, support, improve.</p></a>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ============ EMBEDDED SPOTLIGHT ============ */}
      <section className="sec sec--mist on-light" id="solutions" aria-labelledby="h-emb">
        <div className="container">
          <div className="story">
            <Reveal>
              <Pill kind="eng">Engineering solutions</Pill>
              <h2 id="h-emb" className="h-xl" style={{ margin: '22px 0 20px' }}>From sensor to decision, engineered end to end.</h2>
              <p className="lede">Hardware, firmware, connectivity, data and dashboards designed as one system, for manufacturing, medical electronics, utilities, buildings, logistics and safety.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}>
                <Button href="/services/embedded-systems-industrial-iot/" variant="green">Embedded &amp; IoT capabilities</Button>
                <Button href="/engineering-use-cases/" variant="ghost-dark">Engineering use cases</Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="collage2">
                <div className="k1"><PhotoCard name="solder-bench" sizes="(min-width:1180px) 36vw, 90vw" className="" style={{ height: '100%' }} pos="55% 50%" /></div>
                <div className="k2"><PhotoCard name="pcb-microscope" sizes="(min-width:1180px) 18vw, 40vw" cap={false} style={{ height: '100%' }} pos="60% 40%" /></div>
                <div className="k3"><PhotoCard name="automation-line" sizes="(min-width:1180px) 22vw, 60vw" cap={false} style={{ aspectRatio: '16/9' }} pos="50% 60%" /></div>
              </div>
            </Reveal>
          </div>
          <Reveal><SignalChain /></Reveal>
          <Stagger className="cardgrid" style={{ marginTop: 'clamp(40px,5vw,72px)' }}>
            {[
              { photo: 'factory-corridor' as const, kind: 'design' as const, tag: 'Designed system', t: 'Vibration & machine-health monitoring', d: 'Detect abnormal motor load and idle periods earlier; guide maintenance intervention.', f: 'Sensors → pattern analysis → alerts' },
              { photo: 'substation' as const, kind: 'prop' as const, tag: 'Proposed solution', t: 'Gas-meter digitisation retrofit', d: 'Digital readings from installed meters without wholesale replacement.', f: 'Reader → controller → NB-IoT → backend' },
              { photo: 'warehouse-scan' as const, kind: 'cap' as const, tag: 'Capability example', t: 'Cold-chain condition monitoring', d: 'Track storage temperatures and keep traceable exception records.', f: 'Sensing → logging → alert → audit' },
            ].map((u) => (
              <StaggerItem key={u.t}>
                <article className="uc" style={{ height: '100%' }}>
                  <div className="uc__media"><Photo name={u.photo} sizes="(min-width:960px) 30vw, 100vw" /><Pill kind={u.kind}>{u.tag}</Pill></div>
                  <div className="uc__body"><h3>{u.t}</h3><p>{u.d}</p><div className="uc__flow">{u.f}</div></div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="fine" style={{ marginTop: 24 }}>Examples are engineering reference material shown to illustrate capability. They are not presented as completed Siddhrans projects. Photographs are illustrative.</p>
        </div>
      </section>

      {/* ============ PRODUCTS PREVIEW ============ */}
      <section className="sec sec--dark diag-both" aria-labelledby="h-prod" style={{ overflow: 'hidden' }}>
        <div className="glow" style={{ left: '-12%', top: '10%', width: '46vw', aspectRatio: '1', background: 'rgba(25,196,110,.28)' }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="story">
            <Reveal>
              <Eyebrow>Products &amp; solutions</Eyebrow>
              <h2 id="h-prod" className="h-xl" style={{ margin: '20px 0 22px' }}>Software built to run real operations.</h2>
              <p className="lede">Fifteen named systems since {site.founded}: learning platforms, talent platforms, billing and business operations, and sector systems. Full-stack, database-backed and workflow-driven.</p>
              <ul className="stage__chips" style={{ margin: '28px 0 34px', padding: 0 }}>
                {['Siddhrans LMS', 'Talent platforms', 'GST Billing', 'Point of Sale', 'Cargo', 'Dialysis', '+ 7 more'].map((s) => <li key={s}>{s}</li>)}
              </ul>
              <Button href="/products/">Explore the product showcase</Button>
              <p className="fine" style={{ marginTop: 22 }}>Interfaces shown are concept designs with placeholder data, not screenshots of delivered products.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ position: 'relative', paddingBottom: '8%' }}>
                <div style={{ width: '88%' }}><Laptop><LmsUI /></Laptop></div>
                <div style={{ position: 'absolute', right: 0, bottom: 0, width: '24%' }}><Phone><PhoneTalentUI /></Phone></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ INDUSTRIES BENTO ============ */}
      <section className="sec sec--white" id="industries" aria-labelledby="h-ind" style={{ paddingTop: 'calc(clamp(80px,10vw,150px) + 20px)' }}>
        <div className="container">
          <Reveal><SecHead row eyebrow="Industries" title={<span id="h-ind">Built for operations that cannot afford downtime.</span>} lede="Our delivered software spans education, logistics, healthcare, events and retail. Our engineering solutions extend into manufacturing, utilities, buildings and safety." /></Reveal>
          <Stagger className="bento" gap={0.07}>
            <StaggerItem className="bcell" style={{ gridColumn: 'span 6', gridRow: 'span 2' }}><a className="bi" href="/industries/#education"><Photo name="lecture-hall" sizes="(min-width:1180px) 50vw, 100vw" pos="50% 40%" /><div className="tagrow"><Pill kind="built">Systems built</Pill></div><h3 style={{ fontSize: 'clamp(26px,3vw,42px)' }}>Education &amp; training</h3><p>Siddhrans LMS and online training programmes: programmes, content, assessments and results in one platform.</p></a></StaggerItem>
            <StaggerItem className="bcell" style={{ gridColumn: 'span 3' }}><a className="bi" href="/industries/#manufacturing"><Photo name="pharma-line" sizes="(min-width:1180px) 25vw, 50vw" pos="55% 50%" /><div className="tagrow"><Pill kind="eng">Engineering</Pill></div><h3>Manufacturing &amp; pharma</h3></a></StaggerItem>
            <StaggerItem className="bcell" style={{ gridColumn: 'span 3' }}><a className="bi" href="/industries/#healthcare"><Photo name="vitals-monitor" sizes="(min-width:1180px) 25vw, 50vw" pos="50% 30%" /><div className="tagrow"><Pill kind="built">Built</Pill><Pill kind="eng">Engineering</Pill></div><h3>Healthcare</h3></a></StaggerItem>
            <StaggerItem className="bcell" style={{ gridColumn: 'span 3' }}><a className="bi" href="/industries/#energy"><Photo name="solar-farm" sizes="(min-width:1180px) 25vw, 50vw" pos="60% 50%" /><div className="tagrow"><Pill kind="eng">Engineering</Pill></div><h3>Energy &amp; utilities</h3></a></StaggerItem>
            <StaggerItem className="bcell" style={{ gridColumn: 'span 3' }}><a className="bi" href="/industries/#water"><Photo name="water-treatment" sizes="(min-width:1180px) 25vw, 50vw" /><div className="tagrow"><Pill kind="eng">Engineering</Pill></div><h3>Water &amp; environment</h3></a></StaggerItem>
            <StaggerItem className="bcell bcell--w" style={{ gridColumn: 'span 4' }}><a className="bi" href="/industries/#talent"><Photo name="interview-panel" sizes="(min-width:1180px) 33vw, 100vw" pos="50% 40%" /><div className="tagrow"><Pill kind="built">Systems built</Pill></div><h3>Talent &amp; placement</h3><p>Film, staffing and sports talent platforms.</p></a></StaggerItem>
            <StaggerItem className="bcell bcell--w" style={{ gridColumn: 'span 4' }}><a className="bi" href="/industries/#logistics"><Photo name="warehouse-scan" sizes="(min-width:1180px) 33vw, 100vw" pos="55% 40%" /><div className="tagrow"><Pill kind="built">Built</Pill><Pill kind="eng">Engineering</Pill></div><h3>Logistics &amp; cold chain</h3><p>Cargo systems; condition monitoring.</p></a></StaggerItem>
            <StaggerItem className="bcell bcell--w" style={{ gridColumn: 'span 4' }}><a className="bi bi--yellow" href="/industries/#retail"><h3>Retail, events &amp; business operations</h3><p>GST billing, point of sale, restaurant, catering, salon, gym and film-event systems.</p><span style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 600 }}>See all industries <span style={{ width: 18 }}><Arrow /></span></span></a></StaggerItem>
          </Stagger>
          <p className="fine" style={{ marginTop: 22 }}>Industry photographs are licensed stock images used for illustration, not Siddhrans project photographs.</p>
        </div>
      </section>

      {/* ============ SYSTEMS BUILT ============ */}
      <section className="sec sec--navy" id="systems" aria-labelledby="h-sys" style={{ overflow: 'hidden' }}>
        <div className="container">
          <div className="story" style={{ alignItems: 'end' }}>
            <Reveal>
              <div className="story__n" aria-hidden="true" data-n="15" />
              <Eyebrow>Systems built</Eyebrow>
              <h2 id="h-sys" className="h-xl" style={{ margin: '18px 0 0' }}>Fifteen named systems built since {site.founded}.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede" style={{ marginBottom: 24 }}>Full-stack, database-backed, workflow-driven software, the engineering foundation under everything else we do.</p>
              <Button href="/products/" variant="yellow">See products &amp; solutions</Button>
            </Reveal>
          </div>
          <Stagger className="cardgrid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginTop: 'clamp(36px,5vw,64px)' }}>
            {[
              ['Education & training', ['Siddhrans LMS', 'Online training programmes']],
              ['Talent & placement', ['Talent Sandalwood', 'Talent Workforce', 'Talent Sports Force']],
              ['Business operations', ['GST Billing', 'Point of Sale', 'Restaurant', 'Catering', 'Gym Master', 'Project Management System']],
              ['Sector systems', ['Salon', 'Cargo', 'Dialysis', 'Film Event', 'Inventory management']],
            ].map(([g, l]) => (
              <StaggerItem key={g as string}>
                <div className="tl" style={{ height: '100%' }}>
                  <strong style={{ color: 'var(--green-b)', font: '500 12px var(--f-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{g as string}</strong>
                  <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0 }}>{(l as string[]).map((n) => <li key={n} style={{ font: '600 19px/1.25 var(--f-display)', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,.1)', letterSpacing: '-.01em' }}>{n}</li>)}</ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============ WORKING WITH US ============ */}
      <section className="sec sec--white" aria-labelledby="h-eng">
        <div className="container">
          <Reveal><SecHead row eyebrow="Working with us" title={<span id="h-eng">An extended engineering team, not a ticket queue.</span>} lede="The team that built the system is the team best placed to run it. The engagement model is shaped per client, from defined support windows to a standing engineering arrangement." /></Reveal>
          <Reveal delay={0.05}><LoopFigure /></Reveal>
          <div style={{ marginTop: 'clamp(36px,5vw,72px)', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(20px,4vw,60px)', alignItems: 'center' }} className="two">
            <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', aspectRatio: '16/10', position: 'relative' }}>
              <ParallaxFrame amount={6}><Photo name="dev-pair" sizes="(min-width:960px) 50vw, 100vw" pos="50% 40%" /></ParallaxFrame>
              <span className="photo__cap"><b>Illustrative image</b> · Code review</span>
            </div>
            <div>
              <Eyebrow>Leadership</Eyebrow>
              <h2 className="h-lg" style={{ margin: '18px 0 14px' }}>Founder-led since day one.</h2>
              <p className="muted" style={{ marginBottom: 20 }}>{site.leadership.map((p) => `${p.name}, ${p.role}`).join(' · ')}</p>
              <a className="linkarrow" href="/about/#leadership">Meet the team <svg viewBox="0 0 18 12" aria-hidden="true"><path d="M0 6h16M11 1l5 5-5 5" /></svg></a>
            </div>
          </div>
        </div>
      </section>

      <BigCta title="Tell us what you are trying to build, automate or secure." label="Start a conversation" />
    </>
  );
}
