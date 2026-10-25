import type { ReactNode } from 'react';
import { Photo } from '@/components/ui';

/* ---------------------------------------------------------------------------------------------
   Product-style interface compositions for the AI showcases.
   Everything here is ILLUSTRATIVE: invented suppliers, documents, equipment and readings that are
   internally consistent (checked arithmetic, one reference date: 12 March). None of it is client data
   or a Siddhrans deployment; every showcase carries the "Concept interface" label.
   --------------------------------------------------------------------------------------------- */

export const SampleNote = ({ children = 'Concept interface · invented sample data, not a Siddhrans deployment' }: { children?: ReactNode }) => (
  <p className="sc-note">{children}</p>
);

export const Win = ({ title, status, tone = 'amber', label, children }: { title: string; status: string; tone?: 'amber' | 'green'; label: string; children: ReactNode }) => (
  <div className="sc" role="img" aria-label={label}>
    <div className="sc-win" aria-hidden="true">
      <div className="sc-bar"><i /><i /><i /><b>{title}</b><span className={`sc-st sc-st--${tone}`}>{status}</span></div>
      {children}
    </div>
  </div>
);

/* ---------- A. AI agents and enterprise copilots ---------- */
export function ShowAgents() {
  return (
    <Win title="Contract assistant" status="Draft ready · needs approval" label="Concept interface: an enterprise assistant answers a question about supplier contracts, shows its sources and waits for human approval before sending a renewal request. Sample data.">
      <div className="sc-agent">
        <div className="sc-thread">
          <div className="sc-q"><span className="sc-av">PM</span><p>Which supplier contracts expire before 31 March, and what do they say about renewal?</p></div>
          <ul className="sc-steps"><li className="d">Searched supplier contracts</li><li className="d">Read 3 agreements</li><li className="d">Checked notice dates against 12 Mar</li><li className="on">Drafted summary</li></ul>
          <div className="sc-ans">
            <h4>3 contracts expire before 31 March</h4>
            <table>
              <thead><tr><th>Supplier</th><th>Expires</th><th>Renewal terms</th><th>Source</th></tr></thead>
              <tbody>
                <tr><td>Kestrel Fasteners</td><td>18 Mar</td><td>Auto-renews for 12 months. 60-day notice window has closed.</td><td><em>KF-2023-07 · §9.2 · p.6</em></td></tr>
                <tr className="hi"><td>Alder Packaging</td><td>25 Mar</td><td>No auto-renewal. A written renewal is required.</td><td><em>AP-2022-14 · §11.1 · p.8</em></td></tr>
                <tr><td>Meridian Logistics</td><td>29 Mar</td><td>Auto-renews for 12 months. 30-day notice window has closed.</td><td><em>ML-2024-03 · §7.4 · p.5</em></td></tr>
              </tbody>
            </table>
          </div>
          <div className="sc-next"><p><b>Suggested next step:</b> draft a renewal request to Alder Packaging, the only contract that needs action.</p><div><span className="sc-btn">Review draft</span><span className="sc-btn p">Approve and send to Legal</span></div><small>Nothing is sent without approval.</small></div>
        </div>
        <aside className="sc-src"><h5>Sources used</h5>
          <ul><li><b>KF-2023-07</b><span>Supply agreement · p.6</span></li><li><b>AP-2022-14</b><span>Framework agreement · p.8</span></li><li><b>ML-2024-03</b><span>Services contract · p.5</span></li></ul>
          <p>Only documents this user may open were searched.</p>
        </aside>
      </div>
    </Win>
  );
}

/* ---------- B. Document intelligence ---------- */
export function ShowDocs() {
  return (
    <Win title="Document review" status="1 field needs review" label="Concept interface: a purchase order with highlighted fields beside the extracted data, page references and a review flag because the printed total does not match the line items. Sample data.">
      <div className="sc-docs">
        <div className="sc-paper">
          <div className="sc-ph"><b>PURCHASE ORDER</b><span className="f" data-n="1">PO-2041-0317</span></div>
          <div className="sc-pm"><span>Supplier: <u className="f" data-n="2">Kestrel Fasteners Pvt Ltd</u></span><span>Date: <u className="f" data-n="3">04 Mar 2026</u></span></div>
          <table className="sc-lines">
            <thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
            <tbody>
              <tr><td>Hex bolt M8×40</td><td>1,200</td><td>42.00</td><td>50,400.00</td></tr>
              <tr><td>Hex nut M8</td><td>1,200</td><td>11.50</td><td>13,800.00</td></tr>
              <tr><td>Flat washer M8</td><td>2,400</td><td>3.25</td><td>7,800.00</td></tr>
            </tbody>
            <tfoot>
              <tr><td colSpan={3}>Subtotal</td><td>72,000.00</td></tr>
              <tr><td colSpan={3}>GST 18%</td><td>12,960.00</td></tr>
              <tr><td colSpan={3}><b>Total</b></td><td><u className="f w" data-n="5"><b>84,690.00</b></u></td></tr>
            </tfoot>
          </table>
          <p className="sc-pt">Payment terms: <u className="f" data-n="4">Net 30</u></p>
          <span className="sc-pg">Page 1 of 1</span>
        </div>
        <div className="sc-out">
          <h5>Extracted fields</h5>
          <table>
            <thead><tr><th>#</th><th>Field</th><th>Value</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>PO number<small>page 1</small></td><td>PO-2041-0317</td><td className="ok">Verified</td></tr>
              <tr><td>2</td><td>Supplier<small>page 1</small></td><td>Kestrel Fasteners Pvt Ltd</td><td className="ok">Verified</td></tr>
              <tr><td>3</td><td>PO date<small>page 1</small></td><td>04 Mar 2026</td><td className="ok">Verified</td></tr>
              <tr><td>4</td><td>Payment terms<small>page 1</small></td><td>Net 30</td><td className="ok">Verified</td></tr>
              <tr className="w"><td>5</td><td>Total<small>page 1</small></td><td>84,690.00</td><td className="rv">Review</td></tr>
            </tbody>
          </table>
          <div className="sc-flag"><b>Total does not match the line items.</b><p>Printed 84,690.00. Calculated 84,960.00 (72,000.00 + GST 12,960.00). Two digits may be transposed.</p><div><span className="sc-btn p">Correct to 84,960.00</span><span className="sc-btn">Accept as printed</span><span className="sc-btn">Escalate</span></div></div>
          <small>Reviewer decision: pending</small>
        </div>
      </div>
    </Win>
  );
}

/* ---------- C. Computer vision and inspection ---------- */
const BOX: [number, number, boolean][] = [[0.491, 0.234, false], [0.262, 0.367, false], [0.356, 0.476, false], [0.46, 0.512, false], [0.658, 0.609, false], [0.267, 0.597, false], [0.559, 0.79, true]];
export function ShowVision() {
  return (
    <Win title="Solder-joint inspection" status="1 area for review" label="Concept interface: a close-up photograph of a circuit board with seven inspection areas outlined; six pass and one, where two joints sit close together, is held for human review. The overlay is illustrative." tone="amber">
      <div className="sc-vis">
        <div className="sc-img">
          <Photo name="hw-pcb-aoi" sizes="(min-width:1180px) 36vw, 100vw" alt="" />
          <svg viewBox="0 0 1152 496" preserveAspectRatio="none">
            {BOX.map(([x, y, rv], i) => (
              <g key={i}><rect x={x * 1152 - 32} y={y * 496 - 32} width="64" height="64" rx="4" className={rv ? 'rv' : 'ok'} /><rect x={x * 1152 - 20} y={y * 496 - 66} width="40" height="32" rx="4" className={rv ? 'tg rv' : 'tg'} /><text x={x * 1152} y={y * 496 - 43} textAnchor="middle">{i + 1}</text></g>
            ))}
          </svg>
        </div>
        <div className="sc-res">
          <div>
            <h5>Inspection result</h5>
            <div className="sc-sum"><span><b>6</b> pass</span><span className="rv"><b>1</b> review</span></div>
            <ul>
              {[1, 2, 3, 4, 5, 6].map((n) => <li key={n}><i className="ok" />Area {n}<em>Pass</em></li>)}
              <li className="rv"><i className="rv" />Area 7<em>Review</em></li>
            </ul>
          </div>
          <div>
            <p><b>Area 7:</b> two adjacent joints sit close together. Check spacing under magnification.</p>
            <div className="sc-out2"><b>Outcome</b><span className="sc-st sc-st--amber">Hold for review</span></div>
            <div><span className="sc-btn p">Send to rework</span><span className="sc-btn">Mark pass</span></div>
          </div>
        </div>
      </div>
    </Win>
  );
}

/* ---------- D. Predictive ML and industrial intelligence ---------- */
const N = 30;
export const VIB: number[] = Array.from({ length: N }, (_, i) => {
  if (i === N - 1) return 3.4;
  const noise = 0.09 * Math.sin(i * 1.7) + 0.06 * Math.sin(i * 0.63 + 1);
  const ramp = i < 21 ? 0 : 1.1 * Math.pow((i - 21) / 8, 1.4);
  return +(2.3 + noise + ramp).toFixed(2);
});
function Chart({ mini = false }: { mini?: boolean }) {
  const W = 400, H = mini ? 120 : 170, L = mini ? 6 : 34, R = W - 8, T = 10, B = mini ? 10 : 30, ymax = 5;
  const X = (i: number) => L + (i / (N - 1)) * (R - L), Y = (v: number) => H - B - (v / ymax) * (H - B - T);
  const pts = VIB.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
  return (
    <svg className="sc-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={mini ? 'none' : 'xMidYMid meet'}>
      <rect x={X(22)} y={T} width={R - X(22)} height={H - B - T} className="an" />
      <rect x={L} y={Y(2.5)} width={R - L} height={Y(2.1) - Y(2.5)} className="bl" />
      {!mini && [0, 1, 2, 3, 4, 5].map((v) => <g key={v}><line x1={L} x2={R} y1={Y(v)} y2={Y(v)} className="gr" /><text x={L - 6} y={Y(v) + 4} textAnchor="end" className="ax">{v}</text></g>)}
      <line x1={L} x2={R} y1={Y(4.5)} y2={Y(4.5)} className="th" />
      {!mini && <text x={L + 4} y={Y(4.5) - 5} className="tl">Alert threshold (sample): 4.5</text>}
      <polyline points={pts} className="ln" />
      <circle cx={X(N - 1)} cy={Y(3.4)} r="5" className="pt" />
      {!mini && <><text x={L + 4} y={Y(2.1) + 14} className="tl bt">Baseline range (2.1 to 2.5)</text><text x={X(22) + 5} y={H - B - 6} className="tl at">Above baseline</text>
        {['30 d ago', '20 d', '10 d', 'today'].map((t, k) => <text key={t} x={X([0, 10, 20, 29][k])} y={H - 10} textAnchor={k === 3 ? 'end' : k === 0 ? 'start' : 'middle'} className="ax">{t}</text>)}</>}
    </svg>
  );
}
export const VibrationMini = () => <div className="v4-fl dk" aria-hidden="true"><Chart mini /></div>;

export function ShowPredict() {
  return (
    <Win title="Pump P-204 · condition" status="Watch" label="Concept interface: thirty days of vibration data for a cooling-water pump showing a rising trend above its baseline range, with an explanation and a recommended inspection. Sample data." tone="amber">
      <div className="sc-pred">
        <div className="sc-kpis">
          <div><span>Vibration (RMS)</span><b>3.4 <small>mm/s</small></b><em className="up">up from 2.3 baseline</em></div>
          <div><span>Bearing temperature</span><b>67 <small>°C</small></b><em className="up">up from 61</em></div>
          <div><span>Motor current</span><b>14.2 <small>A</small></b><em>steady, 14.1 to 14.3</em></div>
        </div>
        <div className="sc-ch"><h5>Vibration, last 30 days (mm/s)</h5><Chart /></div>
        <div className="sc-why">
          <div><h5>Why it was flagged</h5><p>Vibration is up 48% on its 30-day baseline while motor current held steady. A rising bearing temperature points to a mechanical cause, not a change in load.</p></div>
          <div className="sc-act"><h5>Recommended action</h5><p>Inspect the bearing and check coupling alignment within 5 days.</p><div><span className="sc-btn p">Create work order</span><span className="sc-btn">Snooze 24 h</span></div></div>
        </div>
      </div>
    </Win>
  );
}

/* ---------- Explorer visuals ---------- */
const Mini = ({ label, children, cls = '' }: { label: string; children: ReactNode; cls?: string }) => (
  <div className={`sc-mini ${cls}`} role="img" aria-label={label}><div aria-hidden="true">{children}</div></div>
);
export const ExpApps = () => (
  <Mini label="Concept interface: an assessments screen where an assistant notices three learners have not started a test that closes on Friday and offers to send a reminder. Sample data.">
    <div className="mx-app"><div className="mx-t"><b>Assessments · Batch A</b><span>Unit test 3 closes Fri</span></div>
      <table><thead><tr><th>Learner</th><th>Unit test 2</th><th>Unit test 3</th></tr></thead><tbody><tr><td>Learner 001</td><td>82%</td><td className="ok">Submitted</td></tr><tr><td>Learner 002</td><td>74%</td><td className="rv">Not started</td></tr><tr><td>Learner 003</td><td>91%</td><td className="ok">Submitted</td></tr><tr><td>Learner 004</td><td>68%</td><td className="rv">Not started</td></tr></tbody></table></div>
    <div className="mx-as"><b>Assistant</b><p>2 of 4 learners have not started Unit test 3. It closes on Friday.</p><div><span className="sc-btn p">Send reminder</span><span className="sc-btn">Edit message</span></div></div>
  </Mini>
);
export const ExpNli = () => (
  <Mini label="Concept interface: a plain-language question about overdue March invoices answered with a table of three customers totalling 3,48,500. Sample data.">
    <div className="mx-q">Show overdue invoices for March, by customer</div>
    <p className="mx-int">Interpreted as: status unpaid · due date in March · as of 12 Mar</p>
    <table><thead><tr><th>Customer</th><th>Invoice</th><th>Due</th><th>Amount</th><th>Overdue</th></tr></thead><tbody><tr><td>Aster Retail</td><td>INV-2031</td><td>05 Mar</td><td>1,24,000</td><td>7 days</td></tr><tr><td>Lumen Foods</td><td>INV-2044</td><td>09 Mar</td><td>86,500</td><td>3 days</td></tr><tr><td>Orchid Clinics</td><td>INV-2019</td><td>02 Mar</td><td>1,38,000</td><td>10 days</td></tr></tbody><tfoot><tr><td colSpan={3}>Total overdue</td><td>3,48,500</td><td /></tr></tfoot></table>
  </Mini>
);
export const ExpWorkflow = () => (
  <Mini label="Concept workflow: an expense claim is checked by AI against policy; claims within policy go to a manager and then to the ERP, others return to the requester with a reason. Sample." cls="wf">
    <svg viewBox="0 0 460 170"><defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#19C46E" /></marker></defs>
      <g className="nd"><rect x="4" y="52" width="86" height="46" rx="8" /><text x="47" y="72" textAnchor="middle">Claim</text><text x="47" y="88" textAnchor="middle">received</text></g>
      <g className="nd ai"><rect x="116" y="52" width="104" height="46" rx="8" /><text x="168" y="72" textAnchor="middle">AI checks receipt</text><text x="168" y="88" textAnchor="middle">and policy</text></g>
      <g className="nd"><rect x="256" y="14" width="96" height="46" rx="8" /><text x="304" y="34" textAnchor="middle">Manager</text><text x="304" y="50" textAnchor="middle">approval</text></g>
      <g className="nd"><rect x="372" y="14" width="84" height="46" rx="8" /><text x="414" y="34" textAnchor="middle">Posted</text><text x="414" y="50" textAnchor="middle">to ERP</text></g>
      <g className="nd ex"><rect x="256" y="112" width="132" height="46" rx="8" /><text x="322" y="132" textAnchor="middle">Returned to requester</text><text x="322" y="148" textAnchor="middle">with the reason</text></g>
      <path d="M90 75 H116 M220 75 H238 V37 H256 M352 37 H372 M220 75 H238 V135 H256" className="ln" markerEnd="url(#ar)" />
      <text x="244" y="30" className="lb">within policy</text><text x="244" y="128" className="lb" textAnchor="end">outside policy</text></svg>
  </Mini>
);
export const ExpForecast = () => (
  <Mini label="Concept chart: an eight-week demand forecast with an uncertainty range and a suggested reorder window in week 3. Sample data." cls="fc">
    <svg viewBox="0 0 460 170" preserveAspectRatio="none">
      <path d="M40,100 L100,92 L160,84 L220,70 L280,64 L340,52 L400,46 L400,92 L340,98 L280,108 L220,114 L160,122 L100,126 L40,128 Z" className="rg" />
      <polyline points="40,114 100,109 160,103 220,92 280,86 340,75 400,69" className="ln" />
      <polyline points="4,120 22,116 40,114" className="hs" />
      <rect x="150" y="14" width="64" height="130" className="rw" /><text x="182" y="28" textAnchor="middle" className="lb">reorder</text>
      {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map((w, i) => <text key={w} x={40 + (i * 360) / 7} y="162" textAnchor="middle" className="ax">{w}</text>)}
    </svg>
    <p className="mx-cap">Demand forecast with a range · suggested reorder window: week 3</p>
  </Mini>
);
export const ExpAgents = () => (
  <Mini label="Concept interface: three agents research, draft and check a filing summary, then stop at an approval gate that waits for a human reviewer. Sample." cls="ag">
    <ul><li><b>Research agent</b><span>Found 4 relevant filings</span><i className="d" /></li><li><b>Drafting agent</b><span>Prepared a one-page summary</span><i className="d" /></li><li><b>Compliance agent</b><span>Flagged 1 clause for a lawyer</span><i className="d" /></li><li className="gate"><b>Approval gate</b><span>Waiting for the reviewer</span><i className="w" /></li></ul>
  </Mini>
);

/* ---------- Hero application and machine-flow visuals (kept consistent with pump P-204) ---------- */
export const OpsDashboard = () => (
  <div className="op" aria-hidden="true">
    <div className="op-h"><b>Plant operations</b><span>Line 2 · 12 Mar</span></div>
    <div className="op-k"><div><span>Pumps online</span><b>11 / 12</b></div><div><span>Open alerts</span><b>1</b></div><div><span>Work orders</span><b>4</b></div></div>
    <div className="op-c"><span>Vibration, P-204</span><Chart mini /></div>
    <ul className="op-l"><li><i className="w" />P-204 vibration above baseline</li><li><i className="g" />P-203 normal</li><li><i className="g" />P-207 normal</li></ul>
  </div>
);
export const StatusBoard = () => (
  <div className="v4-fl" aria-hidden="true"><div className="sb">
    <b>Pump status</b>
    <div><i className="g" /><span>P-203</span><em>Normal</em></div>
    <div className="w"><i className="w" /><span>P-204</span><em>Watch</em></div>
    <div><i className="g" /><span>P-207</span><em>Normal</em></div>
  </div></div>
);
export const PhoneAlert = () => (
  <div className="v4-fl" aria-hidden="true"><div className="pa"><b>P-204 · Watch</b><p>Vibration 3.4 mm/s, 48% above baseline. Inspect bearing within 5 days.</p><span className="sc-btn p">Create work order</span></div></div>
);
