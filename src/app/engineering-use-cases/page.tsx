import type { Metadata } from 'next';
import { PageHero, Pill } from '@/components/ui';
import { Reveal } from '@/components/motion';
import UseCaseLibrary from '@/components/UseCaseLibrary';
import { statusHelp, statusLabel } from '@/content/usecases';

export const metadata: Metadata = {
  title: 'Engineering Use Cases',
  description: 'AI and software use cases first, then AI meets machines: embedded, IoT and medical-electronics designs. Each is labelled as a designed system, proposed solution or capability example.',
  alternates: { canonical: '/engineering-use-cases/' },
};

export default function UseCases() {
  return (
    <>
      <PageHero photo="ai-vision-capsules" pos="50% 50%" crumbs={[{ href: '/', label: 'Home' }, { label: 'Engineering Use Cases' }]}>
        <h1 className="h-xl">Engineering <span className="hl">use cases</span>.</h1>
        <p className="lede" style={{ maxWidth: '60ch' }}>AI and software applications first, then AI meets machines: wearable and medical electronics, machine-health sensing, metering, building systems and connected devices. Every entry is labelled so you can tell a design from a proposal from a capability example.</p>
      </PageHero>
      <section className="sec sec--mist" aria-labelledby="h-lib" style={{ paddingTop: 'clamp(48px,6vw,90px)' }}>
        <div className="container">
          <Reveal>
            <div className="cardgrid" style={{ marginBottom: 'clamp(32px,4vw,56px)' }} role="group" aria-label="How examples are labelled">
              {(['designed', 'proposed', 'capability'] as const).map((k) => (
                <div className="card" key={k} style={{ padding: 24 }}><Pill kind={k === 'designed' ? 'design' : k === 'proposed' ? 'prop' : 'cap'}>{statusLabel[k]}</Pill><p style={{ marginTop: 14 }}>{statusHelp[k]}</p></div>
              ))}
            </div>
          </Reveal>
          <UseCaseLibrary />
          <p className="fine" style={{ marginTop: 36 }}>Examples are drawn from engineering reference material and are not a list of completed Siddhrans projects. Performance, savings and accuracy figures in the source material are not republished because they are unverified. Photographs are licensed stock images; concept images are AI-generated and illustrative; line drawings are original illustrations.</p>
        </div>
      </section>
    </>
  );
}
