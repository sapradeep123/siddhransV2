import { RawSvg } from './ui';
import { chainIcons } from './svgart';

const CHAIN: [keyof typeof chainIcons, string, string][] = [
  ['sense', 'Sense', 'Temperature, vibration, level, flow, optical and environmental signals.'],
  ['control', 'Control', 'Embedded controllers and firmware that act on the signal, close to the machine.'],
  ['connect', 'Connect', 'Bluetooth, Wi-Fi, GSM, LoRaWAN, NB-IoT and LTE-M links to a secure backend.'],
  ['analyse', 'Analyse', 'Rules and machine-learning models over live and historical readings.'],
  ['act', 'Act', 'Dashboards, alerts, audit logs and automated follow-through.'],
];

/** Sense → Control → Connect → Analyse → Act, with an animated signal pulse travelling the line. */
export const SignalChain = () => (
  <div className="chain">
    <div className="chain__line" aria-hidden="true" />
    {CHAIN.map(([k, t, d]) => (
      <div className="chain__node" key={k}><i><RawSvg html={chainIcons[k]} /></i><b>{t}</b><span>{d}</span></div>
    ))}
  </div>
);

/** Plan / Build / Run / Support / Improve. */
export const LoopFigure = () => (
  <>
    <div className="loopfig">
      {[['Plan', 'Define the outcome and the architecture.'], ['Build', 'Engineer and integrate.'], ['Run', 'Administer production day to day.'], ['Support', 'Application, database and incident support.'], ['Improve', 'Optimise performance, reliability and cost.']].map(([t, d], i) => (
        <div className="loopfig__item" key={t}><small>{String(i + 1).padStart(2, '0')}</small><b>{t}</b><span>{d}</span></div>
      ))}
    </div>
    <div className="loopback mono"><span>Continuous improvement feeds the next plan</span><i /></div>
  </>
);

/** Numbered approach steps (works for any count up to 8). */
export const Steps = ({ items }: { items: readonly (readonly [string, string])[] }) => (
  <div className="loopfig" style={{ ['--cols' as string]: Math.min(items.length, 5) } as React.CSSProperties}>
    {items.map(([t, d], i) => (
      <div className="loopfig__item" key={t}><small>{String(i + 1).padStart(2, '0')}</small><b>{t}</b><span>{d}</span></div>
    ))}
  </div>
);
