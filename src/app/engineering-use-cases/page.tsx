import type { Metadata } from 'next';
import { PageHero, Pill } from '@/components/ui';
import { Reveal } from '@/components/motion';
import UseCaseLibrary from '@/components/UseCaseLibrary';
import { statusHelp, statusLabel } from '@/content/usecases';

export const metadata: Metadata = {
  title: 'Engineering Use Cases',
  description: 'AI and software use cases first, then AI meets machines: embedded, IoT and medical-electronics designs. Each entry shows its project status; images are representative where equipment was handed to clients or is confidential.',
  alternates: { canonical: '/engineering-use-cases/' },
};

export default function UseCases() {
  return (
    <>
      <PageHero photo="ai-vision-capsules" pos="50% 50%" crumbs={[{ href: '/', label: 'Home' }, { label: 'Engineering Use Cases' }]}>
        <h1 className="h-xl">Engineering <span className="hl">use cases</span>.</h1>
        <p className="lede" style={{ maxWidth: '60ch' }}>AI and software applications first, then AI meets machines: wearable and medical electronics, machine-health sensing, metering, building systems and connected devices. Each entry carries a project status, and images are labelled separately, so a representative picture never changes what the project is.</p>
      </PageHero>
      <section className="sec sec--mist" aria-labelledby="h-lib" style={{ paddingTop: 'clamp(48px,6vw,90px)' }}>
        <div className="container">
          <Reveal>
            <div className="cardgrid" style={{ marginBottom: 'clamp(32px,4vw,56px)' }} role="group" aria-label="How examples are labelled">
              {(['delivered', 'prototype', 'designed', 'proposed', 'capability'] as const).map((k) => (
                <div className="card" key={k} style={{ padding: 24 }}><Pill kind={{ delivered: 'built', prototype: 'eng', designed: 'design', proposed: 'prop', capability: 'cap' }[k] as 'built' | 'eng' | 'design' | 'prop' | 'cap'}>{statusLabel[k]}</Pill><p style={{ marginTop: 14 }}>{statusHelp[k]}</p></div>
              ))}
            </div>
          </Reveal>
          <UseCaseLibrary />
          <p className="fine" style={{ marginTop: 36 }}>Siddhrans designs, develops and delivers engineering solutions for clients. The project status shown on each entry is separate from its image. Many of the images here are representative or illustrative, because the physical equipment and deliverables were handed over to clients or are subject to confidentiality restrictions, so no photograph of the actual unit is available. An illustrative image does not mean the solution is conceptual. Performance, savings and accuracy figures from internal records are not republished until they can be verified. Photographs are licensed stock images; concept images are AI-generated and illustrative; line drawings are original illustrations.</p>
        </div>
      </section>
    </>
  );
}
