import type { Metadata } from 'next';
import { Crumbs } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Image credits',
  description: 'Sources and licences for the photographs used on this website.',
  alternates: { canonical: '/image-credits/' },
};

// Photographer names are the usernames in Pexels download file names (see docs/IMAGE_REGISTER.md).
const CREDITS: [string, number, string][] = [
  ['Robotic arm in an automation cell', 32778341, 'Youn Seung Jin'],
  ['Factory walkway with conveyors', 34718930, 'yetkin-agac'],
  ['Pharmaceutical ampoule filling line', 37650270, 'elementsinteractive'],
  ['Aerial view of a water treatment tank', 24802113, 'alshreef'],
  ['Engineer soldering a circuit board', 3912983, 'thisisengineering'],
  ['Soldering iron on a circuit board (cropped)', 37426135, 'Maiksax'],
  ['Source code on a monitor', 6424584, 'Nemuel Sereti'],
  ['Abstract network of connected points', 8386437, 'Tara Winstead'],
  ['Data-centre server aisle', 4508751, 'brett-sayles'],
  ['Fibre-optic patch cables', 4373998, 'brett-sayles'],
  ['Electrical substation', 25537595, 'Kris Møklebust'],
  ['Aerial view of a solar farm', 35105444, 'Quang Nguyen Vinh'],
  ['Patient vitals monitor', 28782186, 'Pexels contributor'],
  ['Laboratory through a porthole window', 37839843, 'Lefteris Betsis'],
];

export default function ImageCredits() {
  return (
    <div className="page-head grid-bg" style={{ borderBottom: 0 }}>
      <div className="wrap">
        <Crumbs items={[{ href: '/', label: 'Home' }, { label: 'Image credits' }]} />
        <h1 style={{ fontSize: 'clamp(34px,4.6vw,60px)', marginBottom: 20 }}>Image credits</h1>
        <p className="lede" style={{ marginBottom: 28 }}>Photographs on this website are stock images from <a href="https://www.pexels.com/license/">Pexels</a>, used under the Pexels licence. They illustrate engineering themes and are <b>not Siddhrans project photographs</b>. Line drawings and diagrams are original illustrations.</p>
        <div className="table-wrap">
          <table className="credits-t">
            <caption className="mono" style={{ textAlign: 'left', padding: '0 0 10px', color: 'var(--mute)' }}>Photographs and sources</caption>
            <thead><tr><th scope="col">Image</th><th scope="col">Pexels photo</th><th scope="col">Photographer</th></tr></thead>
            <tbody>{CREDITS.map(([t, id, p]) => (
              <tr key={id}><th scope="row" style={{ font: 'inherit', textTransform: 'none', letterSpacing: 0, color: 'inherit' }}>{t}</th><td><a href={`https://www.pexels.com/photo/${id}/`}>#{id}</a></td><td>{p}</td></tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
