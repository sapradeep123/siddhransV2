'use client';
import { Parallax } from './motion';
import { PhotoCard } from './ui';

/** Hero imagery: the pump condition-monitoring infographic leads; an ESP32 sensing prototype and a board-assembly close-up support it. */
export default function HeroCollage() {
  return (
    <div className="collage">
      <Parallax className="c-a" speed={14}>
        <PhotoCard name="ref-pump-infographic" priority sizes="(min-width:1180px) 38vw, 92vw" pos="50% 50%" shade />
      </Parallax>
      <Parallax className="c-b" speed={40}>
        <PhotoCard name="ref-esp32-breadboard" sizes="(min-width:1180px) 20vw, 40vw" pos="45% 50%" cap={false} />
      </Parallax>
      <Parallax className="c-c" speed={-24}>
        <PhotoCard name="hw-solder-board" sizes="(min-width:1180px) 16vw, 36vw" pos="45% 45%" cap={false} />
      </Parallax>
      <div className="floatchip floatchip--1" aria-hidden="true"><i>IoT</i><div>Condition monitoring<small>sensor to dashboard</small></div></div>
      <div className="floatchip floatchip--2" aria-hidden="true"><i>FW</i><div>Firmware<small>ESP32 · wireless</small></div></div>
      <div className="floatchip floatchip--3" aria-hidden="true"><i>PCB</i><div>Board design<small>schematic to bring-up</small></div></div>
    </div>
  );
}
