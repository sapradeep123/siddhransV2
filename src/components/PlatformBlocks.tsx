import { Reveal } from '@/components/motion';
import { Pill, SecHead } from '@/components/ui';
import { ErpOps, ErpSync, CyberRange, DataFlow, GcseLms, InventreDash, InventreFlow, KhuberaBoard, KpiBoard, NoticeSplit, ProjActual, RecruitiBoard, VackyaVoice, VendorBilling } from '@/components/home/platforms';
import { SampleNote } from '@/components/home/showcases';
import { platformSections, type VisualKey } from '@/content/platforms';

const V: Record<VisualKey, (p: Record<string, never>) => React.JSX.Element> = {
  inventreDash: InventreDash, inventreFlow: InventreFlow, erpOps: ErpOps, erpSync: ErpSync, cyberRange: CyberRange, gcseLms: GcseLms,
  projActual: ProjActual, kpiBoard: KpiBoard, dataFlow: DataFlow, khubera: KhuberaBoard, vackya: VackyaVoice, recruiti: RecruitiBoard,
  vendorBilling: VendorBilling, noticeSplit: NoticeSplit,
};

export default function PlatformBlocks({ slug }: { slug: string }) {
  const sec = platformSections[slug];
  if (!sec) return null;
  return (
    <section className="v4s v4s--navy on-dark" id="platforms" aria-labelledby="h-plat">
      <div className="container">
        <Reveal><SecHead row eyebrow={sec.eyebrow} title={<span id="h-plat">{sec.title}</span>} lede={sec.lede} /></Reveal>
        {sec.blocks.map((b, i) => (
          <article className={`pfb${i % 2 ? ' pfb--r' : ''}`} key={b.id} id={b.id} aria-labelledby={`h-${b.id}`}>
            <div className="pfb__t">
              <div><Pill kind="eng">{b.tag}</Pill></div>
              <h3 id={`h-${b.id}`}>{b.title}</h3>
              <p>{b.text}</p>
              <ul>{b.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
            <div className="pfb__v pfb__m">
              {b.visuals.map((k) => { const C = V[k]; return <div key={k} className="pfb__v"><C /><SampleNote>Concept UI · illustrative data</SampleNote></div>; })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
