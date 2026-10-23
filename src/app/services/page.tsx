import type { Metadata } from 'next';
import Link from '@/components/Link';
import { Arrow, Art, Cta, PageHero, Photo, Ruler, Sheet, Tag } from '@/components/ui';
import { serviceStatusLabel, services, type ServiceStatus } from '@/content/services';
import { lifecycle } from '@/content/site';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Eight engineering disciplines from enterprise software to embedded and industrial IoT, delivered as one accountable engagement.',
  alternates: { canonical: '/services/' },
};
const TAG: Record<ServiceStatus, 'delivered' | 'cap' | 'eng'> = { built: 'delivered', evidenced: 'delivered', capability: 'cap', solutions: 'eng' };

export default function ServicesPage() {
  return (
    <>
      <PageHero photo="datacentre-aisle" crumbs={[{ href: '/', label: 'Home' }, { label: 'Services' }]}>
        <h1>Eight disciplines. <mark>One</mark> engineering system.</h1>
        <p className="lede" style={{ maxWidth: '56ch' }}>Software, intelligence, automation, security, infrastructure and embedded systems — delivered as one accountable engagement across the technology lifecycle.</p>
        <div className="actions"><Link className="btn solid" href="/contact/">Discuss a project <Arrow /></Link></div>
      </PageHero>
      <section aria-labelledby="h-s"><div className="wrap">
        <Sheet n="01" a="Disciplines" b="How each is described" />
        <h2 id="h-s" style={{ maxWidth: '24ch' }}>What we do, and how we describe it.</h2>
        <p className="lede" style={{ marginTop: 18 }}>Each label tells you what stands behind the work: software we have built, engineering capability we apply on engagement, or embedded engineering solutions.</p>
        <div className="srows">
          {services.map((s) => (
            <Link key={s.slug} className="srow" id={s.slug} href={`/services/${s.slug}/`}>
              <span className="n">{s.n}</span>
              <div className="media">{s.ill ? <Art kind={s.ill} /> : <Photo name={s.photo} sizes="280px" pos={s.photoPos} alt="" />}</div>
              <div><h3>{s.title}</h3><p>{s.intro}</p></div>
              <Tag kind={TAG[s.status]}>{serviceStatusLabel[s.status]}</Tag>
              <Arrow />
            </Link>
          ))}
        </div>
        <p className="fine" style={{ marginTop: 22 }}>AI and automation are described as engineering capability: designed, prototyped and applied on engagement. We do not claim production AI deployments we cannot evidence. Photographs are illustrative stock images.</p>
      </div></section>
      <section style={{ background: 'var(--white)', borderTop: '1px solid var(--rule)' }} aria-labelledby="h-l"><div className="wrap">
        <Sheet n="02" a="Lifecycle" b="Discover to optimise" />
        <h2 id="h-l" style={{ maxWidth: '20ch' }}>Eight stages. One accountable team.</h2>
        <Ruler items={lifecycle} />
      </div></section>
      <Cta title="Tell us what you want to build, automate or secure." />
    </>
  );
}
