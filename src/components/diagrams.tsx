import { RawSvg } from './ui';
import { chainIcons, stackSvg } from './svgart';

export const StackFigure = () => (
  <div className="stack-fig" style={{ maxWidth: 520, marginLeft: 'auto' }}><RawSvg html={stackSvg} /></div>
);

export const StackLegend = () => (
  <ol className="legend" aria-label="Layers in the diagram">
    <li><b>01</b>AI, ML &amp; Intelligent Automation</li><li><b>02</b>RPA &amp; Business Automation</li>
    <li><b>03</b>Enterprise Software Engineering</li><li><b>04</b>Data, Analytics &amp; Integration</li>
    <li><b>05</b>Cloud, Server &amp; Infrastructure</li><li><b>06</b>Embedded Systems &amp; Industrial IoT</li>
    <li className="sec"><b>SEC</b>Security, through every layer</li><li className="sec"><b>MGD</b>Managed services keep every layer running</li>
  </ol>
);

const CHAIN: [keyof typeof chainIcons, string, string][] = [
  ['sense', 'Sense', 'Temperature, vibration, level, flow, optical and environmental signals.'],
  ['control', 'Control', 'Embedded controllers and firmware that act on the signal, close to the machine.'],
  ['connect', 'Connect', 'Bluetooth, Wi-Fi, GSM, LoRaWAN, NB-IoT and LTE-M links to a secure backend.'],
  ['analyse', 'Analyse', 'Rules and machine-learning models over live and historical readings.'],
  ['act', 'Act', 'Dashboards, alerts, audit logs and automated follow-through.'],
];
export const SignalChain = () => (
  <div className="chain rv">
    {CHAIN.map(([k, t, d]) => (
      <div key={k}><RawSvg html={chainIcons[k]} /><b>{t}</b><span>{d}</span></div>
    ))}
  </div>
);
