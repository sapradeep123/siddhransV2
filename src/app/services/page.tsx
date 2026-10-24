import type { Metadata } from 'next';
import Lifecycle from '@/components/Lifecycle';
import { ParallaxFrame, Reveal } from '@/components/motion';
import { Button, Photo, PageHero, Pill, SecHead } from '@/components/ui';
import { VlsiFlow } from '@/components/diagrams';
import { serviceStatusLabel, services, type ServiceStatus } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services',
  description: 'PCB design, embedded firmware, VLSI design support, electronic product development, industrial IoT and edge AI, supported by software engineering, AI automation, cybersecurity and cloud.',
  alternates: { canonical: '/services/' },
};
const KIND: Record<ServiceStatus, 'built' | 'cap' | 'eng'> = { built: 'built', evidenced: 'built', capability: 'cap', solutions: 'eng', scoped: 'cap' };

export default function ServicesPage() {
  return (
    <>
      <PageHero photo="hw-pcb-inspection" pos="50% 60%" crumbs={[{ href: '/', label: 'Home' }, { label: 'Services' }]}>
        <h1 className="h-xl">From circuit design to <span className="hl">intelligent</span> systems.</h1>
        <p className="lede" style={{ maxWidth: '58ch' }}>PCB and hardware engineering, embedded firmware, VLSI design support, product prototyping, industrial IoT and edge AI, backed by software engineering, cybersecurity and cloud for the applications around the hardware.</p>
        <div className="phero__actions"><Button href="/contact/">Discuss a project</Button><Button href="#disciplines" variant="ghost">See the disciplines</Button></div>
      </PageHero>

      <section className="sec sec--white" id="disciplines" aria-labelledby="h-s">
        <div className="container">
          <Reveal><SecHead row eyebrow="Electronics engineering" title={<span id="h-s">Hardware, firmware and intelligence, engineered as one chain.</span>} lede="Each label tells you what stands behind the work: engineering solutions, engineering capability, scope offered per engagement, or software we have built." /></Reveal>
          {services.map((s, i) => (
            <div key={s.slug}>
              {s.track === 'software' && services[i - 1]?.track === 'electronics' && (
                <Reveal><SecHead row eyebrow="Supporting disciplines" title={<span id="h-sw">Software, AI, security and cloud around the hardware.</span>} lede="Software is where we started in 2016, and it remains the foundation for dashboards, platforms and secure operations." /></Reveal>
              )}
              <div className={`frow${i % 2 ? ' frow--flip' : ''}`} id={s.slug}>
                <Reveal className="frow__media">
                  {s.art === 'vlsi' ? <div className="vart"><VlsiFlow compact /></div> : <ParallaxFrame amount={6}><Photo name={s.photo} sizes="(min-width:960px) 50vw, 100vw" pos={s.photoPos} /></ParallaxFrame>}
                </Reveal>
                <Reveal delay={0.08}>
                  <span className="frow__n">{s.n} / {String(services.length).padStart(2, '0')}</span>
                  <h2 className="h-lg">{s.title}</h2>
                  <p className="lede" style={{ margin: '14px 0 18px' }}>{s.intro}</p>
                  <div style={{ margin: '0 0 24px' }}><Pill kind={KIND[s.status]}>{serviceStatusLabel[s.status]}</Pill></div>
                  <ul className="tickgrid tickgrid--one" style={{ marginBottom: 28 }}>{s.list.slice(0, 4).map((x) => <li key={x}>{x.split(':')[0]}</li>)}</ul>
                  <a className="linkarrow" href={`/services/${s.slug}/`}>Explore {s.short} <svg viewBox="0 0 18 12" aria-hidden="true"><path d="M0 6h16M11 1l5 5-5 5" /></svg></a>
                </Reveal>
              </div>
            </div>
          ))}
          <p className="fine" style={{ marginTop: 28 }}>VLSI and semiconductor work is described as design support scoped per engagement; no fabricated silicon is claimed. AI and automation are engineering capability, not production deployments we cannot evidence. Photographs are illustrative stock images; concept images are AI-generated.</p>
        </div>
      </section>

      <section className="sec sec--mist" aria-labelledby="h-l">
        <div className="container">
          <Reveal><SecHead row eyebrow="Lifecycle" title={<span id="h-l">Eight stages. One accountable team.</span>} lede="The same lifecycle applies to software and to the hardware beneath it." /></Reveal>
          <Lifecycle />
        </div>
      </section>
    </>
  );
}
