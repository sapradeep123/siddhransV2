import type { Metadata } from 'next';
import { Laptop, LmsUI, Phone, PhoneLmsUI, PhoneTalentUI, TalentUI } from '@/components/concept';
import { ParallaxFrame, Reveal, Stagger, StaggerItem } from '@/components/motion';
import { Crumbs, Eyebrow, Photo, PhotoCard, Pill } from '@/components/ui';
import { photoCaption, type PhotoName } from '@/content/images';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Two delivered platforms in detail: Siddhrans LMS for training delivery, and the Talent platforms for three talent markets.',
  alternates: { canonical: '/case-studies/' },
};

const Facts = ({ items }: { items: [string, string][] }) => (
  <Reveal><div className="facts">{items.map(([k, v]) => (<div key={k}><b>{k}</b><span>{v}</span></div>))}</div></Reveal>
);
const Chapter = ({ id, photo, pos, kicker, title, lede }: { id: string; photo: PhotoName; pos?: string; kicker: string; title: string; lede: string }) => {
  const H = id === 'lms' ? 'h1' : 'h2';
  return (
  <header className="chapter-hero" id={id}>
    <PhotoCard name={photo} priority pos={pos} sizes="100vw" alt="" cap={false} />
    <span className="photo__cap hero-cap"><b>Illustrative image</b> · {photoCaption[photo]}</span>
    <div className="container chapter-hero__in">
      {id === 'lms' && <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Case Studies' }]} />}
      <div style={{ margin: id === 'lms' ? '20px 0 18px' : '0 0 18px', display: 'flex', gap: 10, flexWrap: 'wrap' }}><Pill kind="built">Systems built</Pill><span className="pill pill--concept">{kicker}</span></div>
      <H className="h-xl" style={{ maxWidth: '15ch', color: '#fff' }}>{title}</H>
      <p className="lede" style={{ color: 'var(--slate-200)', marginTop: 20 }}>{lede}</p>
      <nav className="chapter-nav" aria-label={`Jump to chapter (${id})`} style={{ marginTop: 24 }}>
        <a href="#lms">Siddhrans LMS</a><a href="#talent">Talent platforms</a>
      </nav>
    </div>
  </header>
  );
};

export default function CaseStudies() {
  return (
    <>
      {/* ================= LMS ================= */}
      <Chapter id="lms" photo="lecture-hall" pos="50% 35%" kicker="Education & training" title="Siddhrans LMS: training delivery, structured end to end." lede="A learning platform built so training providers can run programmes, deliver content, assess learners and process results in one place." />
      <section className="sec sec--white" aria-labelledby="lms-req">
        <div className="container">
          <Facts items={[['Sector', 'Education & training'], ['Delivered as', 'Web platform'], ['Engineering', 'Web application, database design, workflow and result processing, reporting'], ['Status', 'Systems built']]} />
          <div className="story" style={{ marginTop: 'clamp(48px,7vw,110px)' }}>
            <Reveal>
              <div className="story__n" aria-hidden="true" data-n="01" />
              <Eyebrow>The business requirement</Eyebrow>
              <h2 id="lms-req" className="h-lg" style={{ margin: '16px 0 18px' }}>Programmes run on spreadsheets, email and paper.</h2>
              <p className="lede">Training providers needed a structured way to run programmes, deliver content, assess learners and process results, without stitching together spreadsheets, email and paper.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="collage2">
                <div className="k1"><PhotoCard name="virtual-lesson" sizes="(min-width:1180px) 40vw, 90vw" style={{ height: '100%' }} pos="60% 50%" /></div>
                <div className="k2"><PhotoCard name="exam-omr" sizes="(min-width:1180px) 18vw, 40vw" cap={false} style={{ height: '100%' }} pos="40% 50%" /></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec sec--navy diag-top" aria-labelledby="lms-sol">
        <div className="container">
          <div className="story story--flip">
            <Reveal>
              <div className="story__n" aria-hidden="true" data-n="02" />
              <Eyebrow>The engineered solution</Eyebrow>
              <h2 id="lms-sol" className="h-lg" style={{ margin: '16px 0 8px' }}>One platform for the whole programme.</h2>
              <ol className="checks"><li>Programme &amp; batch management</li><li>Content delivery &amp; learner workflows</li><li>Assessment &amp; examination workflows</li><li>Result processing</li><li>Records &amp; operational reporting</li></ol>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ position: 'relative', paddingBottom: '8%' }}>
                <div style={{ width: '90%' }}><Laptop><LmsUI /></Laptop></div>
                <div style={{ position: 'absolute', right: 0, bottom: 0, width: '24%' }}><Phone><PhoneLmsUI /></Phone></div>
              </div>
              <p className="fine" style={{ marginTop: 18 }}>Concept interface with placeholder data, illustrating the platform. Not a screenshot of a delivered product.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec sec--white" aria-labelledby="lms-out">
        <div className="container">
          <div className="story">
            <Reveal>
              <div className="story__n" aria-hidden="true" data-n="03" />
              <Eyebrow>What it enabled</Eyebrow>
              <h2 id="lms-out" className="h-lg" style={{ margin: '16px 0 8px' }}>A foundation for examination-grade solutions.</h2>
              <ol className="checks"><li>Programmes, batches and content in one system</li><li>Assessment and result workflows in the same platform</li><li>Reporting over training operations</li><li>A platform basis for examination-grade solutions</li></ol>
              <p className="fine" style={{ marginTop: 22 }}>No client names or performance figures are published for this platform.</p>
            </Reveal>
            <Reveal delay={0.1}><div className="ph-frame" style={{ aspectRatio: '4/3' }}><ParallaxFrame amount={6}><Photo name="tablet-study" sizes="(min-width:1180px) 40vw, 100vw" pos="55% 40%" /></ParallaxFrame><span className="photo__cap"><b>Illustrative image</b> · Classroom tablet</span></div></Reveal>
          </div>
        </div>
      </section>

      {/* ================= TALENT ================= */}
      <Chapter id="talent" photo="interview-panel" pos="50% 40%" kicker="Talent & placement" title="Talent platforms: one pattern, three talent markets." lede="A family of three sector platforms on a shared engineering pattern: profiles, discovery and placement workflows tailored to each market." />
      <section className="sec sec--white" aria-labelledby="tal-req">
        <div className="container">
          <Facts items={[['Sector', 'Talent & placement'], ['Markets', 'Film & creative, staffing, sports'], ['Engineering', 'Profiles, search and placement workflow on a shared base'], ['Status', 'Systems built']]} />
          <div className="story" style={{ marginTop: 'clamp(48px,7vw,110px)' }}>
            <Reveal>
              <div className="story__n" aria-hidden="true" data-n="01" />
              <Eyebrow>The business requirement</Eyebrow>
              <h2 id="tal-req" className="h-lg" style={{ margin: '16px 0 18px' }}>Discovery by personal network and paper record.</h2>
              <p className="lede">Talent-driven sectors ran discovery and placement through personal networks and paper records: slow, narrow and hard to audit.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="collage2">
                <div className="k1"><PhotoCard name="interview-clipboard" sizes="(min-width:1180px) 40vw, 90vw" style={{ height: '100%' }} pos="40% 50%" /></div>
                <div className="k2"><PhotoCard name="handshake" sizes="(min-width:1180px) 18vw, 40vw" cap={false} style={{ height: '100%' }} pos="35% 40%" /></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec sec--navy diag-top" aria-labelledby="tal-sol">
        <div className="container">
          <div className="story story--flip">
            <Reveal>
              <div className="story__n" aria-hidden="true" data-n="02" />
              <Eyebrow>What Siddhrans built</Eyebrow>
              <h2 id="tal-sol" className="h-lg" style={{ margin: '16px 0 8px' }}>Three platforms, one engineering base.</h2>
              <ol className="checks"><li>Talent Sandalwood: film and creative-industry talent</li><li>Talent Workforce: staffing and workforce placement</li><li>Talent Sports Force: sports talent and placement</li></ol>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ position: 'relative', paddingBottom: '8%' }}>
                <div style={{ width: '90%' }}><Laptop><TalentUI /></Laptop></div>
                <div style={{ position: 'absolute', right: 0, bottom: 0, width: '24%' }}><Phone><PhoneTalentUI /></Phone></div>
              </div>
              <p className="fine" style={{ marginTop: 18 }}>Concept interface with placeholder data, illustrating the platform. Not a screenshot of a delivered product.</p>
            </Reveal>
          </div>
          <Stagger className="cardgrid" style={{ marginTop: 'clamp(40px,5vw,72px)' }}>
            {([['film-set', 'Talent Sandalwood', 'Film & creative-industry talent'], ['interview-panel', 'Talent Workforce', 'Staffing & workforce placement'], ['sports-training', 'Talent Sports Force', 'Sports talent & placement']] as const).map(([p, t, d]) => (
              <StaggerItem key={t}>
                <div className="casecard" style={{ minHeight: 340 }}><PhotoCard name={p} sizes="(min-width:960px) 30vw, 100vw" pos="50% 40%" /><h3 style={{ fontSize: 28 }}>{t}</h3><p style={{ marginBottom: 0 }}>{d}</p></div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="sec sec--white" aria-labelledby="tal-out">
        <div className="container">
          <div className="story">
            <Reveal>
              <div className="story__n" aria-hidden="true" data-n="03" />
              <Eyebrow>What it enabled</Eyebrow>
              <h2 id="tal-out" className="h-lg" style={{ margin: '16px 0 8px' }}>Structured, searchable, auditable talent records.</h2>
              <ol className="checks"><li>Structured talent records in place of paper</li><li>Searchable discovery across each sector</li><li>One engineering base, three distinct markets</li></ol>
              <p className="fine" style={{ marginTop: 22 }}>No client names or performance figures are published for these platforms.</p>
            </Reveal>
            <Reveal delay={0.1}><div className="ph-frame" style={{ aspectRatio: '4/3' }}><ParallaxFrame amount={6}><Photo name="film-crew" sizes="(min-width:1180px) 40vw, 100vw" pos="50% 40%" /></ParallaxFrame><span className="photo__cap"><b>Illustrative image</b> · Film crew</span></div></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
