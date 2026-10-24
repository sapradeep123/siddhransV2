import type { Metadata } from 'next';
import { Tablet, PosUI } from '@/components/concept';
import { ParallaxFrame, Reveal } from '@/components/motion';
import { Button, Photo, PageHero, Pill, SecHead } from '@/components/ui';
import type { PhotoName } from '@/content/images';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Electronics and embedded engineering for manufacturing, medical devices, utilities and buildings, water and environment, and logistics, alongside delivered software for education, talent and retail.',
  alternates: { canonical: '/industries/' },
};

interface Industry { id: string; title: string; photo?: PhotoName; pos?: string; delivered: string[]; solutions: string[] }
const industries: Industry[] = [
  { id: 'manufacturing', title: 'Manufacturing & pharma', photo: 'ai-vision-capsules', pos: '50% 50%', delivered: [], solutions: ['Vibration & machine-health monitoring (designed system)', 'Smart-factory quality intelligence (designed system)', 'Contactless powder mixing (capability example)', 'Secure laboratory access & occupancy (capability example)'] },
  { id: 'healthcare', title: 'Healthcare & medical electronics', photo: 'ai-ecg-handheld', pos: '30% 50%', delivered: ['Dialysis management system'], solutions: ['Wearable PPG health sensor (capability example)', 'Handheld Bluetooth ECG (capability example)', 'Medical-kit & asset readiness (proposed solution)'] },
  { id: 'energy', title: 'Energy, utilities & buildings', photo: 'ai-iot-chiller', pos: '50% 50%', delivered: [], solutions: ['Gas-meter digitisation retrofit (proposed solution)', 'IoT HVAC energy management (proposed solution)', 'Theatre air-cooler optimisation (proposed solution)'] },
  { id: 'water', title: 'Water & environment', photo: 'ref-water-sensor-boat', pos: '50% 50%', delivered: [], solutions: ['Water-quality monitoring (capability example)', 'Industrial safety & environmental alerts (capability example)'] },
  { id: 'logistics', title: 'Logistics & cold chain', photo: 'ai-coldchain-truck', pos: '50% 50%', delivered: ['Cargo management system'], solutions: ['Cold-chain condition monitoring (capability example)', 'Smart warehouse & logistics (capability example)'] },
  { id: 'education', title: 'Education & training', photo: 'lecture-hall', pos: '50% 40%', delivered: ['Siddhrans LMS', 'Online training programmes'], solutions: [] },
  { id: 'talent', title: 'Talent & placement', photo: 'interview-panel', pos: '50% 40%', delivered: ['Talent Sandalwood', 'Talent Workforce', 'Talent Sports Force'], solutions: [] },
  { id: 'retail', title: 'Retail, events & business operations', delivered: ['GST Billing', 'Point of Sale', 'Restaurant', 'Catering', 'Gym Master', 'Salon', 'Film Event', 'Inventory management', 'Project Management System'], solutions: [] },
];

export default function Industries() {
  return (
    <>
      <PageHero photo="hw-solder-board" pos="50% 50%" crumbs={[{ href: '/', label: 'Home' }, { label: 'Industries' }]}>
        <h1 className="h-xl">Electronics engineering for operations that cannot afford <span className="hl">downtime</span>.</h1>
        <p className="lede" style={{ maxWidth: '62ch' }}>Our electronics and embedded engineering applies to manufacturing, medical devices, utilities and buildings, water and logistics. Our delivered software spans education, talent, healthcare, logistics and retail. Each industry below separates what we have built from what we can engineer.</p>
        <div className="phero__actions"><Button href="/contact/">Talk to an engineer</Button></div>
      </PageHero>
      <section className="sec sec--white" aria-labelledby="h-ind">
        <div className="container">
          <Reveal><SecHead row eyebrow="Industries" title={<span id="h-ind">Where the engineering applies.</span>} lede="“Systems built” are named in the company profile. “Engineering solutions” are reference examples, labelled by status, and are not presented as completed Siddhrans projects." /></Reveal>
          {industries.map((i, k) => (
            <div className={`frow${k % 2 ? ' frow--flip' : ''}`} id={i.id} key={i.id}>
              <Reveal className="frow__media">
                {i.photo ? <ParallaxFrame amount={6}><Photo name={i.photo} pos={i.pos} sizes="(min-width:960px) 50vw, 100vw" /></ParallaxFrame> : (
                  <div style={{ display: 'grid', placeItems: 'center', height: '100%', background: 'radial-gradient(70% 70% at 70% 20%,rgba(25,196,110,.3),transparent 65%),var(--navy-900)', padding: '8%' }}><div style={{ width: '88%' }}><Tablet><PosUI /></Tablet></div></div>
                )}
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="h-lg" style={{ marginBottom: 20 }}>{i.title}</h2>
                {i.delivered.length > 0 && (<><Pill kind="built">Systems built</Pill><ul className="tickgrid tickgrid--one" style={{ margin: '10px 0 20px' }}>{i.delivered.map((d) => <li key={d}>{d}</li>)}</ul></>)}
                {i.solutions.length > 0 && (<><Pill kind="eng">Engineering solutions</Pill><ul className="tickgrid tickgrid--one" style={{ margin: '10px 0 0' }}>{i.solutions.map((d) => <li key={d}>{d}</li>)}</ul></>)}
              </Reveal>
            </div>
          ))}
          <p className="fine" style={{ marginTop: 22 }}>Images are licensed stock photographs, supplied reference photographs or AI-generated concept visuals used for illustration, not Siddhrans project photographs. The point-of-sale interface is a concept design with placeholder data. See <a href="/engineering-use-cases/" style={{ textDecoration: 'underline' }}>engineering use cases</a>.</p>
        </div>
      </section>
    </>
  );
}
