// Concept interfaces: original HTML/CSS designs that illustrate the kind of software Siddhrans builds.
// They are NOT screenshots of delivered products, use placeholder data, and are always badged as concept designs.
import type { ReactNode } from 'react';

export const ConceptBadge = () => <span className="concept-badge"><b>Concept UI</b> · illustrative data</span>;

export const Laptop = ({ children }: { children: ReactNode }) => (
  <div className="laptop">
    <div className="laptop__screen"><div className="laptop__display">{children}<ConceptBadge /></div></div>
    <div className="laptop__base" />
  </div>
);
export const Phone = ({ children }: { children: ReactNode }) => (
  <div className="phone"><div className="phone__display">{children}</div></div>
);
export const Tablet = ({ children }: { children: ReactNode }) => (
  <div className="tablet"><div className="tablet__display">{children}<ConceptBadge /></div></div>
);

const Side = ({ items, on, brand }: { items: string[]; on: number; brand: string }) => (
  <aside className="ui-side" aria-hidden="true">
    <div className="ui-brand"><i />{brand}</div>
    {items.map((t, i) => (<div key={t} className={`ui-nav${i === on ? ' on' : ''}`}><i />{t}</div>))}
  </aside>
);

const Av = ({ t, c = '' }: { t: string; c?: string }) => <span className={`ui-av ${c}`}>{t}</span>;

/** Learning management: programmes, batches, content, assessments, results, reporting (per company profile). */
export const LmsUI = () => (
  <div className="ui" aria-hidden="true">
    <Side brand="Learn" on={3} items={['Programmes', 'Batches', 'Content', 'Assessments', 'Results', 'Reports']} />
    <div className="ui-main">
      <div className="ui-top">
        <div><h4>Assessments</h4><small>Sample programme · Batch A</small></div>
        <div className="ui-search">Search learners or tests</div>
        <span className="ui-btn">+ New assessment</span>
      </div>
      <div className="ui-cards">
        <div className="ui-card"><h5>Scheduled</h5><div className="ui-num">8</div></div>
        <div className="ui-card"><h5>In progress</h5><div className="ui-num">2</div></div>
        <div className="ui-card"><h5>Results published</h5><div className="ui-num">14</div></div>
      </div>
      <div className="ui-row2">
        <div className="ui-card">
          <h5>Latest results</h5>
          <div className="ui-table">
            <div className="ui-tr ui-th"><span>Learner</span><span>Assessment</span><span>Score</span><span>Status</span></div>
            {[['LA', 'Learner 001', 'Unit test 3', '86%', 'Passed', ''], ['LB', 'Learner 002', 'Unit test 3', '74%', 'Passed', 'ui-av--g'], ['LC', 'Learner 003', 'Unit test 3', '58%', 'Review', 'ui-av--c'], ['LD', 'Learner 004', 'Unit test 3', '91%', 'Passed', 'ui-av--y']].map(([a, n, t, s, st, c]) => (
              <div className="ui-tr" key={n}><span><Av t={a} c={c} />{n}</span><span>{t}</span><span>{s}</span><span><span className={`ui-chip${st === 'Review' ? ' ui-chip--y' : ''}`}>{st}</span></span></div>
            ))}
          </div>
        </div>
        <div className="ui-card">
          <h5>Batch completion</h5>
          <div className="ui-ring" style={{ ['--v' as string]: '72%' }}><b>72%</b></div>
          <div className="ui-bars" style={{ height: '8cqw' }}>{[40, 62, 50, 78, 66].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
        </div>
      </div>
    </div>
  </div>
);

/** Talent platforms: profiles, search and placement workflow (per company profile). */
export const TalentUI = () => (
  <div className="ui" aria-hidden="true">
    <Side brand="Talent" on={0} items={['Profiles', 'Search', 'Shortlists', 'Placements', 'Reports']} />
    <div className="ui-main">
      <div className="ui-top">
        <div><h4>Talent profiles</h4><small>Discovery across one sector</small></div>
        <div className="ui-search">Search skills, category, availability</div>
        <span className="ui-btn ui-btn--y">Shortlist</span>
      </div>
      <div style={{ display: 'flex', gap: '.9cqw', flexWrap: 'wrap' }}>
        <span className="ui-chip">Film &amp; creative</span><span className="ui-chip ui-chip--b">Staffing</span><span className="ui-chip ui-chip--y">Sports</span><span className="ui-chip ui-chip--g">Available</span>
      </div>
      <div className="ui-grid2" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {[['P1', 'Profile 0142', 'Film & creative', ''], ['P2', 'Profile 0207', 'Staffing', 'ui-av--g'], ['P3', 'Profile 0311', 'Sports', 'ui-av--y'], ['P4', 'Profile 0398', 'Film & creative', 'ui-av--c'], ['P5', 'Profile 0415', 'Staffing', ''], ['P6', 'Profile 0522', 'Sports', 'ui-av--g']].map(([a, n, c, cl]) => (
          <div className="ui-profile" key={n}><Av t={a} c={cl} /><div><b>{n}</b><small>{c}</small></div></div>
        ))}
      </div>
      <div className="ui-cards" style={{ marginTop: 'auto' }}>
        {['Profiles', 'Shortlisted', 'Placement'].map((t, i) => (
          <div className="ui-card" key={t}><h5>{t}</h5><div className="ui-prog"><i style={{ width: `${[88, 54, 26][i]}%` }} /></div></div>
        ))}
      </div>
    </div>
  </div>
);

/** GST billing and records (per company profile): a sample tax invoice. */
export const BillingUI = () => (
  <div className="ui" aria-hidden="true">
    <Side brand="Billing" on={0} items={['Invoices', 'Customers', 'Items', 'GST', 'Records', 'Reports']} />
    <div className="ui-main">
      <div className="ui-top">
        <div><h4>Tax invoice</h4><small>SAMPLE-0001 · draft</small></div>
        <span className="ui-chip ui-chip--y">Draft</span>
        <span className="ui-btn">Issue invoice</span>
      </div>
      <div className="ui-inv">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2cqw', color: '#66748F' }}><span>Bill to: Sample Customer</span><span>GSTIN: XXXXXXXXXXXXXXX</span></div>
        <div className="ui-l ui-th"><span>Item</span><span>Qty</span><span>Rate</span><span>Amount</span></div>
        {[['Sample item A', '2', '1,000', '2,000'], ['Sample item B', '1', '2,500', '2,500'], ['Sample service', '1', '1,500', '1,500']].map((r) => (
          <div className="ui-l" key={r[0]}>{r.map((c, i) => <span key={i}>{c}</span>)}</div>
        ))}
        <div className="ui-tot">
          <div><span>Taxable value</span><span>6,000</span></div>
          <div><span>CGST 9%</span><span>540</span></div>
          <div><span>SGST 9%</span><span>540</span></div>
          <div className="big"><span>Total</span><span>7,080</span></div>
        </div>
      </div>
    </div>
  </div>
);

/** Point of sale: catalogue and cart. */
export const PosUI = () => (
  <div className="ui" aria-hidden="true" style={{ flexDirection: 'column' }}>
    <div className="ui-main" style={{ padding: '2.4cqw' }}>
      <div className="ui-top"><div><h4>Point of sale</h4><small>Counter 1</small></div><span className="ui-chip">Open</span></div>
      <div className="ui-pos">
        <div className="ui-prod">{['Item 01', 'Item 02', 'Item 03', 'Item 04', 'Item 05', 'Item 06'].map((n) => (<div className="ui-p" key={n}><i />{n}</div>))}</div>
        <div className="ui-cart">
          <b style={{ fontSize: '1.5cqw' }}>Current sale</b>
          {[['Item 02 × 2', '800'], ['Item 05 × 1', '450'], ['Item 01 × 3', '960']].map(([a, b]) => (<div className="ln" key={a}><span>{a}</span><span>{b}</span></div>))}
          <div className="ln" style={{ border: 0, fontWeight: 700, fontSize: '1.6cqw' }}><span>Total</span><span>2,210</span></div>
          <span className="ui-btn" style={{ justifyContent: 'center', marginTop: 'auto' }}>Take payment</span>
        </div>
      </div>
    </div>
  </div>
);

/** Project management: a simple task board. */
export const OpsUI = () => (
  <div className="ui" aria-hidden="true">
    <Side brand="Operate" on={1} items={['Overview', 'Board', 'Schedule', 'Inventory', 'Reports']} />
    <div className="ui-main">
      <div className="ui-top"><div><h4>Project board</h4><small>Sample project</small></div><div className="ui-search">Search tasks</div><span className="ui-btn">+ Task</span></div>
      <div className="ui-kan">
        {[['To do', [['Define scope', 'Planning'], ['Collect requirements', 'Planning']]], ['In progress', [['Build workflow', 'Engineering'], ['Prepare reports', 'Reporting']]], ['Done', [['Set up database', 'Engineering']]]].map(([h, ts]) => (
          <div className="ui-col" key={h as string}><h5>{h as string}<span>{(ts as string[][]).length}</span></h5>
            {(ts as string[][]).map(([a, b]) => (<div className="ui-tk" key={a}>{a}<small>{b}</small></div>))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/** Phone view of talent search. */
export const PhoneTalentUI = () => (
  <div className="ui" aria-hidden="true"><div className="ui-phone">
    <div className="ui-search">Search talent</div>
    <div style={{ display: 'flex', gap: '2.4cqw', flexWrap: 'wrap' }}><span className="ui-chip">Film</span><span className="ui-chip ui-chip--b">Staffing</span><span className="ui-chip ui-chip--y">Sports</span></div>
    {[['P1', 'Profile 0142', 'Film & creative', ''], ['P2', 'Profile 0207', 'Staffing', 'ui-av--g'], ['P3', 'Profile 0311', 'Sports', 'ui-av--y']].map(([a, n, c, cl]) => (
      <div className="ui-profile" key={n}><Av t={a} c={cl} /><div><b>{n}</b><small>{c}</small></div></div>
    ))}
  </div></div>
);

/** Phone view of an LMS course list. */
export const PhoneLmsUI = () => (
  <div className="ui" aria-hidden="true"><div className="ui-phone">
    <div style={{ font: '700 8cqw var(--f-display)' }}>My learning</div>
    {[['Course 1', 64], ['Course 2', 38], ['Course 3', 90]].map(([n, p]) => (
      <div className="ui-card" key={n as string} style={{ padding: '5cqw', borderRadius: '5cqw' }}>
        <div style={{ fontWeight: 600, marginBottom: '3cqw' }}>{n}</div>
        <div className="ui-prog" style={{ height: '2.6cqw' }}><i style={{ width: `${p}%` }} /></div>
      </div>
    ))}
  </div></div>
);
