'use client';
import { useMemo, useState } from 'react';
import { Art, Photo, Tag } from './ui';
import { domainLabel, statusLabel, useCases, type UseCaseStatus } from '@/content/usecases';

const TAG: Record<UseCaseStatus, 'design' | 'prop' | 'cap'> = { designed: 'design', proposed: 'prop', capability: 'cap' };
const FILTERS: ('all' | UseCaseStatus)[] = ['all', 'designed', 'proposed', 'capability'];

export default function UseCaseLibrary() {
  const [f, setF] = useState<'all' | UseCaseStatus>('all');
  const rows = useMemo(() => useCases.map((u, i) => ({ u, i })).filter(({ u }) => f === 'all' || u.status === f), [f]);
  return (
    <>
      <h2 id="h-lib" className="mono" style={{ fontSize: 13, letterSpacing: '.07em', fontWeight: 500, marginBottom: 14 }}>Filter by status</h2>
      <div className="filters" role="group" aria-label="Filter use cases by status">
        {FILTERS.map((k) => (
          <button key={k} type="button" className="chip" aria-pressed={f === k} onClick={() => setF(k)}>{k === 'all' ? 'All' : statusLabel[k]}</button>
        ))}
      </div>
      <p className="mono" style={{ margin: '0 0 12px', color: 'var(--mute)' }} aria-live="polite" data-testid="uc-count">
        Showing {rows.length} of {useCases.length}
      </p>
      <div className="uc-list">
        {rows.map(({ u, i }) => (
          <article className="uc" key={u.title} data-status={u.status}>
            <div className="n">{String(i + 1).padStart(2, '0')}</div>
            <div className="thumb">
              {'photo' in u.media ? <Photo name={u.media.photo} pos={u.media.pos} sizes="150px" alt="" /> : <Art kind={u.media.ill} />}
            </div>
            <div><h3>{u.title}</h3><div className="dom">{domainLabel[u.domain]}</div></div>
            <div>
              <p>{u.outcome}</p>
              <div className="flow">{u.flow.map((s, k) => (<span key={s}>{k > 0 && <em> → </em>}{s}</span>))}</div>
            </div>
            <div><Tag kind={TAG[u.status]}>{statusLabel[u.status]}</Tag></div>
          </article>
        ))}
      </div>
    </>
  );
}
