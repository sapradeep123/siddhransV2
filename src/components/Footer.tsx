import { site } from '@/content/site';
import { services } from '@/content/services';
import { Arrow, Button, Logo } from './ui';

const GROUPS: [string, string[]][] = [
  ['AI & Automation', ['ai-ml-intelligent-automation', 'rpa-business-automation', 'edge-ai-intelligent-electronics']],
  ['Software', ['enterprise-software-engineering', 'data-analytics-integration']],
  ['Embedded & electronics', ['embedded-systems-industrial-iot', 'embedded-firmware-microcontrollers', 'pcb-hardware-engineering', 'electronic-product-development', 'vlsi-semiconductor-design']],
  ['Cloud, security & managed', ['cybersecurity', 'cloud-infrastructure', 'managed-technology-services']],
];
const EXPLORE: [string, string][] = [['Products & Solutions', '/products/'], ['Industries', '/industries/'], ['Case Studies', '/case-studies/'], ['Engineering Use Cases', '/engineering-use-cases/'], ['About', '/about/'], ['Contact', '/contact/']];

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <section className="fcta" aria-labelledby="fcta-h">
          <div>
            <p className="eyebrow">Work with Siddhrans</p>
            <h2 id="fcta-h" className="h-xl">Let&apos;s engineer what comes next.</h2>
            <p className="lede">From AI agents and enterprise software to connected, intelligent machines: tell us what you want to build.</p>
          </div>
          <Button href="/contact/" variant="yellow">Start a conversation</Button>
        </section>

        <div className="fcols">
          <div className="fcol fcol--brand">
            <div className="logoplate"><Logo width="100%" eager={false} /></div>
            <p>AI-led engineering from software to smart machines. An engineering practice since {site.founded}, based in {site.city}, {site.country}.</p>
            <p className="fcol__loc"><span aria-hidden="true" className="dot" />{site.city}, {site.country}</p>
          </div>
          <nav className="fcol fcol--svc" aria-label="Services">
            <h2>Services</h2>
            <div className="fgroups">
              {GROUPS.map(([g, slugs]) => (
                <div key={g}>
                  <p className="fgroup">{g}</p>
                  <ul>{slugs.map((slug) => { const sv = services.find((x) => x.slug === slug)!; return (<li key={slug}><a href={`/services/${slug}/`}>{sv.short}</a></li>); })}</ul>
                </div>
              ))}
            </div>
            <ul><li><a className="fall" href="/services/">View all services <span aria-hidden="true"><Arrow /></span></a></li></ul>
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
