import type { Metadata } from 'next';
import { Crumbs } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Image credits',
  description: 'Sources and licences for the photographs used on this website.',
  alternates: { canonical: '/image-credits/' },
};

// Pexels photo IDs; contributor names are listed in docs/IMAGE_REGISTER.md where verified.
const CREDITS: [string, number][] = [
  ['Analyst working at two dashboard monitors', 8204355], ['Finger on a fingerprint access reader', 17155842], ['Automated assembly line', 16647824],
  ['University students in a lecture hall', 8199159], ['Teacher giving an online lesson', 5212666], ['Student marking an answer sheet', 31115182], ['Student with a tablet in class', 35715322],
  ['Hiring panel interviewing a candidate', 5439371], ['Handshake after an interview', 18848926], ['Interviewer reviewing a profile', 5439455],
  ['Film crew on a red-lit studio set', 8088386], ['Film crew in a café set', 9811306], ['Footballers in blue training kit (cropped)', 30726603],
  ['Software team around a monitor', 6804084], ['Two developers reviewing code', 7988745], ['Analyst in front of a data wall', 7567595],
  ['Access reader on a glass door', 37538043], ['Warehouse worker scanning stock', 4483941], ['Technician inspecting a circuit board', 35290693],
  ['Factory walkway with conveyors', 34718930], ['Pharmaceutical ampoule filling line', 37650270], ['Aerial view of a water treatment tank', 24802113],
  ['Engineer soldering a circuit board', 3912983], ['Soldering iron on a circuit board (cropped)', 37426135], ['Fibre-optic patch cables', 4373998],
  ['Electrical substation', 25537595], ['Aerial view of a solar farm', 35105444], ['Patient vitals monitor', 28782186],
];

// Images supplied by Siddhrans (not stock). Shown as illustrative; none is a photograph of a delivered product.
const SUPPLIED: [string, string, string][] = [
  ['Motor with vibration sensor, ESP32 board and waveform display', 'Motor vibration-sensing prototype', 'Vibration & Machine-Health Monitoring, Electronic Product Development, home page'],
  ['ESP32 breadboard with OLED display, SCT-013 current clamp and DS18B20 temperature probes, with labelled callouts', 'ESP32 sensing prototype', 'Theatre Air-Cooler Optimisation, Embedded Firmware, home page'],
];

export default function ImageCredits() {
  return (
    <>
      <header className="shero">
        <div className="container">
          <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Image credits' }]} />
          <h1 className="h-xl">Image credits</h1>
          <p className="lede" style={{ maxWidth: '62ch' }}>Most photographs on this website are stock images from <a href="https://www.pexels.com/license/" style={{ textDecoration: 'underline' }}>Pexels</a>, used under the Pexels licence. They illustrate themes and are <b>not photographs of Siddhrans project equipment</b>, which is typically handed to clients or confidential; the image says nothing about whether the project was delivered. Images captioned “AI-generated concept” were generated with AI tools and are representative, not photographs of delivered units; images captioned “Water-quality sensing prototype” are small reference photographs supplied by Siddhrans. Interface visuals are original concept designs with placeholder data; line drawings are original illustrations.</p>
        </div>
      </header>
      <section className="sec sec--white" style={{ paddingTop: 'clamp(40px,5vw,72px)' }}>
        <div className="container">
          <div className="table-wrap">
            <table className="credits-t">
              <caption className="mono" style={{ textAlign: 'left', padding: '0 0 12px', color: 'var(--ink-2)' }}>Photographs and sources</caption>
              <thead><tr><th scope="col">Image</th><th scope="col">Pexels photo</th></tr></thead>
              <tbody>{CREDITS.map(([t, id]) => (
                <tr key={id}><th scope="row" style={{ font: 'inherit', textTransform: 'none', letterSpacing: 0, color: 'inherit' }}>{t}</th><td><a href={`https://www.pexels.com/photo/${id}/`}>#{id}</a></td></tr>
              ))}</tbody>
            </table>
          </div>
          <div className="table-wrap" style={{ marginTop: 'clamp(32px,4vw,56px)' }}>
            <table className="credits-t">
              <caption className="mono" style={{ textAlign: 'left', padding: '0 0 12px', color: 'var(--ink-2)' }}>Images supplied by Siddhrans</caption>
              <thead><tr><th scope="col">Image</th><th scope="col">Caption on site</th><th scope="col">Used on</th></tr></thead>
              <tbody>{SUPPLIED.map(([t, c, u]) => (
                <tr key={t}><th scope="row" style={{ font: 'inherit', textTransform: 'none', letterSpacing: 0, color: 'inherit' }}>{t}</th><td>{c}</td><td>{u}</td></tr>
              ))}</tbody>
            </table>
          </div>
          <p className="fine" style={{ marginTop: 18 }}>These two prototype visuals were supplied by Siddhrans and are illustrative. They are not photographs of delivered products. Other supplied images are captioned where they appear.</p>
        </div>
      </section>
    </>
  );
}
