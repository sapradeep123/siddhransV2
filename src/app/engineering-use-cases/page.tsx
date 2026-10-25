import type { Metadata } from 'next';
import { PageHero } from '@/components/ui';
import { Reveal } from '@/components/motion';
import UseCaseLibrary from '@/components/UseCaseLibrary';

export const metadata: Metadata = {
  title: 'Engineering Use Cases',
  description: 'Working engineering solutions developed, tested and delivered by Siddhrans: AI and software first, then embedded, IoT and medical-electronics systems. Filter by industry or technology.',
  alternates: { canonical: '/engineering-use-cases/' },
};

export default function UseCases() {
  return (
    <>
      <PageHero photo="ai-vision-capsules" pos="50% 50%" crumbs={[{ href: '/', label: 'Home' }, { label: 'Engineering Use Cases' }]}>
        <h1 className="h-xl">Engineering <span className="hl">use cases</span>.</h1>
        <p className="lede" style={{ maxWidth: '60ch' }}>Working solutions Siddhrans has developed, tested and delivered for clients: AI and software applications, then machines with intelligence built in, from wearable and medical electronics to machine-health sensing, metering, building systems and connected devices.</p>
      </PageHero>
      <section className="sec sec--mist" aria-labelledby="h-lib" style={{ paddingTop: 'clamp(48px,6vw,90px)' }}>
        <div className="container">
          <Reveal>
            <p className="lede" style={{ maxWidth: '70ch', marginBottom: 'clamp(28px,3.5vw,44px)' }}>Siddhrans designs, develops and delivers engineering solutions for clients. Clients received the working solution and the technical deliverables that went with it, such as hardware or prototypes, firmware, source code, software and engineering designs, so they could integrate, extend and commercialise it themselves.</p>
          </Reveal>
          <UseCaseLibrary />
          <p className="fine" style={{ marginTop: 36 }}>Images are representative illustrations: the equipment and deliverables were handed over to clients or are confidential. Sources and licences are on the <a href="/image-credits/" style={{ textDecoration: 'underline' }}>Image Credits</a> page. Client names, measured results and production volumes are not published.</p>
        </div>
      </section>
    </>
  );
}
