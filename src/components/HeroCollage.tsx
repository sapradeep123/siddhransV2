'use client';
import { Parallax } from './motion';
import { PhotoCard } from './ui';

/** Layered hero imagery with depth: three photographs drift at different speeds as the page scrolls. */
export default function HeroCollage() {
  return (
    <div className="collage">
      <Parallax className="c-a" speed={14}>
        <PhotoCard name="analyst-dashboards" priority sizes="(min-width:1180px) 36vw, 90vw" pos="40% 50%" shade />
      </Parallax>
      <Parallax className="c-b" speed={46}>
        <PhotoCard name="biometric-scan" sizes="(min-width:1180px) 16vw, 36vw" pos="75% 40%" cap={false} />
      </Parallax>
      <Parallax className="c-c" speed={-26}>
        <PhotoCard name="automation-line" sizes="(min-width:1180px) 16vw, 36vw" pos="55% 55%" cap={false} />
      </Parallax>
      <div className="floatchip floatchip--1" aria-hidden="true"><i>AI</i><div>Applied AI<small>with people in the loop</small></div></div>
      <div className="floatchip floatchip--2" aria-hidden="true"><i>SEC</i><div>Secure by design<small>identity · data · recovery</small></div></div>
      <div className="floatchip floatchip--3" aria-hidden="true"><i>IoT</i><div>Sensor to decision<small>embedded + software</small></div></div>
    </div>
  );
}
