import { useEffect } from 'react';
import { Application, Graphics } from 'pixi.js';

import { WaveManager } from '../../utils/wave/wave-manager';
import { Animate } from '../../utils/animate/animate';
import { TimerUIContainer } from '../../utils/timer-ui/timer-ui';

export default function WaveTimer() {
  useEffect(() => {
    const canvas = document.getElementById("wave-timer-canvas");
    const app = new Application({
      antialias: true,
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight,
      autoDensity: true,
      backgroundAlpha: 0,
      resolution: 2,
      resizeTo: window});
    const graphics = new Graphics();
    app.stage.addChild(graphics);

    // create ui
    const ui = new TimerUIContainer(window.innerWidth, window.innerHeight);
    ui.onTimerStarted = () => { wave.startWave(); }
    ui.onTimerPaused = () => { wave.stopWave(); }
    ui.onTimerEachSecond = (currentSeconds, initialSeconds) => { new Animate((value) => { wave.waveHeight = value; }, wave.waveHeight, currentSeconds / initialSeconds).run(0.4); };
    app.stage.addChild(ui.container);
    
    // create wave graphics
    const wave = new WaveManager("light", window.innerWidth, window.innerHeight, document, canvas, graphics);
    wave.registerFpsText(ui.fps);

    // render
    app.ticker.add(() => {
      wave.render();
    });

    // resize
    window.onresize = () => {
      wave.resize(window.innerWidth, window.innerHeight);
      ui.resize(window.innerWidth, window.innerHeight);
    };

    // wave user interaction
    window.onmousedown = (e) => {
      wave.mouseDown(e.clientX);
    };
    window.ontouchstart = (e) => {
      wave.mouseDown(e.touches[0].clientX);
    };

    // for testing
    window.onkeydown = (e) => {
      if(e.key === "1") {
        wave.startWave();
      } else if(e.key === "2") {
        wave.stopWave();
      } else if(e.key === "3") {
        wave.switchTheme();
      } else if(e.key === "4") {
        const animate = new Animate((value) => { wave.waveHeight = value; }, wave.waveHeight, Math.random() * 0.8 + 0.1);
        animate.run(0.1);
      }
    };
  }, []);

  return (
    <div className="wave-timer">
      <canvas id="wave-timer-canvas"></canvas>
    </div>
  );
}
