import { useEffect } from 'react';
import { Application, Graphics } from 'pixi.js';

import { WaveManager } from '../../utils/wave/wave-manager';
import { TimerUIContainer } from '../../utils/timer-ui/timer-ui';
import { WaveAnimate, WaveAnimateQueue } from '../../utils/wave-animate/wave-animate';

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
    ui.onTimerStarted = () => {
      wave.startWave();
      WaveAnimateQueue.enQueue(new WaveAnimate(wave, ui.currentSeconds / ui.initialSeconds, 0.15));
    }
    ui.onTimerPaused = () => { wave.stopWave(); }
    ui.onTimerEachSecond = (currentSeconds, initialSeconds) => {
      WaveAnimateQueue.enQueue(new WaveAnimate(wave, currentSeconds / initialSeconds, 0.7));
    };
    app.stage.addChild(ui.container);
    
    // create wave graphics
    const wave = new WaveManager("dark", window.innerWidth, window.innerHeight, document, canvas, graphics);
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
    document.onvisibilitychange = () => {
      WaveAnimateQueue.userFocus = document.visibilityState === "visible" ? true : false;
    }

    // for testing
    window.onkeydown = (e) => {
      if(e.key === "1") {
        wave.startWave();
      } else if(e.key === "2") {
        wave.stopWave();
      } else if(e.key === "3") {
        wave.switchTheme();
      }
    };
  }, []);

  return (
    <div className="wave-timer">
      <canvas id="wave-timer-canvas"></canvas>
    </div>
  );
}
