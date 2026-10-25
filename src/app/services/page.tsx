import { platformSections } from '@/content/platforms';
import type { Metadata } from 'next';
import Lifecycle from '@/components/Lifecycle';
import { ParallaxFrame, Reveal } from '@/components/motion';
import { Button, Photo, PageHero, Pill, SecHead } from '@/components/ui';
import { VlsiFlow } from '@/components/diagrams';
import { pillarMeta, pillarOrder, serviceStatusLabel, services, type ServiceStatus } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services',
  description: 'AI and intelligent automation, enterprise software, embedded systems and industrial IoT, with cloud, cybersecurity and managed services beneath them: thirteen engineering services from Siddhrans InfoTech.',
  alternates: { canonical: '/services/' },
};
const KIND: Record<ServiceStatus, 'built' | 'cap' | 'eng'> = { built: 'built', evidenced: 'built', capability: 'cap', solutions: 'eng', scoped: 'cap' };

export default function ServicesPage() {
  return (
    <>
      <PageHero photo="ai-vision-capsules" pos="50% 50%" crumbs={[{ href: '/', label: 'Home' }, { label: 'Services' }]}>
        <h1 className="h-xl">AI-led engineering, from <span className="hl">software</span> to smart machines.</h1>
        <p className="lede" style={{ maxWidth: '58ch' }}>Three pillars (AI and intelligent automation, software and digital engineering, embedded and intelligent electronics) on a foundation of cloud, cybersecurity and managed services. Thirteen services, one accountable team.</p>
        <div className="phero__actions"><Button href="/contact/">Discuss a project</Button><Button href="#disciplines" variant="ghost">See the services</Button></div>
      </PageHero>

      <section className="sec sec--white" id="disciplines" aria-labelledby="h-s">
        <div className="container">
          <Reveal><SecHead row eyebrow="Services" title={<span id="h-s">What we do, and how we describe it.</span>} lede="Software we have built, engineering solutions we have developed and delivered, capabilities across AI, cloud and security, and design support scoped per engagement." /></Reveal>
          {pillarOrder.map((pl) => {
            const list = services.filter((x) => x.pillar === pl);
            return (
              <div key={pl} id={pl}>
                <Reveal><div className="sec-head sec-head--row" style={{ marginTop: 'clamp(40px,5vw,72px)', marginBottom: 'clamp(8px,2vw,24px)' }}><div style={{ display: 'grid', gap: 12 }}><span className="eyebrow">{pl === 'foundations' ? 'Foundations' : `Pillar ${pillarMeta[pl].n}`}</span><h2 className="h-lg">{pillarMeta[pl].label}</h2></div><p className="lede">{pillarMeta[pl].blurb}</p></div></Reveal>
                {list.map((s, i) => (
                  <div className={`frow${i % 2 ? ' frow--flip' : ''}`} key={s.slug} id={s.slug}>
                    <Reveal className="frow__media">
                      {s.art === 'vlsi' ? <div className="vart"><VlsiFlow compact /></div> : <ParallaxFrame amount={6}><Photo name={s.photo} sizes="(min-width:960px) 50vw, 100vw" pos={s.photoPos} /></ParallaxFrame>}
                    </Reveal>
                    <Reveal delay={0.08}>
                      <span className="frow__n">{s.n} / {String(services.length).padStart(2, '0')}</span>
                      <h3 className="h-lg">{s.title}</h3>
                      <p className="lede" style={{ margin: '14px 0 18px' }}>{s.intro}</p>
                      <div style={{ margin: '0 0 24px' }}><Pill kind={KIND[s.status]}>{serviceStatusLabel[s.status]}</Pill></div>
                      {platformSections[s.slug] && s.slug !== 'data-analytics-integration' && <div className="frow__pl" aria-label={`Platforms and automations in ${s.short}`}><span>Delivered</span>{platformSections[s.slug].blocks.map((b) => <a key={b.id} href={`/services/${s.slug}/#${b.id}`}>{b.name}</a>)}</div>}
                      <ul className="tickgrid tickgrid--one" style={{ marginBottom: 28 }}>{s.list.slice(0, 4).map((x) => <li key={x}>{x.split(':')[0]}</li>)}</ul>
                      <a className="linkarrow" href={`/services/${s.slug}/`}>Explore {s.short} <svg viewBox="0 0 18 12" aria-hidden="true"><path d="M0 6h16M11 1l5 5-5 5" /></svg></a>
                    </Reveal>
                  </div>
                ))}
              </div>
            );
          })}
          <p className="fine" style={{ marginTop: 28 }}>VLSI and semiconductor work is described as design support scoped per engagement; no fabricated silicon is claimed. Client handover of a working solution is not described as large-scale deployment or manufacturing. Images are representative illustrations.</p>
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
