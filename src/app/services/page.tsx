import type { Metadata } from 'next';
import Lifecycle from '@/components/Lifecycle';
import { ParallaxFrame, Reveal } from '@/components/motion';
import { BigCta, Button, Photo, PageHero, Pill, SecHead } from '@/components/ui';
import { serviceStatusLabel, services, type ServiceStatus } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Eight engineering disciplines from enterprise software to embedded and industrial IoT, delivered as one accountable engagement.',
  alternates: { canonical: '/services/' },
};
const KIND: Record<ServiceStatus, 'built' | 'cap' | 'eng'> = { built: 'built', evidenced: 'built', capability: 'cap', solutions: 'eng' };

export default function ServicesPage() {
  return (
    <>
      <PageHero photo="dev-team" pos="50% 35%" crumbs={[{ href: '/', label: 'Home' }, { label: 'Services' }]}>
        <h1 className="h-xl">Eight disciplines. <span className="hl">One</span> engineering system.</h1>
        <p className="lede" style={{ maxWidth: '56ch' }}>Software, intelligence, automation, security, infrastructure and embedded systems, delivered as one accountable engagement across the technology lifecycle.</p>
        <div className="phero__actions"><Button href="/contact/">Discuss a project</Button><Button href="#disciplines" variant="ghost">See the disciplines</Button></div>
      </PageHero>

      <section className="sec sec--white" id="disciplines" aria-labelledby="h-s">
        <div className="container">
          <Reveal><SecHead row eyebrow="Disciplines" title={<span id="h-s">What we do, and how we describe it.</span>} lede="Each label tells you what stands behind the work: software we have built, engineering capability we apply on engagement, or embedded engineering solutions." /></Reveal>
          {services.map((s, i) => (
            <div className={`frow${i % 2 ? ' frow--flip' : ''}`} key={s.slug} id={s.slug}>
              <Reveal className="frow__media">
                <ParallaxFrame amount={6}><Photo name={s.photo} sizes="(min-width:960px) 50vw, 100vw" pos={s.photoPos} /></ParallaxFrame>
              </Reveal>
              <Reveal delay={0.08}>
                <span className="frow__n">{s.n} / 08</span>
                <h2 className="h-lg">{s.title}</h2>
                <p className="lede" style={{ margin: '14px 0 18px' }}>{s.intro}</p>
                <div style={{ margin: '0 0 24px' }}><Pill kind={KIND[s.status]}>{serviceStatusLabel[s.status]}</Pill></div>
                <ul className="tickgrid tickgrid--one" style={{ marginBottom: 28 }}>{s.list.slice(0, 4).map((x) => <li key={x}>{x.split(':')[0]}</li>)}</ul>
                <a className="linkarrow" href={`/services/${s.slug}/`}>Explore {s.short} <svg viewBox="0 0 18 12" aria-hidden="true"><path d="M0 6h16M11 1l5 5-5 5" /></svg></a>
              </Reveal>
            </div>
          ))}
          <p className="fine" style={{ marginTop: 28 }}>AI and automation are described as engineering capability: designed, prototyped and applied on engagement. We do not claim production AI deployments we cannot evidence. Photographs are illustrative stock images.</p>
        </div>
      </section>

      <section className="sec sec--mist" aria-labelledby="h-l">
        <div className="container">
          <Reveal><SecHead row eyebrow="Lifecycle" title={<span id="h-l">Eight stages. One accountable team.</span>} /></Reveal>
          <Lifecycle />
        </div>
      </section>
      <BigCta title="Tell us what you want to build, automate or secure." />
    </>
  );
}
