import { site } from '@/content/site';
import { services } from '@/content/services';
import { Arrow, Button, Logo } from './ui';

const PRIMARY = ['pcb-hardware-engineering', 'embedded-firmware-microcontrollers', 'vlsi-semiconductor-design', 'electronic-product-development', 'embedded-systems-industrial-iot', 'edge-ai-intelligent-electronics'];
const EXPLORE: [string, string][] = [['Products & Solutions', '/products/'], ['Industries', '/industries/'], ['Case Studies', '/case-studies/'], ['Engineering Use Cases', '/engineering-use-cases/'], ['About', '/about/'], ['Contact', '/contact/']];

export default function Footer() {
  const primary = PRIMARY.map((slug) => services.find((s) => s.slug === slug)!);
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <section className="fcta" aria-labelledby="fcta-h">
          <div>
            <p className="eyebrow">Work with Siddhrans</p>
            <h2 id="fcta-h" className="h-xl">Let&apos;s engineer what comes next.</h2>
            <p className="lede">From circuit design and firmware to connected, intelligent systems: tell us about the product, board or machine you want to engineer.</p>
          </div>
          <Button href="/contact/" variant="yellow">Start a conversation</Button>
        </section>

        <div className="fcols">
          <div className="fcol fcol--brand">
            <div className="logoplate"><Logo width="100%" eager={false} /></div>
            <p>{site.tagline}. An engineering practice since {site.founded}, based in {site.city}, {site.country}.</p>
            <p className="fcol__loc"><span aria-hidden="true" className="dot" />{site.city}, {site.country}</p>
          </div>
          <nav className="fcol" aria-label="Services">
            <h2>Services</h2>
            <ul>
              {primary.map((s) => (<li key={s.slug}><a href={`/services/${s.slug}/`}>{s.short}</a></li>))}
              <li><a className="fall" href="/services/">View all services <span aria-hidden="true"><Arrow /></span></a></li>
            </ul>
          </nav>
          <nav className="fcol" aria-label="Explore">
            <h2>Explore</h2>
            <ul>{EXPLORE.map(([t, h]) => (<li key={h}><a href={h}>{t}</a></li>))}</ul>
          </nav>
          <div className="fcol">
            <h2>Get in touch</h2>
            <ul className="fcontact">
              {site.phones.map((p) => (<li key={p.tel}><span className="k">Call</span><a href={`tel:${p.tel}`}>{p.display}</a></li>))}
              <li><span className="k">Email</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><span className="k">Visit</span><span>{site.city}, {site.country}</span></li>
            </ul>
          </div>
        </div>

        <div className="fbar">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="fbar__links"><a href="/privacy/">Privacy Policy</a><a href="/image-credits/">Image Credits</a></span>
          <span className="fbar__note">Photographs are licensed stock images and concept visuals are AI-generated; they are not Siddhrans project photographs. Interface visuals are concept designs.</span>
        </div>
      </div>
    </footer>
  );
}
