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
  <div className="loopfig" style={{ ['--cols' as string]: items.length === 6 ? 3 : Math.min(items.length, 5) } as React.CSSProperties}>
    {items.map(([t, d], i) => (
      <div className="loopfig__item" key={t}><small>{String(i + 1).padStart(2, '0')}</small><b>{t}</b><span>{d}</span></div>
    ))}
  </div>
);

const VLSI: [string, string][] = [['Specification', 'Functions and interfaces'], ['RTL design', 'Verilog / SystemVerilog'], ['Verification', 'Test benches, simulation'], ['FPGA prototype', 'Run and measure on hardware'], ['Board integration', 'PCB and firmware bring-up']];
/** Design flow we support, drawn as original artwork. It is a scope diagram, not a claim of fabricated silicon. */
export const VlsiFlow = ({ compact = false }: { compact?: boolean }) => (
  <figure className={`vflow${compact ? ' vflow--compact' : ''}`} aria-label="Digital design flow: specification, RTL design, verification, FPGA prototype, board integration">
    <ol>{VLSI.map(([t, d], i) => (<li key={t}><small className="mono">{String(i + 1).padStart(2, '0')}</small><b>{t}</b><span>{d}</span></li>))}</ol>
    <figcaption className="mono">Design-support scope · no tape-out or fabrication claimed</figcaption>
  </figure>
);
