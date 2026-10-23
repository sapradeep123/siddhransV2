import Link from '@/components/Link';
import { Arrow, Art, Cta, Fig, Photo, Ruler, Sheet, Tag } from '@/components/ui';
import { SignalChain, StackFigure, StackLegend } from '@/components/diagrams';
import { lifecycle, site } from '@/content/site';

export default function Home() {
  return (
    <>
      <section className="hero-photo" aria-labelledby="h1">
        <div className="bg"><Photo name="hero-robotics" priority sizes="100vw" alt="" /></div>
        <div className="wrap">
          <span className="eyebrow mono">Bengaluru · Engineering practice since {site.founded}</span>
          <h1 id="h1">Engineering the systems your business <mark>runs on</mark>.</h1>
          <p className="lede">Enterprise software, AI and automation, cybersecurity and infrastructure — plus embedded and industrial IoT systems that connect machines to decisions. One accountable engineering partner.</p>
          <div className="actions">
            <Link className="btn solid" href="/contact/">Discuss a project <Arrow /></Link>
            <Link className="btn" href="/services/">Explore capabilities</Link>
          </div>
        </div>
        <Fig name="hero-robotics" />
      </section>
      <div className="factbar"><div className="wrap">
        <div><span className="mono">Headquarters</span><b>Bengaluru, India</b></div>
        <div><span className="mono">Established</span><b>Engineering practice, {site.founded}</b></div>
        <div><span className="mono">Leadership</span><b>Founder-led since day one</b></div>
        <div><span className="mono">Software built</span><b>15 named systems</b></div>
      </div></div>

      <section id="approach" aria-labelledby="h-approach"><div className="wrap">
        <Sheet n="01" a="Approach" b="One partner, whole lifecycle" />
        <div className="cols2" style={{ alignItems: 'center' }}>
          <div>
            <h2 id="h-approach">One partner across the technology lifecycle.</h2>
            <p className="lede" style={{ margin: '20px 0 28px' }}>Most suppliers cover one stage. Siddhrans is organised to cover the whole arc — and to stay accountable for what it builds. Intelligence at the top is only as good as the engineering beneath it.</p>
            <StackLegend />
          </div>
          <StackFigure />
        </div>
        <div style={{ marginTop: 72 }}><Ruler items={lifecycle} /></div>
      </div></section>

      <section id="capabilities" style={{ background: 'var(--white)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }} aria-labelledby="h-cap"><div className="wrap">
        <Sheet n="02" a="Capabilities" b="Eight disciplines" />
        <h2 id="h-cap" style={{ maxWidth: '22ch' }}>Eight disciplines. One engineering system.</h2>
        <div className="mosaic">
          <Link className="tile big" href="/services/embedded-systems-industrial-iot/"><Photo name="solder-bench" sizes="(min-width:1140px) 50vw, 100vw" /><span className="go"><Arrow /></span><span className="n">07</span><h3>Embedded Systems &amp; Industrial IoT</h3><p>Sensing, controllers, connectivity, dashboards and alerts — engineered from the machine to the decision.</p><Tag kind="eng">Engineering solutions</Tag></Link>
          <Link className="tile" href="/services/enterprise-software-engineering/"><Photo name="code-screen" sizes="(min-width:1140px) 25vw, 50vw" /><span className="n">01</span><h3>Enterprise Software</h3><p>Portals, mobile, LMS, billing, workflow.</p><Tag>Systems built</Tag></Link>
          <Link className="tile" href="/services/ai-ml-intelligent-automation/"><Photo name="ai-network" sizes="(min-width:1140px) 25vw, 50vw" pos="50% 60%" /><span className="n">02</span><h3>AI, ML &amp; Intelligent Automation</h3><p>Copilots, document intelligence, analytics.</p><Tag>Engineering capability</Tag></Link>
          <Link className="tile" href="/services/rpa-business-automation/"><Art kind="flow" /><span className="n">03</span><h3>RPA &amp; Business Automation</h3><p>Workflow, approvals, system-to-system flows.</p><Tag>Engineering capability</Tag></Link>
          <Link className="tile" href="/services/cybersecurity/"><Photo name="fibre-patch" sizes="(min-width:1140px) 25vw, 50vw" /><span className="n">04</span><h3>Cybersecurity</h3><p>Assess, harden, monitor, remediate.</p><Tag>Engineering capability</Tag></Link>
          <Link className="tile" href="/services/cloud-infrastructure/"><Photo name="datacentre-aisle" sizes="(min-width:1140px) 25vw, 50vw" /><span className="n">05</span><h3>Cloud &amp; Infrastructure</h3><p>Servers, migration, backup, availability.</p><Tag>Engineering capability</Tag></Link>
          <Link className="tile" href="/services/data-analytics-integration/"><Art kind="chart" /><span className="n">06</span><h3>Data, Analytics &amp; Integration</h3><p>APIs, dashboards, reporting.</p><Tag>Evidenced in built systems</Tag></Link>
          <Link className="tile" href="/services/managed-technology-services/"><Art kind="loop" /><span className="n">08</span><h3>Managed Technology Services</h3><p>Run, support, improve.</p><Tag>Engineering capability</Tag></Link>
          <div className="tile cta-tile"><h3>Not sure which discipline you need?</h3><Link className="btn" href="/contact/">Talk to an engineer <Arrow /></Link></div>
        </div>
        <p className="fine" style={{ marginTop: 22 }}>Photographs are licensed stock images used to illustrate each discipline. They are not Siddhrans project photographs.</p>
      </div></section>

      <section id="solutions" className="on-dark" aria-labelledby="h-emb"><div className="wrap">
        <Sheet n="03" a="Embedded & Industrial IoT" b="Engineering solutions" />
        <div className="feature">
          <div className="ph"><Photo name="factory-corridor" sizes="(min-width:960px) 40vw, 100vw" pos="50% 60%" /><Fig name="factory-corridor" /></div>
          <div style={{ alignSelf: 'center' }}>
            <h2 id="h-emb">From sensor to decision, engineered end to end.</h2>
            <p className="lede" style={{ marginTop: 20 }}>Hardware, firmware, connectivity, data and dashboards designed as one system — for manufacturing, medical electronics, utilities, buildings, logistics and safety.</p>
            <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link className="btn solid" href="/services/embedded-systems-industrial-iot/">Embedded &amp; IoT capabilities <Arrow /></Link>
              <Link className="btn" href="/engineering-use-cases/">Engineering use cases</Link>
            </div>
          </div>
        </div>
        <SignalChain />
        <div className="teasers rv">
          <article><div className="thumb"><Photo name="pharma-line" sizes="(min-width:960px) 30vw, 100vw" /></div><Tag kind="design">Designed system</Tag><h3>Vibration &amp; machine-health monitoring</h3><p>Detect abnormal motor load and idle periods earlier; guide maintenance intervention.</p><div className="flow">Sensors → pattern analysis → alerts</div></article>
          <article><div className="thumb"><Photo name="substation" sizes="(min-width:960px) 30vw, 100vw" /></div><Tag kind="prop">Proposed solution</Tag><h3>Gas-meter digitisation retrofit</h3><p>Digital readings from installed meters without wholesale replacement.</p><div className="flow">Reader → controller → NB-IoT → backend</div></article>
          <article><div className="thumb"><Art kind="logistics" /></div><Tag kind="cap">Capability example</Tag><h3>Cold-chain condition monitoring</h3><p>Track storage temperatures and keep traceable exception records.</p><div className="flow">Sensing → logging → alert → audit</div></article>
        </div>
        <p className="fine" style={{ marginTop: 28 }}>Examples are engineering reference material shown to illustrate capability. They are not presented as completed Siddhrans projects. Images are illustrative.</p>
      </div></section>

      <section id="industries" aria-labelledby="h-ind"><div className="wrap">
        <Sheet n="04" a="Industries" b="Where the engineering applies" />
        <h2 id="h-ind" style={{ maxWidth: '24ch' }}>Built for operations that cannot afford downtime.</h2>
        <p className="lede" style={{ marginTop: 20 }}>Our delivered software spans education, logistics, healthcare, events and retail. Our engineering solutions extend into manufacturing, utilities, buildings and safety.</p>
        <div className="strip rv">
          <Link className="panel" href="/industries/#manufacturing" style={{ textDecoration: 'none' }}><Photo name="pharma-line" sizes="(min-width:960px) 25vw, 50vw" pos="55% 50%" alt="" /><span className="mono">Engineering solutions</span><h3>Manufacturing &amp; pharma</h3><p>Process quality, machine health, controlled access.</p></Link>
          <Link className="panel" href="/industries/#healthcare" style={{ textDecoration: 'none' }}><Photo name="vitals-monitor" sizes="(min-width:960px) 25vw, 50vw" pos="50% 30%" alt="" /><span className="mono">Delivered software + engineering</span><h3>Healthcare</h3><p>Dialysis system; medical electronics.</p></Link>
          <Link className="panel" href="/industries/#energy" style={{ textDecoration: 'none' }}><Photo name="solar-farm" sizes="(min-width:960px) 25vw, 50vw" pos="60% 50%" alt="" /><span className="mono">Engineering solutions</span><h3>Energy &amp; utilities</h3><p>Metering, energy management, building efficiency.</p></Link>
          <Link className="panel" href="/industries/#water" style={{ textDecoration: 'none' }}><Photo name="water-treatment" sizes="(min-width:960px) 25vw, 50vw" alt="" /><span className="mono">Engineering solutions</span><h3>Water &amp; environment</h3><p>Quality monitoring, hazard alerts, safety logs.</p></Link>
        </div>
        <p className="fine" style={{ marginTop: 20 }}>Also served through delivered software: education &amp; training, talent &amp; placement, logistics, events and retail. Industry images are illustrative stock photographs. <Link href="/industries/">All industries</Link></p>
      </div></section>

      <section id="systems" style={{ background: 'var(--white)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }} aria-labelledby="h-sys"><div className="wrap">
        <Sheet n="05" a="Systems built" b={`Since ${site.founded}`} />
        <div className="cols2" style={{ alignItems: 'end' }}>
          <div><h2 id="h-sys" style={{ maxWidth: '20ch' }}>Fifteen named systems built since {site.founded}.</h2><p className="lede" style={{ marginTop: 20 }}>Full-stack, database-backed, workflow-driven software — the engineering foundation under everything else we do.</p></div>
          <div style={{ justifySelf: 'end' }}><Link className="btn" href="/products/">See products &amp; solutions <Arrow /></Link></div>
        </div>
        <div className="systems rv">
          <div><h3>Education &amp; training</h3><ul><li>Siddhrans LMS</li><li>Online training programmes</li></ul></div>
          <div><h3>Talent &amp; placement</h3><ul><li>Talent Sandalwood</li><li>Talent Workforce</li><li>Talent Sports Force</li></ul></div>
          <div><h3>Business operations</h3><ul><li>GST Billing</li><li>Point of Sale</li><li>Restaurant</li><li>Catering</li><li>Gym Master</li><li>Project Management System</li></ul></div>
          <div><h3>Sector systems</h3><ul><li>Salon</li><li>Cargo</li><li>Dialysis</li><li>Film Event</li><li>Inventory management</li></ul></div>
        </div>
      </div></section>

      <section aria-labelledby="h-eng"><div className="wrap">
        <Sheet n="06" a="Working with us" b="Plan · Build · Run · Support · Improve" />
        <h2 id="h-eng" style={{ maxWidth: '20ch' }}>An extended engineering team, not a ticket queue.</h2>
        <p className="lede" style={{ marginTop: 20 }}>The team that built the system is the team best placed to run it. The engagement model is shaped per client — from defined support windows to a standing engineering arrangement.</p>
        <div className="loop rv"><div><b>Plan</b><span>Define the outcome and the architecture.</span></div><div><b>Build</b><span>Engineer and integrate.</span></div><div><b>Run</b><span>Administer production day to day.</span></div><div><b>Support</b><span>Application, database and incident support.</span></div><div><b>Improve</b><span>Optimise performance, reliability and cost.</span></div></div>
        <div className="loop-back mono"><span>Continuous improvement feeds the next plan</span><i></i></div>
      </div></section>

      <section className="cta-band" style={{ padding: 0, position: 'relative', overflow: 'hidden', color: '#fff', background: 'var(--ink)', borderTop: 0 }}>
        <div className="ph" style={{ position: 'absolute', inset: 0, opacity: 0.35 }}><Photo name="datacentre-aisle" alt="" /></div>
        <div className="wrap" style={{ position: 'relative', paddingTop: 'clamp(64px,9vw,120px)', paddingBottom: 'clamp(64px,9vw,120px)' }}>
          <div><h2 style={{ color: '#fff' }}>Tell us what you are trying to build, automate or secure.</h2></div>
          <div className="acts">
            <Link className="btn solid" style={{ background: 'var(--yellow)', borderColor: 'var(--yellow)', color: 'var(--ink)' }} href="/contact/">Start a conversation <Arrow /></Link>
            <a className="btn" style={{ borderColor: '#fff', color: '#fff' }} href={`tel:${site.phone.tel}`}>Call {site.phone.display}</a>
          </div>
        </div>
      </section>
    </>
  );
}
