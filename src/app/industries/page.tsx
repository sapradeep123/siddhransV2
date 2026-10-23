import type { Metadata } from 'next';
import Link from '@/components/Link';
import { Art, Cta, PageHero, Photo, RawSvg, Sheet, Tag } from '@/components/ui';
import { interfaceSchematics } from '@/components/svgart';
import type { PhotoName } from '@/content/images';
import type { IllustrationKind } from '@/components/svgart';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Industries served through delivered software and engineering solutions: education, talent, healthcare, logistics, manufacturing, energy, water and retail.',
  alternates: { canonical: '/industries/' },
};

interface Industry { id: string; title: string; photo?: PhotoName; pos?: string; ill?: IllustrationKind; ui?: keyof typeof interfaceSchematics; delivered: string[]; solutions: string[]; }
const industries: Industry[] = [
  { id: 'education', title: 'Education & training', ui: 'lms', delivered: ['Siddhrans LMS', 'Online training programmes'], solutions: [] },
  { id: 'talent', title: 'Talent & placement', ui: 'talent', delivered: ['Talent Sandalwood', 'Talent Workforce', 'Talent Sports Force'], solutions: [] },
  { id: 'healthcare', title: 'Healthcare & medical electronics', photo: 'vitals-monitor', pos: '50% 35%', delivered: ['Dialysis management system'], solutions: ['Handheld Bluetooth ECG (capability example)', 'Medical-kit & asset readiness (proposed solution)'] },
  { id: 'logistics', title: 'Logistics & cold chain', ill: 'logistics', delivered: ['Cargo management system'], solutions: ['Cold-chain condition monitoring (capability example)', 'Smart warehouse & logistics (capability example)'] },
  { id: 'manufacturing', title: 'Manufacturing & pharma', photo: 'pharma-line', delivered: [], solutions: ['Vibration & machine-health monitoring (designed system)', 'Smart-factory quality intelligence (designed system)', 'Secure laboratory access & occupancy (capability example)'] },
  { id: 'energy', title: 'Energy, utilities & buildings', photo: 'solar-farm', pos: '60% 50%', delivered: [], solutions: ['Gas-meter digitisation retrofit (proposed solution)', 'IoT HVAC energy management (proposed solution)', 'Theatre air-cooler optimisation (proposed solution)'] },
  { id: 'water', title: 'Water & environment', photo: 'water-treatment', delivered: [], solutions: ['Water-quality monitoring (capability example)', 'Industrial safety & environmental alerts (capability example)'] },
  { id: 'retail', title: 'Retail, events & business operations', ui: 'ops', delivered: ['GST Billing', 'Point of Sale', 'Restaurant', 'Catering', 'Gym Master', 'Salon', 'Film Event', 'Inventory management', 'Project Management System'], solutions: [] },
];

export default function Industries() {
  return (
    <>
      <PageHero photo="factory-corridor" crumbs={[{ href: '/', label: 'Home' }, { label: 'Industries' }]}>
        <h1>Built for operations that cannot afford <mark>downtime</mark>.</h1>
        <p className="lede" style={{ maxWidth: '62ch' }}>Our delivered software spans education, logistics, healthcare, events and retail. Our engineering solutions extend into manufacturing, utilities, buildings and safety. Each industry below separates what we have built from what we can engineer.</p>
      </PageHero>
      <section aria-labelledby="h-ind"><div className="wrap">
        <Sheet n="01" a="Industries" b="Built vs engineered" />
        <h2 id="h-ind" style={{ maxWidth: '22ch' }}>Where the engineering applies.</h2>
        <div style={{ marginTop: 40 }}>
          {industries.map((i, k) => (
            <div id={i.id} key={i.id} className="two rv" style={{ padding: '36px 0', borderTop: k === 0 ? '1.5px solid var(--ink)' : '1px solid var(--rule)', alignItems: 'center' }}>
              <div className="ph" style={{ aspectRatio: '16/10' }}>{i.photo ? <Photo name={i.photo} pos={i.pos} sizes="(min-width:960px) 45vw, 100vw" /> : i.ui ? <RawSvg html={interfaceSchematics[i.ui]} /> : <Art kind={i.ill ?? 'sensor'} />}</div>
              <div>
                <h3 style={{ fontSize: 'clamp(22px,2.4vw,30px)', marginBottom: 14 }}>{i.title}</h3>
                {i.delivered.length > 0 && (<><Tag kind="delivered">Systems built</Tag><ul className="ticks one" style={{ margin: '10px 0 18px' }}>{i.delivered.map((d) => <li key={d}>{d}</li>)}</ul></>)}
                {i.solutions.length > 0 && (<><Tag kind="eng">Engineering solutions</Tag><ul className="ticks one" style={{ margin: '10px 0 0' }}>{i.solutions.map((d) => <li key={d}>{d}</li>)}</ul></>)}
              </div>
            </div>
          ))}
        </div>
        <p className="fine" style={{ marginTop: 22 }}>&quot;Systems built&quot; are named in the company profile. &quot;Engineering solutions&quot; are reference examples, labelled by status, and are not presented as completed Siddhrans projects. See <Link href="/engineering-use-cases/" style={{ textDecoration: 'underline' }}>engineering use cases</Link>. Photographs are illustrative stock images.</p>
      </div></section>
      <Cta title="Tell us about your industry and your problem." />
    </>
  );
}
