import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { Button, Eyebrow, Photo, PhotoCard, PageHero, Pill, SecHead } from '@/components/ui';
import { SignalChain, Steps, VlsiFlow } from '@/components/diagrams';
import { serviceBySlug, serviceStatusLabel, services, type ServiceStatus } from '@/content/services';
import { statusHelp, statusLabel } from '@/content/usecases';
import type { PhotoName } from '@/content/images';

const KIND: Record<ServiceStatus, 'built' | 'cap' | 'eng'> = { built: 'built', evidenced: 'built', capability: 'cap', solutions: 'eng', scoped: 'cap' };
// A second, different photograph for the body of each page (no photo is repeated within a page).
const SECOND: Partial<Record<string, PhotoName>> = {
  'pcb-hardware-engineering': 'hw-solder-board', 'embedded-firmware-microcontrollers': 'ref-esp32-breadboard', 'electronic-product-development': 'ref-motor-vibration-board',
  'embedded-systems-industrial-iot': 'ref-pump-installation', 'edge-ai-intelligent-electronics': 'ref-label-mismatch',
  'enterprise-software-engineering': 'dev-pair', 'ai-ml-intelligent-automation': 'analyst-dashboards', 'rpa-business-automation': 'warehouse-scan',
  cybersecurity: 'ref-access-watch', 'data-analytics-integration': 'data-wall', 'managed-technology-services': 'dev-team',
};

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
  const second = SECOND[s.slug];
  const others = services.filter((x) => x.slug !== s.slug && x.track === s.track).slice(0, 3);

  return (
    <>
      <PageHero photo={s.photo} pos={s.photoPos} crumbs={[{ href: '/', label: 'Home' }, { href: '/services/', label: 'Services' }, { label: s.short }]}>
        <Pill kind={KIND[s.status]}>{serviceStatusLabel[s.status]}</Pill>
        <h1 className="h-xl" style={{ maxWidth: '16ch' }}>{s.title}</h1>
        <p className="lede" style={{ maxWidth: '58ch' }}>{s.intro}</p>
        <div className="phero__actions">
          <Button href="/contact/">{s.track === 'electronics' ? 'Discuss a hardware project' : 'Discuss a project'}</Button>
          {s.track === 'electronics' && <Button href="/engineering-use-cases/" variant="ghost">See engineering use cases</Button>}
        </div>
      </PageHero>

      <section className="sec sec--white" aria-labelledby="h-what">
        <div className="container">
          <div className="story">
            <Reveal>
              <Eyebrow>Discipline {s.n} of {String(services.length).padStart(2, '0')}</Eyebrow>
              <h2 id="h-what" className="h-xl" style={{ margin: '18px 0 24px' }}>{s.listTitle}.</h2>
              {s.art === 'vlsi' ? <VlsiFlow compact /> : second && <PhotoCard name={second} sizes="(min-width:1180px) 40vw, 100vw" className={`photo--wide${second === 'ref-esp32-breadboard' || second === 'ref-motor-vibration-board' ? ' photo--contain' : ''}`} style={{ borderRadius: 'var(--r-xl)' }} />}
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="tickgrid tickgrid--one">{s.list.map((x) => <li key={x}>{x}</li>)}</ul>
            </Reveal>
          </div>
          {s.groups && (
            <>
              <h3 className="h-md" style={{ marginTop: 'clamp(40px,5vw,72px)' }}>{s.groupsTitle}</h3>
              <Stagger className="cardgrid" style={{ marginTop: 22 }}>
                {s.groups.map((g, i) => (<StaggerItem key={g.title}><div className="card" style={{ height: '100%' }}><small>{String(i + 1).padStart(2, '0')}</small><h3>{g.title}</h3><p>{g.text}</p></div></StaggerItem>))}
              </Stagger>
            </>
          )}
          {s.note && <div className="notice"><b>Status. </b>{s.note.replace(/^Status: /, '')}</div>}
        </div>
      </section>

      {isEmbedded && (
        <section className="sec sec--dark diag-top" aria-labelledby="h-chain">
          <div className="container">
            <Reveal><SecHead eyebrow="Signal chain" title={<span id="h-chain">One chain, engineered as one system.</span>} /></Reveal>
            <Reveal><SignalChain /></Reveal>
          </div>
        </section>
      )}

      <section className="sec sec--mist" aria-labelledby="h-steps">
        <div className="container">
          <Reveal><SecHead row eyebrow="How we work" title={<span id="h-steps">{s.stepsTitle}.</span>} /></Reveal>
          <Reveal delay={0.05}><Steps items={s.steps} /></Reveal>
        </div>
      </section>

      {isEmbedded && (
        <section className="sec sec--white" aria-labelledby="h-dom">
          <div className="container">
            <Reveal><SecHead row eyebrow="Application domains" title={<span id="h-dom">Where embedded and IoT engineering applies.</span>} lede="Examples across these domains are labelled so you can tell a design from a proposal from a capability example." /></Reveal>
            <Stagger className="bento" gap={0.07}>
              {[
                { p: 'ai-vision-capsules' as const, t: 'Industrial & manufacturing', d: 'Machine health, process quality, controlled access.', pos: '50% 50%' },
                { p: 'ai-ecg-handheld' as const, t: 'Medical electronics', d: 'ECG, wearables, emergency-asset readiness.', pos: '30% 50%' },
                { p: 'ai-iot-chiller' as const, t: 'Utilities & buildings', d: 'Metering, HVAC and energy management.', pos: '50% 50%' },
                { p: 'ref-water-sensor-boat' as const, t: 'Water & environment', d: 'Quality monitoring and hazard alerts.', pos: '50% 50%' },
              ].map((d) => (
                <StaggerItem key={d.t} className="bcell" style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
                  <a className="bi" href="/engineering-use-cases/"><Photo name={d.p} sizes="(min-width:1180px) 25vw, 50vw" pos={d.pos} alt="" /><h3>{d.t}</h3><p>{d.d}</p></a>
                </StaggerItem>
              ))}
            </Stagger>
            <Stagger className="cardgrid" style={{ marginTop: 28 }}>
              {(['designed', 'proposed', 'capability'] as const).map((k) => (
                <StaggerItem key={k}><div className="card" style={{ height: '100%' }}><Pill kind={k === 'designed' ? 'design' : k === 'proposed' ? 'prop' : 'cap'}>{statusLabel[k]}</Pill><p style={{ marginTop: 18 }}>{statusHelp[k]}</p></div></StaggerItem>
              ))}
            </Stagger>
            <p className="fine" style={{ marginTop: 22 }}>Images are illustrative (licensed stock, supplied reference photographs or AI-generated concepts), not Siddhrans project photographs.</p>
          </div>
        </section>
      )}

      <section className="sec sec--navy" aria-labelledby="h-more">
        <div className="container">
          <Reveal><SecHead row eyebrow="Related" title={<span id="h-more">Related disciplines.</span>} /></Reveal>
          <Stagger className="cardgrid">
            {others.map((o) => (
              <StaggerItem key={o.slug}>
                <a className="casecard" href={`/services/${o.slug}/`} style={{ minHeight: 360 }}>
                  <PhotoCard name={o.photo} sizes="(min-width:960px) 30vw, 100vw" pos={o.photoPos} cap={false} alt="" />
                  <Pill kind={KIND[o.status]}>{serviceStatusLabel[o.status]}</Pill>
                  <h3 style={{ fontSize: 28 }}>{o.title}</h3>
                  <p>{o.tileBlurb}</p>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
