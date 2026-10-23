import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Crumbs, PhotoCard } from '@/components/ui';
import { Reveal } from '@/components/motion';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${site.name}, ${site.city}, to discuss software, automation, security, infrastructure or embedded engineering.`,
  alternates: { canonical: '/contact/' },
};

export default function Contact() {
  return (
    <>
      <header className="shero">
        <div className="container">
          <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Contact' }]} />
          <h1 className="h-xl" style={{ maxWidth: '16ch' }}>Tell us what you want to <span className="hl">build</span>.</h1>
          <p className="lede" style={{ maxWidth: '54ch' }}>Software, automation, security, infrastructure or embedded systems: describe the problem and we will tell you how we would approach it.</p>
        </div>
      </header>
      <section className="sec sec--mist" style={{ paddingTop: 'clamp(40px,5vw,72px)' }}>
        <div className="container">
          <Reveal>
            <div className="contactgrid">
              <aside className="contactinfo" aria-label="Contact details">
                <PhotoCard name="handshake" sizes="(min-width:960px) 40vw, 100vw" pos="30% 40%" cap={false} alt="" />
                <dl style={{ margin: 0 }}>
                  <dt>Telephone</dt><dd>{site.phones.map((p) => (<a key={p.tel} href={`tel:${p.tel}`} style={{ display: 'block', width: 'fit-content', marginBottom: 6 }}>{p.display}</a>))}</dd>
                  <dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
                  <dt>Location</dt><dd>{site.city}, {site.country}</dd>
                  <dt>Company</dt><dd>{site.name}</dd>
                </dl>
                <p style={{ color: 'var(--slate-300)', fontSize: 14, marginTop: 'auto' }}>Background photograph is an illustrative stock image.</p>
              </aside>
              <div className="form-card"><ContactForm /></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
