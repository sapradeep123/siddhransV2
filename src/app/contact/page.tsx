import type { Metadata } from 'next';
import { Crumbs, Fig, Photo } from '@/components/ui';
import ContactForm from '@/components/ContactForm';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${site.name}, ${site.city}, to discuss software, automation, security, infrastructure or embedded engineering.`,
  alternates: { canonical: '/contact/' },
};

export default function Contact() {
  return (
    <>
      <div className="ph contact-band"><Photo name="fibre-patch" priority sizes="100vw" pos="50% 40%" alt="" /><Fig name="fibre-patch" /></div>
      <div className="page-head grid-bg" style={{ paddingBottom: 36 }}>
        <div className="wrap">
          <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Contact' }]} />
          <h1 style={{ fontSize: 'clamp(38px,5.4vw,74px)', maxWidth: '16ch' }}>Tell us what you want to <mark>build</mark>.</h1>
        </div>
      </div>
      <section style={{ paddingTop: 56 }}>
        <div className="wrap contact">
          <ContactForm />
          <aside className="side" aria-label="Contact details">
            <dl>
              <dt>Telephone</dt><dd><a href={`tel:${site.phone.tel}`}>{site.phone.display}</a></dd>
              <dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
              <dt>Location</dt><dd>{site.city}, {site.country}</dd>
              <dt>Company</dt><dd>{site.name}</dd>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
