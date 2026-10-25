import type { ReactNode } from 'react';
import { Win } from './showcases';

/* ---------------------------------------------------------------------------------------------
   Concept UI compositions for Siddhrans software, AI and automation platforms.
   Everything is illustrative: invented names, numbers and records, with consistent arithmetic.
   No real screenshots, customer data or measured results. Each is shown with
   "Concept UI · illustrative data" by the page that renders it.
   --------------------------------------------------------------------------------------------- */

const K = ({ l, v, s, t }: { l: string; v: string; s?: string; t?: 'g' | 'y' }) => (
  <div className={`pf-k${t ? ` ${t}` : ''}`}><span>{l}</span><b>{v}</b>{s && <small>{s}</small>}</div>
);
const Tag = ({ c = 'g', children }: { c?: 'g' | 'y' | 'r' | 'b'; children: ReactNode }) => <span className={`pf-t ${c}`}>{children}</span>;

/* ---------- projected vs actual (shared by Inventre and the data page) ---------- */
const PROJ = [60, 64, 68, 72, 76, 80];
const ACT = [58, 66, 65, 74, 71];
const MON = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
export function ProjActual({ title = 'Projection vs actuals', unit = 'Units issued (hundreds)' }: { title?: string; unit?: string }) {
  const x = (i: number) => 34 + i * 58, y = (v: number) => 120 - (v - 40) * 2.1;
  return (
    <Win title={title} status="Mar to date" tone="green" label={`Concept UI with illustrative data: a chart comparing projected and actual monthly units issued over six months, with the latest month still in progress. ${unit}.`}>
      <div className="pf-body">
        <svg viewBox="0 0 340 150" className="pf-chart" aria-hidden="true">
          {[40, 55, 70, 85].map((g) => <g key={g}><line x1="30" x2="330" y1={y(g)} y2={y(g)} className="gr" /><text x="2" y={y(g) + 3} className="ax">{g}</text></g>)}
          {ACT.map((v, i) => <rect key={i} x={x(i) - 14} y={y(v)} width="28" height={120 - y(v)} rx="3" className={i === 4 ? 'ba cur' : 'ba'} />)}
          <polyline className="pl" points={PROJ.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
          {PROJ.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3" className="pd" />)}
          {MON.map((m, i) => <text key={m} x={x(i)} y="138" textAnchor="middle" className="ax">{m}</text>)}
        </svg>
        <div className="pf-leg"><span><i className="a" />Actual</span><span><i className="p" />Projected</span><span className="u">{unit}</span></div>
        <table><thead><tr><th>Month</th><th>Projected</th><th>Actual</th><th>Variance</th></tr></thead><tbody>
          {[3, 4].map((i) => <tr key={i}><td>{MON[i]}</td><td>{PROJ[i]}</td><td>{ACT[i]}</td><td className={ACT[i] >= PROJ[i] ? 'ok' : 'rv'}>{ACT[i] - PROJ[i] > 0 ? '+' : ''}{ACT[i] - PROJ[i]}</td></tr>)}
        </tbody></table>
      </div>
    </Win>
  );
}

/* ---------- Inventre ---------- */
export function InventreDash() {
  const rows: [string, string, string, string, string][] = [
    ['09:12', 'M8 hex bolts, zinc', 'GRN', '+468', 'A-03-2'], ['10:40', 'Carton 5-ply, 450 mm', 'Issue', '−120', 'B-11-1'],
    ['11:05', 'Pallet wrap, 500 mm', 'Return', '+6', 'B-02-4'], ['13:30', 'Bearing 6204', 'Damage', '−3', 'Q-01'], ['15:48', 'M8 hex bolts, zinc', 'Issue', '−200', 'A-03-2'],
  ];
  return (
    <Win title="Inventre · Warehouse overview" status="Main warehouse" tone="green" label="Concept UI with illustrative data: an inventory dashboard with stock KPIs and a log of stock movements such as goods received, issues, returns and damages.">
      <div className="pf-body">
        <div className="pf-kpis"><K l="Items in stock" v="1,248" s="across 6 zones" /><K l="Open POs" v="14" s="3 due this week" /><K l="GRNs today" v="6" /><K l="Below reorder" v="9" t="y" s="needs a PO" /></div>
        <h5>Stock movement · today</h5>
        <table className="pf-tb"><thead><tr><th>Time</th><th>Item</th><th>Type</th><th>Qty</th><th>Bin</th></tr></thead><tbody>
          {rows.map((r) => <tr key={r.join()}><td>{r[0]}</td><td>{r[1]}</td><td><Tag c={r[2] === 'Damage' ? 'r' : r[2] === 'Return' ? 'y' : r[2] === 'GRN' ? 'g' : 'b'}>{r[2]}</Tag></td><td className={r[3].startsWith('+') ? 'ok' : ''}>{r[3]}</td><td>{r[4]}</td></tr>)}
        </tbody></table>
      </div>
    </Win>
  );
}

export function InventreFlow() {
  const st: [string, 'd' | 'on' | ''][] = [['RFQ', 'd'], ['Quotes', 'd'], ['PO', 'd'], ['Delivery', 'd'], ['GRN', 'on'], ['Bill', '']];
  return (
    <Win title="PO-0412 · Procure to stock" status="GRN in progress" label="Concept UI with illustrative data: a purchase order moving through request for quotation, vendor quotes, purchase order, delivery tracking and goods received note, with received, damaged and accepted quantities and a client order allocation.">
      <div className="pf-body">
        <ol className="pf-steps">{st.map(([n, c], i) => <li key={n} className={c}><i>{c === 'd' ? '✓' : i + 1}</i>{n}</li>)}</ol>
        <div className="pf-two">
          <div className="pf-card"><h5>Vendor · Kestrel Fasteners</h5>
            <table><tbody><tr><td>Ordered</td><td>500</td></tr><tr><td>Received</td><td>480</td></tr><tr><td>Damaged</td><td className="rv">12</td></tr><tr className="tot"><td>Accepted to stock</td><td>468</td></tr><tr><td>Short delivery</td><td className="rv">20</td></tr></tbody></table>
          </div>
          <div className="pf-card"><h5>Allocation to client orders</h5>
            <ul className="pf-list"><li><b>CO-2207</b><span>300 reserved</span><Tag>Ready</Tag></li><li><b>CO-2211</b><span>168 reserved</span><Tag c="y">Partial</Tag></li></ul>
            <p className="pf-m">Damage and short delivery are recorded against the vendor for a credit note or return.</p>
          </div>
        </div>
      </div>
    </Win>
  );
}

/* ---------- ERPNext and the communication layer ---------- */
export function ErpSync({ title = 'ERPNext · Integration monitor' }: { title?: string }) {
  const docs: [string, string, string, 'g' | 'y' | 'r'][] = [['Sales Order', 'SO-00418', 'Synced', 'g'], ['Delivery Note', 'DN-00377', 'Synced', 'g'], ['Purchase Receipt', 'PR-00291', 'Queued', 'y'], ['Sales Invoice', 'SI-00402', 'Retrying', 'r']];
  return (
    <Win title={title} status="1 retrying" label="Concept UI with illustrative data: an integration monitor showing ERPNext documents synchronising through a communication layer to warehouse, billing and reporting systems, with synced, queued and retrying states.">
      <div className="pf-body">
        <svg viewBox="0 0 340 74" className="pf-flow" aria-hidden="true">
          {[['ERPNext', 8], ['Comms layer', 124], ['Billing · BI', 236]].map(([n, xx], i) => <g key={n as string}><rect x={xx as number} y="14" width={i === 2 ? 98 : 92} height="40" rx="9" className={i === 1 ? 'nd hl' : 'nd'} /><text x={(xx as number) + (i === 2 ? 49 : 46)} y="38" textAnchor="middle">{n as string}</text></g>)}
          <path d="M100 34h22M216 34h18" className="ar" /><path d="M118 30l5 4-5 4M230 30l5 4-5 4" className="ar" />
        </svg>
        <table className="pf-tb"><thead><tr><th>Document</th><th>Ref</th><th>Status</th></tr></thead><tbody>{docs.map((d) => <tr key={d[1]}><td>{d[0]}</td><td className="mo">{d[1]}</td><td><Tag c={d[3]}>{d[2]}</Tag></td></tr>)}</tbody></table>
        <p className="pf-m">Failed transfers are retried and logged for review; nothing is dropped silently.</p>
      </div>
    </Win>
  );
}

export function ErpOps() {
  return (
    <Win title="ERPNext · Operations" status="Order to cash" label="Concept UI with illustrative data: an ERP operations screen listing open orders with their stage from order to delivery to invoice, and a summary of reports.">
      <div className="pf-body">
        <div className="pf-kpis"><K l="Open orders" v="23" /><K l="To deliver" v="8" /><K l="To invoice" v="5" t="y" /><K l="Paid this month" v="31" /></div>
        <table className="pf-tb"><thead><tr><th>Order</th><th>Customer</th><th>Stage</th><th>Amount</th></tr></thead><tbody>
          {[['SO-00418', 'Customer A', 'Delivered', '48,200'], ['SO-00419', 'Customer B', 'Picking', '12,750'], ['SO-00420', 'Customer C', 'Invoiced', '30,000'], ['SO-00421', 'Customer D', 'Draft', '9,400']].map((r) => (
            <tr key={r[0]}><td className="mo">{r[0]}</td><td>{r[1]}</td><td><Tag c={r[2] === 'Draft' ? 'y' : r[2] === 'Invoiced' ? 'b' : 'g'}>{r[2]}</Tag></td><td>{r[3]}</td></tr>))}
        </tbody></table>
      </div>
    </Win>
  );
}

/* ---------- Cyberlabs ---------- */
export function CyberRange() {
  const n: [string, number, number, string][] = [['Attacker', 20, 22, 'red'], ['Firewall', 100, 22, ''], ['Web server', 180, 22, ''], ['Database', 260, 22, ''], ['Domain ctrl', 180, 82, '']];
  return (
    <Win title="Cyberlabs · Range" status="Drill running" tone="amber" label="Concept UI with illustrative data: a cyber range network with attacker, firewall, web server, database and domain controller, alongside a drill task list and course progress.">
      <div className="pf-body">
        <svg viewBox="0 0 340 120" className="pf-topo" aria-hidden="true">
          <path d="M72 34h28M152 34h28M232 34h28M206 46v36" className="ar" />
          {n.map(([l, xx, yy, c]) => <g key={l}><rect x={xx} y={yy} width="72" height="30" rx="7" className={`nd ${c}`} /><text x={xx + 36} y={yy + 19} textAnchor="middle">{l}</text></g>)}
        </svg>
        <div className="pf-two">
          <div className="pf-card"><h5>Drill · Web application compromise</h5>
            <ul className="pf-check"><li className="d">Scope the target</li><li className="d">Identify the vulnerable endpoint</li><li className="on">Contain and patch</li><li>Write the incident report</li></ul></div>
          <div className="pf-card"><h5>Course · Network defence</h5><div className="pf-bar"><i style={{ width: '60%' }} /></div><p className="pf-m">Lab 6 of 10 · next: log analysis</p><Tag c="b">Instructor reviewing</Tag></div>
        </div>
      </div>
    </Win>
  );
}

/* ---------- GCSE Path ---------- */
export function GcseLms() {
  return (
    <Win title="GCSE Path · Student" status="Maths · Year 10" tone="green" label="Concept UI with illustrative data: a learning management screen for a GCSE student with subjects, a lesson list with progress, a next lesson card and homework due.">
      <div className="pf-lms">
        <nav className="pf-side" aria-hidden="true"><h5>Subjects</h5><b className="on">Mathematics</b><b>English Language</b><b>Combined Science</b><b>History</b></nav>
        <div className="pf-body">
          <h4>Algebra · Unit 3</h4>
          <div className="pf-bar"><i style={{ width: '44%' }} /></div><p className="pf-m">4 of 9 lessons complete</p>
          <ul className="pf-check"><li className="d">Expanding brackets</li><li className="d">Factorising</li><li className="d">Solving linear equations</li><li className="d">Simultaneous equations</li><li className="on">Quadratic equations</li></ul>
          <div className="pf-two"><div className="pf-card"><h5>Next lesson</h5><p><b>Quadratic equations</b><br />Video, worked examples, 8-question quiz</p></div><div className="pf-card"><h5>Homework</h5><p><b>Unit 3 practice set</b><br />Due Friday · tutor feedback after submission</p></div></div>
        </div>
      </div>
    </Win>
  );
}

/* ---------- Data page ---------- */
export function KpiBoard() {
  const bars = (a: number[]) => <svg viewBox="0 0 60 22" aria-hidden="true">{a.map((v, i) => <rect key={i} x={i * 10 + 1} y={22 - v} width="7" height={v} rx="1.5" />)}</svg>;
  return (
    <Win title="Operations dashboard" status="This month" tone="green" label="Concept UI with illustrative data: a KPI dashboard with inventory, warehouse, vendor and order analytics tiles and small trend bars.">
      <div className="pf-body">
        <div className="pf-tiles">
          {[['Stock turnover', '4.2×', [8, 11, 10, 14, 13, 16]], ['Order fill rate', '96%', [14, 15, 13, 16, 17, 17]], ['On-time vendor delivery', '88%', [12, 10, 13, 12, 14, 15]], ['Returns and damages', '2.1%', [6, 9, 7, 5, 6, 4]]].map(([l, v, a]) => (
            <div className="pf-tile" key={l as string}><span>{l as string}</span><b>{v as string}</b>{bars(a as number[])}</div>))}
        </div>
        <h5>Vendor performance · this month</h5>
        <table className="pf-tb"><thead><tr><th>Vendor</th><th>Orders</th><th>On time</th><th>Damaged</th></tr></thead><tbody>
          <tr><td>Kestrel Fasteners</td><td>12</td><td className="ok">11</td><td>1</td></tr><tr><td>Alder Packaging</td><td>9</td><td className="rv">7</td><td>0</td></tr><tr><td>Meridian Logistics</td><td>7</td><td className="ok">7</td><td>0</td></tr>
        </tbody></table>
      </div>
    </Win>
  );
}

export function DataFlow() {
  const st = ['Procurement', 'Warehouse', 'Delivery', 'Finance'];
  return (
    <Win title="Data flow · Procure to pay" status="Live" tone="green" label="Concept UI with illustrative data: a data flow from procurement through warehouse and delivery to finance, with the records passed at each hand-off and a reporting store fed by all stages.">
      <div className="pf-body">
        <svg viewBox="0 0 340 128" className="pf-flow" aria-hidden="true">
          {st.map((s, i) => <g key={s}><rect x={4 + i * 84} y="8" width="76" height="34" rx="8" className="nd" /><text x={42 + i * 84} y="29" textAnchor="middle">{s}</text>{i < 3 && <path d={`M${80 + i * 84} 25h8`} className="ar" />}</g>)}
          {st.map((s, i) => <path key={s} d={`M${42 + i * 84} 42v28`} className="ar d" />)}
          <rect x="4" y="72" width="328" height="34" rx="8" className="nd hl" /><text x="168" y="93" textAnchor="middle">Reporting store · one version of the numbers</text>
          <text x="4" y="124" className="sm">PO, quote · GRN, stock · dispatch, POD · bill, payment</text>
        </svg>
      </div>
    </Win>
  );
}

/* ---------- Khubera ---------- */
export function KhuberaBoard() {
  return (
    <Win title="Khubera · Decision workspace" status="Awaiting approval" tone="amber" label="Concept UI with illustrative data: a shareholder decision workflow where a rules agent, an analysis agent and a risk agent each give an opinion, a recommendation is formed, and approval passes through named roles with an audit trail.">
      <div className="pf-body">
        <p className="pf-h"><b>Proposal P-07</b> · Share-buyback authorisation <Tag c="y">In review</Tag></p>
        <div className="pf-agents">
          <div><h5>Rules agent</h5><ul className="pf-check"><li className="d">Quorum rule</li><li className="d">Disclosure window</li><li className="d">Authorised limit</li><li className="w">Lock-in period: check</li></ul></div>
          <div><h5>Analysis agent</h5><p>Summarises the filing and board papers, citing page and clause for each point.</p><em>3 sources</em></div>
          <div><h5>Risk agent</h5><p>Flags dependency on the lock-in rule and one open query from the audit committee.</p><em>2 flags</em></div>
        </div>
        <div className="pf-rec"><b>Recommendation</b><span>Proceed after the lock-in check is cleared. Reasoning and sources are attached.</span></div>
        <ol className="pf-steps s2"><li className="d"><i>✓</i>Analyst</li><li className="on"><i>2</i>Committee</li><li><i>3</i>Board secretary</li><li><i>4</i>Recorded</li></ol>
      </div>
    </Win>
  );
}

/* ---------- Vackya ---------- */
export function VackyaVoice() {
  return (
    <Win title="Vackya · Voice assistant" status="Call in progress" tone="green" label="Concept UI with illustrative data: a voice bot call with a live transcript, the detected intent and captured lead details, beside a lead list with follow-up status.">
      <div className="pf-vox">
        <div className="pf-body">
          <h5>Live transcript</h5>
          <p className="pf-bub bot"><b>Assistant</b> Thanks for calling. Are you looking at a new system or support for an existing one?</p>
          <p className="pf-bub"><b>Caller</b> New. We need something to track field visits.</p>
          <p className="pf-bub bot"><b>Assistant</b> I can book a call with the team. Is tomorrow at 11 suitable?</p>
          <div className="pf-cap"><Tag c="b">Intent · new enquiry</Tag><Tag>Callback booked · Tue 11:00</Tag></div>
        </div>
        <div className="pf-body pf-aside">
          <h5>Leads</h5>
          <ul className="pf-list"><li><b>Field-visit tracking</b><span>Today</span><Tag c="g">Booked</Tag></li><li><b>Support request</b><span>Today</span><Tag c="y">Handover</Tag></li><li><b>Pricing question</b><span>Yesterday</span><Tag c="b">Follow-up</Tag></li></ul>
          <p className="pf-m">Hand-off to a person when the caller asks or the assistant is unsure.</p>
        </div>
      </div>
    </Win>
  );
}

/* ---------- Recruiti 360 ---------- */
export function RecruitiBoard() {
  const col: [string, string[]][] = [['Sourcing', ['Cand. 1', 'Cand. 2', 'Cand. 3']], ['Screening', ['Cand. 4', 'Cand. 5']], ['Interview', ['Cand. 6']], ['Offer', ['Cand. 7']], ['Placed', ['Cand. 8']]];
  return (
    <Win title="Recruiti 360 · Requisition RQ-118" status="Senior developer" tone="green" label="Concept UI with illustrative data: a recruitment pipeline for one requirement with candidates in sourcing, screening, interview, offer and placed stages, and a panel showing sub-vendor submissions.">
      <div className="pf-body">
        <div className="pf-pipe">{col.map(([n, cs]) => <div key={n}><h5>{n} <em>{cs.length}</em></h5>{cs.map((c) => <span key={c} className="pf-cd">{c}</span>)}</div>)}</div>
        <div className="pf-two">
          <div className="pf-card"><h5>Requirement intake</h5><ul className="pf-list"><li><b>Skills</b><span>React, Node, SQL</span></li><li><b>Experience</b><span>5+ years</span></li><li><b>Positions</b><span>2</span></li></ul></div>
          <div className="pf-card"><h5>Sub-vendors</h5><ul className="pf-list"><li><b>Vendor 1</b><span>4 profiles</span><Tag>Active</Tag></li><li><b>Vendor 2</b><span>2 profiles</span><Tag c="y">Chase</Tag></li><li><b>Vendor 3</b><span>3 profiles</span><Tag>Active</Tag></li></ul></div>
        </div>
      </div>
    </Win>
  );
}

/* ---------- RPA ---------- */
export function VendorBilling() {
  return (
    <Win title="Vendor billing automation" status="2 need review" tone="amber" label="Concept UI with illustrative data: an invoice read by OCR with extracted fields, matched line by line to the client purchase order, with one price mismatch routed to a review queue.">
      <div className="pf-body">
        <div className="pf-two">
          <div className="pf-inv"><b>INVOICE INV-7731</b><span>Kestrel Fasteners · 12 Mar</span><span className="f">PO ref PO-2041</span><span className="f">M8 hex bolt × 500 @ 108.00</span><span className="f w">Carton 5-ply × 100 @ 138.00</span><em>Fields read by OCR</em></div>
          <div className="pf-card"><h5>Match to client PO-2041</h5>
            <table><tbody><tr><td>M8 hex bolt</td><td>500</td><td className="ok">Match</td></tr><tr><td>Carton 5-ply</td><td>100</td><td className="rv">Price differs</td></tr></tbody></table>
            <p className="pf-m">PO price 132.00; invoice 138.00. Sent to review, not auto-placed.</p></div>
        </div>
        <h5>Automation queue</h5>
        <table className="pf-tb"><thead><tr><th>Bill</th><th>State</th><th>Next</th></tr></thead><tbody>
          <tr><td className="mo">INV-7731</td><td><Tag c="y">Exception</Tag></td><td>Buyer review</td></tr><tr><td className="mo">INV-7732</td><td><Tag>Matched</Tag></td><td>Order prepared</td></tr><tr><td className="mo">INV-7733</td><td><Tag c="y">Unreadable</Tag></td><td>Manual entry</td></tr>
        </tbody></table>
      </div>
    </Win>
  );
}

export function NoticeSplit() {
  const pg = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const grp = (p: number) => (p <= 3 ? 0 : p <= 6 ? 1 : p <= 8 ? 2 : p <= 10 ? 3 : 4);
  return (
    <Win title="Notice split and dispatch" status="2 held for review" tone="amber" label="Concept UI with illustrative data: one combined file of twelve pages split into individual notices per department, with a confidence score for each, low-confidence and missing items held for human review, and the rest released for dispatch.">
      <div className="pf-body">
        <h5>Combined file · 12 pages</h5>
        <div className="pf-pages" aria-hidden="true">{pg.map((p) => <i key={p} className={`g${grp(p)}`}>{p}</i>)}</div>
        <table className="pf-tb"><thead><tr><th>Notice</th><th>Pages</th><th>Confidence</th><th>Action</th></tr></thead><tbody>
          <tr><td>Finance</td><td>1 to 3</td><td className="ok">High</td><td><Tag>Release</Tag></td></tr>
          <tr><td>HR</td><td>4 to 6</td><td className="ok">High</td><td><Tag>Release</Tag></td></tr>
          <tr><td>Operations</td><td>7 to 8</td><td className="ok">High</td><td><Tag>Release</Tag></td></tr>
          <tr className="w"><td>Legal</td><td>9 to 10</td><td className="rv">Low</td><td><Tag c="y">Review</Tag></td></tr>
          <tr className="w"><td>Stores</td><td>11 to 12</td><td className="rv">Low</td><td><Tag c="y">Review</Tag></td></tr>
        </tbody></table>
        <div className="pf-rec"><b>Missing</b><span>No notice found for Purchase. Held for the coordinator to request.</span></div>
      </div>
    </Win>
  );
}
