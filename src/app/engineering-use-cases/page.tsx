import type { Metadata } from 'next';
import { Cta, PageHero } from '@/components/ui';
import UseCaseLibrary from '@/components/UseCaseLibrary';
import { statusHelp, statusLabel } from '@/content/usecases';

export const metadata: Metadata = {
  title: 'Engineering Use Cases',
  description: 'A library of embedded, IoT and AI engineering use cases across industrial, medical, utility, logistics and safety domains, each labelled by status.',
  alternates: { canonical: '/engineering-use-cases/' },
};

export default function UseCases() {
  return (
    <>
      <PageHero photo="pharma-line" pos="50% 45%" crumbs={[{ href: '/', label: 'Home' }, { label: 'Engineering Use Cases' }]}>
        <h1>Engineering <mark>use cases</mark>.</h1>
        <p className="lede" style={{ maxWidth: '60ch' }}>Reference engineering examples across industrial, medical, utility, logistics, safety and AI domains. Every entry is labelled so you can tell a design from a proposal from a capability example.</p>
      </PageHero>
      <section style={{ paddingTop: 48 }} aria-labelledby="h-lib"><div className="wrap">
        <div className="keybox k3" role="group" aria-label="How examples are labelled" style={{ marginTop: 0, marginBottom: 40 }}>
          {(['designed', 'proposed', 'capability'] as const).map((k) => (
            <div key={k}><b>{statusLabel[k]}</b><p>{statusHelp[k]}</p></div>
          ))}
        </div>
        <UseCaseLibrary />
        <p className="fine" style={{ marginTop: 32 }}>Examples are drawn from engineering reference material and are not a list of completed Siddhrans projects. Performance, savings and accuracy figures in the source material are not republished because they are unverified. Photographs are licensed stock images; line drawings are original illustrations.</p>
      </div></section>
      <Cta title="Don't see your use case? Describe it." />
    </>
  );
}
