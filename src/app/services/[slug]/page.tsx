import type { Metadata } from 'next';
import Link from '@/components/Link';
import { notFound } from 'next/navigation';
import { Arrow, Art, Cta, Fig, Photo, PageHero, Ruler, Sheet, Tag } from '@/components/ui';
import { SignalChain } from '@/components/diagrams';
import { serviceBySlug, serviceStatusLabel, services, type ServiceStatus } from '@/content/services';
import { statusHelp, statusLabel } from '@/content/usecases';

const TAG: Record<ServiceStatus, 'delivered' | 'cap' | 'eng'> = { built: 'delivered', evidenced: 'delivered', capability: 'cap', solutions: 'eng' };

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return { title: s.title, description: s.intro, alternates: { canonical: `/services/${s.slug}/` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const isEmbedded = s.slug === 'embedded-systems-industrial-iot';
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <PageHero photo={s.photo} pos={s.photoPos} crumbs={[{ href: '/', label: 'Home' }, { href: '/services/', label: 'Services' }, { label: s.short }]}>
        <Tag kind={TAG[s.status]}>{serviceStatusLabel[s.status]}</Tag>
        <h1 style={{ marginTop: 22 }}>{s.title}</h1>
        <p className="lede" style={{ maxWidth: '58ch' }}>{s.intro}</p>
        <div className="actions">
          <Link className="btn solid" href="/contact/">{isEmbedded ? 'Discuss an embedded project' : 'Discuss a project'} <Arrow /></Link>
          {isEmbedded && <Link className="btn" href="/engineering-use-cases/">See engineering use cases</Link>}
        </div>
      </PageHero>

      {isEmbedded && (
        <section className="on-dark" aria-labelledby="h-chain"><div className="wrap">
          <Sheet n="01" a="Signal chain" b="How a system is put together" />
          <h2 id="h-chain" style={{ maxWidth: '22ch' }}>One chain, engineered as one system.</h2>
          <SignalChain />
        </div></section>
      )}

      <section aria-labelledby="h-what"><div className="wrap">
        <Sheet n={isEmbedded ? '02' : '01'} a={s.listTitle} b={`Discipline ${s.n} of 08`} />
        <div className="two">
          <div>
            <h2 id="h-what" style={{ maxWidth: '18ch' }}>{s.listTitle}.</h2>
            {s.ill && <div className="ph" style={{ aspectRatio: '16/10', marginTop: 28, maxWidth: 520 }}><Art kind={s.ill} /></div>}
            {isEmbedded && <div className="ph" style={{ aspectRatio: '21/9', marginTop: 28 }}><Photo name="solder-board" sizes="(min-width:960px) 45vw, 100vw" /><Fig name="solder-board" /></div>}
          </div>
          <ul className="ticks one">{s.list.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        {s.groups && (
          <>
            <h3 style={{ marginTop: 56 }}>{s.groupsTitle}</h3>
            <div className="caps rv">{s.groups.map((g) => (<div key={g.title}><h3>{g.title}</h3><p>{g.text}</p></div>))}</div>
          </>
        )}
        {s.note && <div className="notebox"><b>Status. </b>{s.note}</div>}
      </div></section>

      <section style={{ background: 'var(--white)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }} aria-labelledby="h-steps"><div className="wrap">
        <Sheet n={isEmbedded ? '03' : '02'} a="How we work" b="Approach" />
        <h2 id="h-steps" style={{ maxWidth: '24ch' }}>{s.stepsTitle}.</h2>
        <Ruler items={s.steps} />
      </div></section>

      {isEmbedded && (
        <section aria-labelledby="h-dom"><div className="wrap">
          <Sheet n="04" a="Application domains" b="Where it applies" />
          <h2 id="h-dom" style={{ maxWidth: '24ch' }}>Where embedded and IoT engineering applies.</h2>
          <div className="strip rv">
            <Link className="panel" href="/engineering-use-cases/" style={{ textDecoration: 'none' }}><Photo name="factory-corridor" sizes="(min-width:960px) 25vw, 50vw" pos="30% 50%" alt="" /><span className="mono">Domain</span><h3>Industrial &amp; manufacturing</h3><p>Machine health, process quality, controlled access.</p></Link>
            <Link className="panel" href="/engineering-use-cases/" style={{ textDecoration: 'none' }}><Photo name="vitals-monitor" sizes="(min-width:960px) 25vw, 50vw" pos="50% 35%" alt="" /><span className="mono">Domain</span><h3>Medical electronics</h3><p>ECG, wearables, emergency-asset readiness.</p></Link>
            <Link className="panel" href="/engineering-use-cases/" style={{ textDecoration: 'none' }}><Photo name="substation" sizes="(min-width:960px) 25vw, 50vw" alt="" /><span className="mono">Domain</span><h3>Utilities &amp; buildings</h3><p>Metering, HVAC and energy management.</p></Link>
            <Link className="panel" href="/engineering-use-cases/" style={{ textDecoration: 'none' }}><Photo name="water-treatment" sizes="(min-width:960px) 25vw, 50vw" alt="" /><span className="mono">Domain</span><h3>Water &amp; environment</h3><p>Quality monitoring and hazard alerts.</p></Link>
          </div>
          <div className="keybox k3" role="group" aria-label="How we label examples">
            {(['designed', 'proposed', 'capability'] as const).map((k) => (
              <div key={k}><Tag kind={k === 'designed' ? 'design' : k === 'proposed' ? 'prop' : 'cap'}>{statusLabel[k]}</Tag><p>{statusHelp[k]}</p></div>
            ))}
          </div>
        </div></section>
      )}

      <section style={{ background: isEmbedded ? 'var(--white)' : undefined, borderTop: '1px solid var(--rule)' }} aria-labelledby="h-more"><div className="wrap">
        <Sheet n={isEmbedded ? '05' : '03'} a="Related" b="Other disciplines" />
        <h2 id="h-more" style={{ maxWidth: '20ch' }}>Related disciplines.</h2>
        <div className="srows">
          {others.map((o) => (
            <Link key={o.slug} className="srow" href={`/services/${o.slug}/`}>
              <span className="n">{o.n}</span>
              <div className="media"><Photo name={o.photo} sizes="280px" pos={o.photoPos} alt="" /></div>
              <div><h3>{o.title}</h3><p>{o.tileBlurb}</p></div>
              <Tag kind={TAG[o.status]}>{serviceStatusLabel[o.status]}</Tag>
              <Arrow />
            </Link>
          ))}
        </div>
      </div></section>
      <Cta title={s.cta} />
    </>
  );
}
