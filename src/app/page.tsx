import HeroCollage from '@/components/HeroCollage';
import ServiceShowcase, { type ShowcaseItem } from '@/components/ServiceShowcase';
import { Steps, VlsiFlow } from '@/components/diagrams';
import { Laptop, LmsUI, Phone, PhoneTalentUI } from '@/components/concept';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { Art, Button, Eyebrow, Photo, PhotoCard, Pill, SecHead } from '@/components/ui';
import { serviceBySlug } from '@/content/services';
import { productLifecycle, site } from '@/content/site';

const svc = (slug: string) => serviceBySlug(slug)!;
const SHOWCASE: ShowcaseItem[] = [
  { service: svc('enterprise-software-engineering'), photo: 'dev-team', pos: '50% 40%', blurb: 'Dashboards, portals and operational systems around the hardware, engineered, database-backed and in production use.', points: ['Web & mobile engineering', 'Workflow & approvals', 'Billing, POS & operations', 'Legacy modernisation'] },
  { service: svc('ai-ml-intelligent-automation'), photo: 'data-wall', pos: '60% 40%', blurb: 'Applied AI wired into data, process and oversight, with people in the loop.', points: ['Copilots & assistants', 'Document intelligence', 'Knowledge retrieval', 'Predictive analytics'] },
  { service: svc('cybersecurity'), photo: 'access-reader', pos: '60% 50%', blurb: 'Protection as layers of concrete controls, from the device to the cloud.', points: ['Identity & access', 'Hardening & patching', 'Monitoring & audit trails', 'Recovery'] },
  { service: svc('cloud-infrastructure'), photo: 'fibre-patch', pos: '50% 50%', blurb: 'Servers, migration, databases, backup and high availability, administered and watched.', points: ['Windows & Linux', 'Cloud migration', 'Backup & recovery', 'High availability'] },
];

const MARQUEE = ['PCB design', 'Embedded firmware', 'VLSI & FPGA design support', 'Product prototyping', 'Industrial IoT', 'Edge AI', 'Software & cybersecurity'];

export default function Home() {
  return (
    <>
      {/* ============ 1. HERO ============ */}
      <section className="hero" aria-labelledby="h1">
        <div className="hero__bg" aria-hidden="true"><div className="hero__grid" /></div>
        <div className="container hero__inner">
          <div className="hero__copy">
            <Eyebrow>Electronics, VLSI &amp; Embedded Systems Engineering</Eyebrow>
            <h1 id="h1" className="h-display">
              <span className="line"><span>From Circuit</span></span>
              <span className="line"><span>Design to</span></span>
              <span className="line"><span><span className="hl">Intelligent</span> Systems.</span></span>
            </h1>
            <p className="lede">Siddhrans InfoTech helps organisations design and develop electronic products, PCB hardware, embedded firmware, semiconductor design solutions and intelligent connected systems, supported by AI, software engineering and cybersecurity.</p>
            <div className="hero__actions">
              <Button href="/contact/">Discuss a hardware project</Button>
              <Button href="/services/" variant="ghost">Explore engineering services</Button>
            </div>
            <div className="hero__trust">
              <div><b>Circuit to app</b>One engineering chain</div>
              <div><b>Since {site.founded}</b>Bengaluru practice</div>
              <div><b>Founder-led</b>Same leadership</div>
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

      {/* ============ 2. PCB & HARDWARE ============ */}
      <section className="sec sec--white" id="pcb" aria-labelledby="h-pcb">
        <div className="container">
          <div className="story">
            <Reveal>
              <Pill kind="eng">Engineering solutions</Pill>
              <h2 id="h-pcb" className="h-xl" style={{ margin: '22px 0 20px' }}>PCB design and electronic hardware.</h2>
              <p className="lede">The board decides whether a product is dependable. We design the circuits and printed circuit boards that carry sensors, controllers and connectivity, with assembly, test and firmware bring-up planned from the first schematic.</p>
              <ul className="tickgrid" style={{ margin: '26px 0 32px' }}>
                {['Hardware architecture & component selection', 'Schematic design', 'PCB layout, design-for-manufacture and test', 'Power and low-power design', 'Prototype assembly support', 'Board bring-up and debug'].map((x) => <li key={x}>{x}</li>)}
              </ul>
              <Button href="/services/pcb-hardware-engineering/" variant="green">PCB &amp; hardware engineering</Button>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="collage2">
                <div className="k1"><PhotoCard name="hw-solder-board" sizes="(min-width:1180px) 36vw, 90vw" style={{ height: '100%' }} pos="50% 50%" /></div>
                <div className="k2"><PhotoCard name="hw-pcb-inspection" sizes="(min-width:1180px) 18vw, 40vw" cap={false} style={{ height: '100%' }} pos="85% 60%" /></div>
                <div className="k3"><PhotoCard name="hw-bench-soldering" sizes="(min-width:1180px) 22vw, 60vw" cap={false} style={{ aspectRatio: '16/9' }} pos="40% 55%" /></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 3. ELECTRONICS & EMBEDDED FIRMWARE ============ */}
      <section className="sec sec--navy diag-top" id="firmware" aria-labelledby="h-fw">
        <div className="glow" style={{ right: '-10%', top: '8%', width: '40vw', aspectRatio: '1', background: 'rgba(25,196,110,.35)' }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <SecHead row eyebrow="Electronics & embedded systems" title={<span id="h-fw">Embedded firmware, sensing and microcontrollers.</span>} lede="Firmware is where hardware becomes behaviour. We write the code that reads sensors, controls actuators and talks to the network on low-power microcontrollers, and prove it on the real board." />
          </Reveal>
          <Reveal delay={0.05}>
            <div className="duo duo--card" style={{ gridTemplateColumns: '1fr 1fr', marginTop: 'clamp(28px,3.5vw,48px)' }}>
              <PhotoCard name="ref-esp32-breadboard" sizes="(min-width:1180px) 48vw, 100vw" style={{ aspectRatio: '4/3' }} />
              <PhotoCard name="ref-motor-vibration-board" sizes="(min-width:1180px) 48vw, 100vw" style={{ aspectRatio: '4/3' }} />
            </div>
          </Reveal>
          <ul className="stage__chips" style={{ margin: '28px 0 30px', padding: 0 }}>
            {['ESP32', 'Arduino-class boards', 'Current & vibration sensing', 'Signal processing', 'Bluetooth LE', 'Wi-Fi', 'LoRaWAN', 'NB-IoT / LTE-M', 'Low-power design'].map((x) => <li key={x}>{x}</li>)}
          </ul>
          <Button href="/services/embedded-firmware-microcontrollers/">Embedded firmware</Button>
        </div>
      </section>

      {/* ============ 4. VLSI ============ */}
      <section className="sec sec--mist on-light" id="vlsi" aria-labelledby="h-vlsi">
        <div className="container">
          <Reveal><SecHead row eyebrow="VLSI & semiconductor design" title={<span id="h-vlsi">Digital design support, from specification to a working prototype.</span>} lede="RTL design, verification and FPGA prototyping for teams building chip- and FPGA-based products, integrated with the board and firmware they run on." /></Reveal>
          <Reveal delay={0.05}><VlsiFlow /></Reveal>
          <div className="notice"><b>Scope, not track record. </b>This is design support offered per engagement. Siddhrans does not claim chip fabrication, silicon tape-outs, completed ASICs, foundry partnerships or a manufacturing facility.</div>
          <div style={{ marginTop: 28 }}><Button href="/services/vlsi-semiconductor-design/" variant="green">VLSI &amp; semiconductor design support</Button></div>
        </div>
      </section>

      {/* ============ 5. PRODUCT DEVELOPMENT LIFECYCLE ============ */}
      <section className="sec sec--white" id="lifecycle" aria-labelledby="h-life">
        <div className="container">
          <Reveal><SecHead row eyebrow="Electronic product development" title={<span id="h-life">From concept to a validated prototype.</span>} lede="Hardware, firmware and the application around it are designed together, so nothing is thrown over a wall. Each stage ends in something you can test." /></Reveal>
          <Reveal delay={0.05}><Steps items={productLifecycle} /></Reveal>
          <div style={{ marginTop: 36 }}><Button href="/services/electronic-product-development/" variant="green">Product design, prototyping &amp; validation</Button></div>
        </div>
      </section>

      {/* ============ 6. INDUSTRIAL IOT & CONDITION MONITORING ============ */}
      <section className="sec sec--dark diag-both" id="iot" aria-labelledby="h-iot">
        <div className="container">
          <div className="rowtext">
            <Reveal>
              <Pill kind="design">Designed system</Pill>
              <h2 id="h-iot" className="h-xl" style={{ margin: '22px 0 20px' }}>Industrial IoT and condition monitoring.</h2>
              <p className="lede">Current, vibration and temperature sensing on pumps, motors and coolers, an embedded controller at the machine, and a dashboard and alerts for the technician who has to act.</p>
              <div style={{ marginTop: 28 }}><Button href="/services/embedded-systems-industrial-iot/">Industrial IoT</Button></div>
            </Reveal>
            <Reveal delay={0.08}>
              <PhotoCard name="ref-pump-installation" sizes="(min-width:1180px) 52vw, 100vw" style={{ aspectRatio: '1068/567' }} />
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <figure className="figcard" style={{ maxWidth: 1047, marginTop: 'clamp(28px,3.5vw,48px)' }}>
              <div className="figscroll" tabIndex={0} role="region" aria-label="Monitoring architecture diagram (scrolls sideways on small screens)">
                <PhotoCard name="ref-iot-architecture" sizes="(min-width:1180px) 1047px, 100vw" cap={false} style={{ aspectRatio: '1047/364' }} />
              </div>
              <figcaption><b>Illustrative image</b> · Monitoring architecture: current clamp and temperature sensors, ESP32, cooler dashboard, technician.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ============ 7. SMART UTILITIES ============ */}
      <section className="sec sec--white" id="utilities" aria-labelledby="h-util">
        <div className="container">
          <Reveal><SecHead row eyebrow="Smart utilities & connected systems" title={<span id="h-util">Digital readings from the meters already installed.</span>} lede="A low-power sensing module, a wireless link and a utility platform can turn an existing gas meter into a connected one, without replacing the meter." /></Reveal>
          <Reveal delay={0.05}>
            <div className="duo duo--card" style={{ gridTemplateColumns: '2.12fr .75fr', marginTop: 'clamp(28px,3.5vw,48px)' }}>
              <PhotoCard name="ref-gas-meter-phone" sizes="(min-width:1180px) 70vw, 100vw" style={{ aspectRatio: '651/307' }} />
              <PhotoCard name="ref-gas-meter-standalone" className="duo__side" sizes="(min-width:1180px) 25vw, 60vw" style={{ aspectRatio: '375/500', border: '1px solid rgba(10,19,38,.12)' }} />
            </div>
          </Reveal>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginTop: 28 }}>
            <Pill kind="prop">Proposed solution</Pill>
            <a className="linkarrow" href="/engineering-use-cases/">Gas-meter digitisation retrofit and other use cases <svg viewBox="0 0 18 12" aria-hidden="true"><path d="M0 6h16M11 1l5 5-5 5" /></svg></a>
          </div>
        </div>
      </section>

      {/* ============ 7b. AI VISION / INSPECTION ============ */}
      <section className="sec sec--mist on-light" id="vision" aria-labelledby="h-vis">
        <div className="container">
          <Reveal><SecHead row eyebrow="AI vision & inspection" title={<span id="h-vis">Cameras that check the work.</span>} lede="Machine vision at the line: compare a label with its work order, count and classify product, and flag a mismatch before it ships. Models are validated with the people who know the process." /></Reveal>
          <Reveal delay={0.05}>
            <div className="duo duo--card" style={{ gridTemplateColumns: '1.924fr 1.834fr', marginTop: 'clamp(28px,3.5vw,48px)' }}>
              <PhotoCard name="ref-label-mismatch" sizes="(min-width:1180px) 50vw, 100vw" style={{ aspectRatio: '760/395' }} />
              <PhotoCard name="ai-vision-capsules" sizes="(min-width:1180px) 48vw, 100vw" style={{ aspectRatio: '1698/926' }} />
            </div>
          </Reveal>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginTop: 28 }}>
            <Pill kind="cap">Capability example</Pill>
            <a className="linkarrow" href="/services/edge-ai-intelligent-electronics/">Edge AI &amp; intelligent electronics <svg viewBox="0 0 18 12" aria-hidden="true"><path d="M0 6h16M11 1l5 5-5 5" /></svg></a>
          </div>
        </div>
      </section>

      {/* ============ 7c. SAFETY, ACCESS & SMART OPERATIONS ============ */}
      <section className="sec sec--dark diag-both" id="safety" aria-labelledby="h-saf">
        <div className="container">
          <Reveal><SecHead row eyebrow="Safety, access & smart operations" title={<span id="h-saf">Alerts and access control that reach the person on site.</span>} lede="Beacons, wearables and access readers connected to rules and an evidence log, so a hazard or an unauthorised entry becomes an alert, not a surprise." /></Reveal>
          <Reveal delay={0.05}>
            <div className="duo" style={{ gridTemplateColumns: '2.56fr 1.333fr', marginTop: 'clamp(28px,3.5vw,48px)' }}>
              <PhotoCard name="ref-safety-sos" sizes="(min-width:1180px) 62vw, 100vw" style={{ aspectRatio: '768/300' }} />
              <PhotoCard name="ref-access-watch" sizes="(min-width:1180px) 33vw, 100vw" style={{ aspectRatio: '1600/1200' }} />
            </div>
          </Reveal>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginTop: 28 }}>
            <Pill kind="cap">Capability example</Pill>
            <a className="linkarrow" href="/engineering-use-cases/" style={{ color: '#fff' }}>All engineering use cases <svg viewBox="0 0 18 12" aria-hidden="true"><path d="M0 6h16M11 1l5 5-5 5" /></svg></a>
          </div>
          <p className="fine" style={{ marginTop: 22, color: 'var(--slate-300)' }}>Images on this page are illustrative: licensed stock, supplied reference images or AI-generated concepts. Examples are reference material, not completed Siddhrans projects.</p>
        </div>
      </section>

      {/* ============ 8. SUPPORTING SOFTWARE, SECURITY, CLOUD ============ */}
      <section className="sec sec--navy diag-top" id="capabilities" aria-labelledby="h-cap">
        <div className="container" style={{ position: 'relative' }}>
          <Reveal><SecHead row eyebrow="Supporting capabilities" title={<span id="h-cap">Software, AI, security and cloud around the hardware.</span>} lede="Devices need applications, analytics and protection. Our software practice, started in 2016, provides them." /></Reveal>
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

      {/* ============ 9. PRODUCT PORTFOLIO & CREDENTIALS ============ */}
      {/* ============ PRODUCTS PREVIEW ============ */}
      <section className="sec sec--dark diag-both" aria-labelledby="h-prod" style={{ overflow: 'hidden' }}>
        <div className="glow" style={{ left: '-12%', top: '10%', width: '46vw', aspectRatio: '1', background: 'rgba(25,196,110,.28)' }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="story">
            <Reveal>
              <Eyebrow>Products &amp; solutions</Eyebrow>
              <h2 id="h-prod" className="h-xl" style={{ margin: '20px 0 22px' }}>Existing product portfolio: software built to run real operations.</h2>
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


      {/* ============ 10. CONTACT: the footer carries the project-enquiry call to action ============ */}
    </>
  );
}
