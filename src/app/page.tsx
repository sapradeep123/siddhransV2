import ContactForm from '@/components/ContactForm';
import PortfolioSelector from '@/components/home/PortfolioSelector';
import TabSet from '@/components/home/TabSet';
import { HeroVisual } from '@/components/home/visuals';
import { ExpAgents, ExpApps, ExpForecast, ExpNli, ExpWorkflow, PhoneAlert, SampleNote, ShowAgents, ShowDocs, ShowPredict, ShowVision, StatusBoard, VibrationMini } from '@/components/home/showcases';
import { Reveal } from '@/components/motion';
import { Arrow, Button, Eyebrow, Photo, Pill, SecHead } from '@/components/ui';
import { site } from '@/content/site';

const Link = ({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) => (
  <a className="linkarrow" href={href} style={light ? { color: '#fff' } : undefined}>{children} <svg viewBox="0 0 18 12" aria-hidden="true"><path d="M0 6h16M11 1l5 5-5 5" /></svg></a>
);

const EXPLORER = [
  { id: 'apps', label: 'Generative AI applications', visual: <ExpApps />, text: 'Generative AI applications for business tasks, built into the web and mobile software your people already use.', points: ['AI-enabled web and mobile applications', 'Built on database-backed, workflow-driven platforms', 'People review what matters'] },
  { id: 'nli', label: 'Natural-language interfaces', visual: <ExpNli />, text: 'Natural-language interfaces to the systems and data you already run.', points: ['Questions answered from system data', 'Access follows the rules of the source system', 'A person takes over when the answer is unclear'] },
  { id: 'wf', label: 'Intelligent workflow', visual: <ExpWorkflow />, text: 'AI-enabled workflow with people in the loop, built on our automation and RPA engineering.', points: ['Rules and AI inside approvals', 'Exceptions go to people', 'An audit trail by design'] },
  { id: 'dec', label: 'Decision support', visual: <ExpForecast />, text: 'Predictive analytics and decision support over operational data.', points: ['Forecasting and classification', 'Reasons shown, not just scores', 'Validated with the people who run the process'] },
  { id: 'agents', label: 'Multi-agent solutions', visual: <ExpAgents />, text: 'Multi-agent solutions for multi-step work, with approvals between the steps.', points: ['Specialised agents with defined tools', 'Human approval gates', 'Every decision logged'] },
];

const TRACKS = [
  { id: 'pump', label: 'Condition monitoring', pill: <Pill kind="design">Designed system</Pill>, photo: 'ref-pump-installation' as const, ct: false, cap: 'Pump installation', chain: ['Current, vibration, temperature', 'Anomaly model', 'Technician alert'], text: 'Detect abnormal motor load earlier and guide maintenance.' },
  { id: 'vision', label: 'Vision inspection', pill: <Pill kind="cap">Engineering capability</Pill>, photo: 'ref-label-mismatch' as const, ct: true, cap: 'Label-inspection output', chain: ['Camera', 'Detection model', 'Pass or flag'], text: 'Check labels and product on the line, with results people can review.' },
  { id: 'util', label: 'Smart utilities', pill: <Pill kind="prop">Proposed solution</Pill>, photo: 'ref-gas-meter-phone' as const, ct: false, cap: 'Gas-meter reading by phone', chain: ['Pulse reader', 'Low-power controller', 'NB-IoT', 'Utility platform'], text: 'Digital readings from meters that are already installed.' },
];

export default function Home() {
  return (
    <>
      {/* ============ 1. HERO ============ */}
      <section className="hero" aria-labelledby="h1">
        <div className="hero__bg" aria-hidden="true"><div className="hero__grid" /></div>
        <div className="container hero__inner">
          <div className="hero__copy">
            <Eyebrow>AI, software &amp; electronics engineering · Bengaluru</Eyebrow>
            <h1 id="h1" className="h-display">
              <span className="line"><span>AI-Led Engineering.</span></span>
              <span className="line"><span><span className="hl">From Software</span></span></span>
              <span className="line"><span><span className="hl">to Smart Machines.</span></span></span>
            </h1>
            <p className="lede">Siddhrans InfoTech builds AI agents, copilots and intelligent applications, the enterprise software and data beneath them, and the embedded systems that take the same intelligence into machines.</p>
            <div className="hero__actions">
              <Button href="/services/ai-ml-intelligent-automation/">Explore AI capabilities</Button>
              <Button href="/contact/" variant="ghost">Start a project</Button>
            </div>
            <ul className="v4-pill3" aria-label="Our three pillars">
              <li><a href="#ai"><b>01</b>AI &amp; Intelligent Automation</a></li>
              <li><a href="#software"><b>02</b>Software &amp; Digital Engineering</a></li>
              <li><a href="#machines"><b>03</b>Embedded &amp; Intelligent Electronics</a></li>
            </ul>
            <div className="hero__trust">
              <div><b>Since {site.founded}</b>Engineering practice</div>
              <div><b>15 systems</b>Software built</div>
              <div><b>AI to device</b>Application to edge</div>
              <div><b>Founder-led</b>Same leadership</div>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* ============ 2. AI & INTELLIGENT AUTOMATION ============ */}
      <section className="v4s v4s--navy on-dark" id="ai" aria-labelledby="h-ai">
        <div className="container">
          <Reveal><SecHead row eyebrow="01 · AI & Intelligent Automation" title={<span id="h-ai">AI that works inside your operations.</span>} lede="Agents, copilots and automation connected to your data, your systems and your people, with humans in the loop where judgement matters." /></Reveal>
          <div className="v4-fam">
            <article className="v4-fc">
              <div className="v4-fc__v v4-fc__v--sc"><ShowAgents /><SampleNote /></div>
              <div className="v4-fc__t"><div className="v4-fc__h"><h3>AI agents &amp; enterprise copilots</h3><Pill kind="cap">Engineering capability</Pill></div><p>Role-specific assistants and multi-agent solutions that work from your documents and systems, cite their sources and wait for a person to approve what matters.</p><ul className="v4-tags"><li>Agents</li><li>Copilots</li><li>RAG</li><li>Approvals</li></ul></div>
            </article>
            <article className="v4-fc">
              <div className="v4-fc__v v4-fc__v--sc"><ShowDocs /><SampleNote /></div>
              <div className="v4-fc__t"><div className="v4-fc__h"><h3>Document &amp; knowledge intelligence</h3><Pill kind="cap">Engineering capability</Pill></div><p>Intelligent document processing and enterprise knowledge retrieval: extract fields, point to the page they came from, and flag what a person should check.</p><ul className="v4-tags"><li>Extraction</li><li>Validation</li><li>Knowledge retrieval</li></ul></div>
            </article>
            <article className="v4-fc">
              <div className="v4-fc__v v4-fc__v--sc"><ShowVision /><SampleNote>Concept interface · illustrative overlay on a licensed stock photograph, not an inspection record</SampleNote></div>
              <div className="v4-fc__t"><div className="v4-fc__h"><h3>Vision &amp; industrial inspection</h3><Pill kind="design">Engineering capability</Pill></div><p>Detect, locate and check features on the line, with a clear pass, flag or review outcome and a person making the final call.</p><ul className="v4-tags"><li>Detection</li><li>Inspection</li><li>Human review</li></ul></div>
            </article>
            <article className="v4-fc">
              <div className="v4-fc__v v4-fc__v--sc"><ShowPredict /><SampleNote /></div>
              <div className="v4-fc__t"><div className="v4-fc__h"><h3>Predictive &amp; edge intelligence</h3><Pill kind="cap">Engineering capability</Pill></div><p>Predictive analytics and machine learning in the cloud or close to the sensor, with an explanation of why something was flagged and what to do about it.</p><ul className="v4-tags"><li>Anomaly detection</li><li>Explainability</li><li>Edge AI</li></ul></div>
            </article>
          </div>
          <div className="v4-exp">
            <div className="v4-exp__h"><div><span className="mono v4-g">More AI capabilities</span><h3>Explore the rest of what we build</h3></div></div>
            <TabSet idp="ex" label="More AI capabilities" items={EXPLORER.map((x) => ({
              id: x.id, label: x.label,
              node: (<div className="v4-exp__pn"><div className="v4-exp__vz">{x.visual}<SampleNote>Concept interface · sample data</SampleNote></div><div><p>{x.text}</p><ul>{x.points.map((p) => <li key={p}>{p}</li>)}</ul><Pill kind="cap">Engineering capability</Pill></div></div>),
            }))} />
          </div>
          <div className="v4-cta">
            <Button href="/services/ai-ml-intelligent-automation/" variant="yellow">Explore AI &amp; automation</Button>
            <Button href="/contact/" variant="ghost">Discuss an AI use case</Button>
            <span className="fine">Works with or without hardware.</span>
          </div>
        </div>
      </section>

      {/* ============ 3. SOFTWARE & DIGITAL ENGINEERING ============ */}
      <section className="v4s v4s--warm on-light" id="software" aria-labelledby="h-sw">
        <div className="container">
          <Reveal><SecHead row eyebrow="02 · Software & Digital Engineering" title={<span id="h-sw">Software built to run real operations.</span>} lede="Fifteen named systems built since 2016: full-stack, database-backed and workflow-driven. They are the platform foundation we bring AI into." /></Reveal>
          <Reveal delay={0.05}><div className="v4-pfwrap"><PortfolioSelector /></div></Reveal>
          <div className="v4-sw2">
            <div className="v4-facts"><div><b>15</b>systems built</div><div><b>4</b>product families</div><div><b>{site.founded}</b>since</div></div>
            <ul className="v4-caps"><li>Web &amp; mobile engineering</li><li>Workflow &amp; approvals</li><li>Billing, POS &amp; operations</li><li>Legacy modernisation</li></ul>
            <div className="v4-aiapp"><b>AI-enabled applications</b><span>Add copilots, search and document intelligence to platforms like these.</span><Pill kind="cap">Engineering capability</Pill></div>
          </div>
          <div className="v4-cs">
            <a className="v4-cs__c" href="/case-studies/#lms"><span className="mono">Case study</span><b>Siddhrans LMS</b><span>Training delivery, structured end to end: programmes, content, assessments and results in one platform.</span><em>Read the case study <Arrow /></em></a>
            <a className="v4-cs__c" href="/case-studies/#talent"><span className="mono">Case study</span><b>Talent platforms</b><span>One engineering pattern, three talent markets: profiles, discovery and placement workflows.</span><em>Read the case study <Arrow /></em></a>
          </div>
          <div className="v4-cta v4-cta--light">
            <Button href="/products/" variant="green">See all 15 systems</Button>
            <Button href="/services/enterprise-software-engineering/" variant="ghost-dark">Enterprise software engineering</Button>
            <span className="fine">Interfaces are concept designs with placeholder data, not screenshots of delivered products.</span>
          </div>
        </div>
      </section>

      {/* ============ 4. AI MEETS THE MACHINE ============ */}
      <section className="v4s v4s--ink v4-glow on-dark" id="machines" aria-labelledby="h-mach">
        <div className="container">
          <Reveal><SecHead row eyebrow="03 · Embedded & Intelligent Electronics" title={<span id="h-mach">AI meets the machine.</span>} lede="One team engineers the sensor, the firmware, the model and the decision, so intelligence does not stop at the dashboard." /></Reveal>
          <ol className="v4-pipe" aria-label="From sensor to action">
            <li className="v4-nd"><span className="v4-nd__n">1</span><h3>Sense</h3><div className="v4-nd__v ct"><Photo name="ref-motor-vibration-board" eager sizes="(min-width:1180px) 16vw, 30vw" alt="Motor with a vibration sensor board and display" /></div><p>Current, vibration, temperature, optical and pulse sensors.</p></li>
            <li className="v4-nd"><span className="v4-nd__n">2</span><h3>Firmware</h3><div className="v4-nd__v ct"><Photo name="ref-esp32-breadboard" eager sizes="(min-width:1180px) 16vw, 30vw" alt="ESP32 breadboard prototype with labelled callouts" /></div><p>ESP32 and Arduino-class firmware: drivers, signal processing, local control.</p></li>
            <li className="v4-nd"><span className="v4-nd__n">3</span><h3>AI / ML</h3><div className="v4-nd__v dk"><VibrationMini /></div><p>Pattern analysis and deviation detection, validated with domain engineers.</p></li>
            <li className="v4-nd"><span className="v4-nd__n">4</span><h3>Decision</h3><div className="v4-nd__v"><StatusBoard /></div><p>Rules and models turn readings into a state: normal, watch or act.</p></li>
            <li className="v4-nd"><span className="v4-nd__n">5</span><h3>Action</h3><div className="v4-nd__v"><PhoneAlert /></div><p>Alerts, audit logs and automated follow-through.</p></li>
          </ol>
          <p className="fine v4-pipe__note">Steps 3 to 5 are concept visuals with illustrative sample data (pump P-204). Steps 1 and 2 are prototype images supplied by Siddhrans.</p>
          <div className="v4-trk">
            <TabSet idp="trk" label="Where it applies" items={TRACKS.map((t) => ({
              id: t.id, label: t.label,
              node: (
                <div className="v4-trk__pn">
                  <div className={`v4-trk__im${t.ct ? ' ct' : ''}`}><Photo name={t.photo} sizes="(min-width:1180px) 46vw, 100vw" /><span className="photo__cap"><b>Illustrative image</b> · {t.cap}</span></div>
                  <div className="v4-trk__tx"><div>{t.pill}</div><h3>{t.label}</h3><p>{t.text}</p><div className="v4-chain" aria-label="Signal chain">{t.chain.map((c, k) => <span key={c}>{k > 0 && <em aria-hidden="true">→</em>}{c}</span>)}</div></div>
                </div>
              ),
            }))} />
          </div>
          <details className="v4-arch">
            <summary>See the monitoring architecture <span>CT clamp → temperature sensors → ESP32 → cooler dashboard → technician</span></summary>
            <div className="figscroll" tabIndex={0} role="region" aria-label="Monitoring architecture diagram (scrolls sideways on small screens)"><Photo name="ref-iot-architecture" eager sizes="(min-width:1180px) 1047px, 100vw" /></div>
            <p className="fine">Illustrative image · Monitoring architecture.</p>
          </details>
          <div className="v4-cta">
            <Button href="/services/embedded-systems-industrial-iot/" variant="yellow">Industrial IoT &amp; Edge AI</Button>
            <Button href="/engineering-use-cases/" variant="ghost">Engineering use cases</Button>
            <span className="fine">Reference material, not completed Siddhrans projects.</span>
          </div>
        </div>
      </section>

      {/* ============ 5. ELECTRONICS ============ */}
      <section className="v4s v4s--graphite on-dark" id="electronics" aria-labelledby="h-el">
        <div className="container v4-el">
          <Reveal>
            <Eyebrow>Electronics engineering</Eyebrow>
            <h2 id="h-el" className="h-lg" style={{ margin: '16px 0 12px' }}>The electronics underneath.</h2>
            <p className="lede" style={{ marginBottom: 22 }}>Boards, firmware and prototypes for devices that sense and decide.</p>
            <ul className="v4-rows">
              <li><b><a href="/services/pcb-hardware-engineering/">PCB &amp; hardware design</a></b><span>Schematics, layout, power and board bring-up.</span><Pill kind="eng">Engineering solutions</Pill></li>
              <li><b><a href="/services/embedded-firmware-microcontrollers/">Embedded firmware</a></b><span>ESP32 and Arduino-class firmware, drivers, wireless.</span><Pill kind="eng">Engineering solutions</Pill></li>
              <li><b><a href="/services/electronic-product-development/">Product development</a></b><span>Concept to validated prototype.</span><Pill kind="eng">Engineering solutions</Pill></li>
              <li className="q"><b><a href="/services/vlsi-semiconductor-design/">VLSI &amp; semiconductor design support</a></b><span>RTL, verification and FPGA prototyping support. No tape-out, fabrication or foundry is claimed.</span><Pill kind="cap">Scoped per engagement</Pill></li>
            </ul>
            <div style={{ marginTop: 22 }}><Button href="/services/embedded-systems-industrial-iot/" variant="ghost">Embedded &amp; electronics services</Button></div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="v4-strip">
              <figure><Photo name="hw-pcb-inspection" sizes="(min-width:1180px) 16vw, 40vw" pos="60% 70%" /><figcaption className="photo__cap"><b>Illustrative image</b> · PCB inspection</figcaption></figure>
              <figure className="ct"><Photo name="ref-esp32-breadboard" sizes="(min-width:1180px) 16vw, 40vw" alt="" /></figure>
              <figure className="ct"><Photo name="ref-motor-vibration-board" eager sizes="(min-width:1180px) 16vw, 40vw" alt="" /></figure>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ 6. FOUNDATIONS ============ */}
      <section className="v4s v4s--navy on-dark" id="foundations" aria-labelledby="h-fd">
        <div className="container">
          <Reveal><SecHead row eyebrow="Foundations" title={<span id="h-fd">Secure, integrated and run for you.</span>} lede="Intelligence is only as dependable as what it runs on. These four layers sit under every pillar." /></Reveal>
          <div className="v4-pillars" aria-hidden="true"><div>AI &amp; Intelligent Automation</div><div>Software &amp; Digital Engineering</div><div>Embedded &amp; Intelligent Electronics</div></div>
          <ul className="v4-slab">
            <li><b><a href="/services/cybersecurity/">Cybersecurity &amp; secure engineering</a></b><span>Assess, harden, monitor, remediate: seven layers from identity to recovery.</span><Pill kind="cap">Engineering capability</Pill></li>
            <li><b><a href="/services/cloud-infrastructure/">Cloud, server &amp; infrastructure</a></b><span>Servers, migration, backup and availability, administered and watched.</span><Pill kind="cap">Engineering capability</Pill></li>
            <li><b><a href="/services/data-analytics-integration/">Data, analytics &amp; integration</a></b><span>APIs, dashboards and system-to-system flows.</span><Pill kind="built">Evidenced in built systems</Pill></li>
            <li><b><a href="/services/managed-technology-services/">Managed technology services</a></b><span>Run, support and improve what we build.</span><Pill kind="cap">Engineering capability</Pill></li>
          </ul>
          <a className="v4-callout" href="/products/#h-ex"><span><b>Securing the complete examination environment.</b> Software, cloud and security as one chain.</span><Pill kind="prop">Proposed solution</Pill></a>
          <ul className="v4-ind" aria-label="Industries"><li><a href="/industries/#education">Education</a></li><li><a href="/industries/#talent">Talent</a></li><li><a href="/industries/#healthcare">Healthcare</a></li><li><a href="/industries/#manufacturing">Manufacturing</a></li><li><a href="/industries/#energy">Energy &amp; utilities</a></li><li><a href="/industries/#water">Water</a></li><li><a href="/industries/#logistics">Logistics</a></li><li><a href="/industries/#retail">Retail &amp; business operations</a></li></ul>
        </div>
      </section>

      {/* ============ 7. START A PROJECT ============ */}
      <section className="v4s v4s--green on-dark" id="start" aria-labelledby="h-st">
        <div className="container v4-fin">
          <Reveal>
            <Eyebrow>Start a project</Eyebrow>
            <h2 id="h-st" className="h-xl" style={{ margin: '18px 0 18px' }}>Tell us what you want to make intelligent.</h2>
            <p className="lede">A workflow, a pile of documents, a production line, a device. Describe it and we will tell you how we would approach it.</p>
            <div className="hero__trust"><div><b>Since {site.founded}</b>Bengaluru</div><div><b>15 systems</b>Software built</div><div><b>Founder-led</b>Same leadership</div></div>
            <p className="fine" style={{ marginTop: 22, color: '#E3EBF5' }}>How we label our work: <a href="/about/#evidence" style={{ textDecoration: 'underline' }}>systems built, engineering capability and more</a>.</p>
          </Reveal>
          <Reveal delay={0.08}><div className="form-card"><ContactForm /></div></Reveal>
        </div>
      </section>
    </>
  );
}
