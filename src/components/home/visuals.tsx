import type { ReactNode } from 'react';
import { Photo } from '@/components/ui';

/** Label for every original concept interface on the home page. */
export const ConceptLabel = ({ children }: { children?: ReactNode }) => (
  <p className="v4-cl"><b>Concept UI</b> · illustrative data{children ? <> · {children}</> : null}</p>
);

const Spark = () => (
  <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><polyline fill="none" stroke="#00743A" strokeWidth="2" points="0,30 12,26 24,28 36,18 48,22 60,12 72,16 84,8 100,10" /><circle cx="84" cy="8" r="3" fill="#F8E000" stroke="#0A1326" /></svg>
);

/** Hero composite: an enterprise application with an AI assistant, a real pump with an anomaly flag, the sensing board and a vision output. */
export function HeroVisual() {
  return (
    <div className="v4-hv">
      <p className="v4-hv__lt" aria-hidden="true">Enterprise application + AI assistant · concept</p>
      <div className="v4-app" aria-hidden="true">
        <div className="v4-app__sb"><i /><i /><i /><i /><i /></div>
        <div className="v4-app__bd">
          <div className="v4-app__kp"><i /><i /><i /></div>
          <div className="v4-app__ch"><Spark /></div>
          <div className="v4-app__rw" /><div className="v4-app__rw" style={{ width: '70%' }} /><div className="v4-app__rw" style={{ width: '85%' }} />
        </div>
        <div className="v4-app__ai"><b>ASSISTANT</b><span className="u">Why is Pump 2 flagged?</span><span>Vibration has trended up for six days. An inspection is suggested.</span></div>
      </div>
      <div className="v4-hv__pump">
        <Photo name="ref-pump-installation" priority sizes="(min-width:1180px) 22vw, 50vw" alt="Industrial pump and motor sets on a plant floor" />
        <div className="v4-al">Pump 2 · vibration anomaly<small>Illustrative data</small></div>
        <span className="photo__cap v4-hv__cap"><b>Illustrative image</b> · Pump installation</span>
      </div>
      <div className="v4-hv__esp"><Photo name="ref-esp32-breadboard" sizes="(min-width:1180px) 20vw, 40vw" alt="" /></div>
      <div className="v4-hv__vis"><Photo name="ref-label-mismatch" eager sizes="(min-width:1180px) 24vw, 46vw" alt="" /></div>
      <ul className="v4-layers" aria-label="Application, intelligence and machines"><li><b>Applications</b>Enterprise software</li><li><b>Intelligence</b>AI &amp; ML</li><li><b>Machines</b>Sensors &amp; firmware</li></ul>
    </div>
  );
}

/** AI family 1: copilot answer with sources and agent steps. */
export const ChatVisual = () => (
  <div className="v4-fv" aria-hidden="true">
    <div className="v4-chat">
      <span className="v4-lbl">Ask your documents</span>
      <div className="v4-bub u">Summarise open supplier risks.</div>
      <div className="v4-bub">Three suppliers have contracts expiring this quarter.<span className="v4-src"><i>Contract_v3 · p.4</i><i>Risk register</i></span></div>
    </div>
    <div className="v4-agent"><div>Plan <span>✓</span></div><div>Retrieve <span>✓</span></div><div className="on">Draft <span>●</span></div><div>Approve <span>○</span></div></div>
  </div>
);

/** AI family 2: document with highlighted fields and the extracted values. */
export const DocVisual = () => (
  <div className="v4-fv" aria-hidden="true">
    <div className="v4-docv"><i className="h" /><i style={{ width: '80%' }} /><i /><i className="h" style={{ width: '60%' }} /><i style={{ width: '90%' }} /><i /><i className="h" style={{ width: '50%' }} /></div>
    <div className="v4-ext"><div>Supplier <b>Acme Ltd</b></div><div>Term <b>24 months</b></div><div>Payment <b>30 days</b></div><div>Penalty <b>§7.2</b></div></div>
  </div>
);

/** AI family 4: trend with an anomaly marker beside the sensing board. */
export const PredVisual = () => (
  <div className="v4-fv" aria-hidden="true">
    <div className="v4-pred">
      <svg viewBox="0 0 200 100" preserveAspectRatio="none"><polyline fill="none" stroke="#19C46E" strokeWidth="2" points="0,70 20,66 40,68 60,60 80,62 100,50 120,52 140,36 160,30 180,18 200,12" /><line x1="0" y1="55" x2="200" y2="55" stroke="#F8E000" strokeDasharray="4 4" strokeWidth="1" /><circle cx="160" cy="30" r="4" fill="#F8E000" /></svg>
      <span className="v4-lbl">Vibration trend · anomaly flagged</span>
    </div>
    <div className="v4-espv"><Photo name="ref-esp32-breadboard" sizes="(min-width:1180px) 16vw, 40vw" alt="" /></div>
  </div>
);

/** Small concept visuals for the "More AI capabilities" explorer. */
export const MiniApps = () => (
  <div className="v4-mini" aria-hidden="true"><div className="v4-mini__ui"><i /><i /><i style={{ width: '60%' }} /><i /></div><div className="v4-mini__chat"><span className="u">Draft the renewal note</span><span>Draft ready for review.</span></div></div>
);
export const MiniNli = () => (
  <div className="v4-mini v4-mini--col" aria-hidden="true"><div className="v4-q">Show overdue invoices for March</div><div className="v4-tbl"><i /><i /><i /><i /></div></div>
);
export const MiniWorkflow = () => (
  <div className="v4-mini v4-mini--flow" aria-hidden="true"><span>Request</span><em>→</em><span className="ai">AI check</span><em>→</em><span>Approval</span><em>→</em><span>Done</span><div className="v4-exc">Exception → a person decides</div></div>
);
export const MiniDecision = () => (
  <div className="v4-mini" aria-hidden="true"><svg viewBox="0 0 200 80" preserveAspectRatio="none"><path d="M0,60 L50,50 L100,40 L150,28 L200,18 L200,40 L150,48 L100,56 L50,64 L0,66 Z" fill="rgba(25,196,110,.25)" /><polyline fill="none" stroke="#19C46E" strokeWidth="2" points="0,63 50,57 100,48 150,38 200,29" /></svg><span className="v4-lbl" style={{ position: 'absolute', left: 10, top: 8 }}>Forecast with a range</span></div>
);
export const MiniAgents = () => (
  <div className="v4-mini v4-mini--flow" aria-hidden="true"><span>Research agent</span><em>→</em><span>Drafting agent</span><em>→</em><span className="ai">Approval gate</span><em>→</em><span>Action</span></div>
);

/** Flow step visuals for "AI meets the machine". */
export const CurveVisual = () => (
  <div className="v4-fl dk" aria-hidden="true"><svg viewBox="0 0 120 70" preserveAspectRatio="none"><polyline fill="none" stroke="#19C46E" strokeWidth="2" points="0,50 15,48 30,50 45,46 60,44 75,34 90,26 105,16 120,10" /><line x1="0" y1="38" x2="120" y2="38" stroke="#F8E000" strokeDasharray="4 3" /><circle cx="105" cy="16" r="4" fill="#F8E000" /></svg></div>
);
export const DecisionVisual = () => (
  <div className="v4-fl" aria-hidden="true"><div className="v4-dec"><i /><div><s className="g" /><s className="y" /><s /></div><b>WATCH · Pump 2</b></div></div>
);
export const AlertVisual = () => (
  <div className="v4-fl" aria-hidden="true"><div className="v4-alert"><i /><b>Pump 2: inspect bearing within 3 days</b><i className="s" /></div></div>
);
