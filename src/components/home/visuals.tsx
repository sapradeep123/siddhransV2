import type { ReactNode } from 'react';
import { Photo } from '@/components/ui';
import { OpsDashboard } from './showcases';

/** Label for every original concept interface on the home page. */
export const ConceptLabel = ({ children }: { children?: ReactNode }) => (
  <p className="v4-cl"><b>Concept UI</b> · illustrative data{children ? <> · {children}</> : null}</p>
);

/** Hero composite: an enterprise application with an AI assistant, a real pump with an anomaly flag, the sensing board and a vision output. */
export function HeroVisual() {
  return (
    <div className="v4-hv">
      <p className="v4-hv__lt" aria-hidden="true">Enterprise application + AI assistant · concept</p>
      <div className="v4-app" role="img" aria-label="Concept interface: a plant operations dashboard with a vibration trend for pump P-204 and an assistant explaining why it is flagged. Sample data.">
        <OpsDashboard />
        <div className="v4-app__ai" aria-hidden="true"><b>ASSISTANT</b><span className="u">Why is P-204 flagged?</span><span>Vibration is 48% above its baseline while motor current is steady. Inspect the bearing within 5 days.</span></div>
      </div>
      <div className="v4-hv__pump">
        <Photo name="ref-pump-installation" priority sizes="(min-width:1180px) 22vw, 50vw" alt="Industrial pump and motor sets on a plant floor" />
        <div className="v4-al">P-204 · vibration above baseline<small>Illustrative data</small></div>
        <span className="photo__cap v4-hv__cap"><b>Representative illustration</b> · Pump installation</span>
      </div>
      <div className="v4-hv__esp"><Photo name="ref-esp32-breadboard" sizes="(min-width:1180px) 20vw, 40vw" alt="" /></div>
      <ul className="v4-layers" aria-label="Application, intelligence and machines"><li><b>Applications</b>Enterprise software</li><li><b>Intelligence</b>AI &amp; ML</li><li><b>Machines</b>Sensors &amp; firmware</li></ul>
    </div>
  );
}
