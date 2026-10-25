'use client';
import { Fragment, useMemo, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { Art, Photo, Pill } from './ui';
import { domainLabel, statusLabel, techLabel, useCases, type Domain, type Tech } from '@/content/usecases';

const DOMAINS = (Object.keys(domainLabel) as Domain[]).filter((d) => useCases.some((u) => u.domain === d));
const TECHS = (Object.keys(techLabel) as Tech[]).filter((t) => useCases.some((u) => u.tech === t));

export default function UseCaseLibrary() {
  const [d, setD] = useState<'all' | Domain>('all');
  const [t, setT] = useState<'all' | Tech>('all');
  const reduce = useReducedMotion();
  const rows = useMemo(() => useCases.map((u, i) => ({ u, i })).filter(({ u }) => (d === 'all' || u.domain === d) && (t === 'all' || u.tech === t)), [d, t]);
  return (
    <>
      <h2 id="h-lib" className="mono" style={{ marginBottom: 14, color: 'var(--ink-2)' }}>Filter by industry</h2>
      <div className="filters" role="group" aria-label="Filter use cases by industry">
        {(['all', ...DOMAINS] as const).map((k) => (
          <button key={k} type="button" className="fbtn" aria-pressed={d === k} onClick={() => setD(k)}>{k === 'all' ? 'All industries' : domainLabel[k]}</button>
        ))}
      </div>
      <h2 className="mono" style={{ margin: '18px 0 14px', color: 'var(--ink-2)' }}>Filter by technology</h2>
      <div className="filters" role="group" aria-label="Filter use cases by technology">
        {(['all', ...TECHS] as const).map((k) => (
          <button key={k} type="button" className="fbtn" aria-pressed={t === k} onClick={() => setT(k)}>{k === 'all' ? 'All technologies' : techLabel[k]}</button>
        ))}
      </div>
      <p className="mono" style={{ margin: '0 0 22px', color: 'var(--ink-2)' }} aria-live="polite" data-testid="uc-count">
        Showing {rows.length} of {useCases.length}
      </p>
      <div className="uc-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {rows.map(({ u, i }, k) => (
            <Fragment key={u.title}>
            {(k === 0 || rows[k - 1].u.track !== u.track) && (
              <p className="uc-divider mono" data-track={u.track}>{u.track === 'electronics' ? 'AI meets machines: embedded, IoT & electronics' : 'AI & software applications'}</p>
            )}
            <m.article layout={!reduce} className="uc" data-tech={u.tech} initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0, scale: 0.96 }} transition={{ duration: reduce ? 0 : 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
              <div className="uc__media">
                {'photo' in u.media ? <Photo name={u.media.photo} pos={u.media.pos} className={u.media.fit === 'contain' ? 'fit-contain' : undefined} sizes="(min-width:1180px) 30vw, (min-width:640px) 45vw, 100vw" alt="" /> : <Art kind={u.media.ill} />}
                <Pill kind="built">{statusLabel[u.status]}</Pill>
                <span className="uc__n">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="uc__body">
                <span className="mono">{domainLabel[u.domain]}</span>
                <h3>{u.title}</h3>
                <p>{u.outcome}</p>
                <div className="uc__flow">{u.flow.map((s, k) => (<span key={s}>{k > 0 && <em> → </em>}{s}</span>))}</div>
              </div>
            </m.article>
            </Fragment>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
