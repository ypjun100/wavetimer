import { Wave } from './wave.js';
import { getFrontWaveColor, getBackWaveColor } from './wave-color-palette.js';

export class WaveManager {
    constructor(theme, width, height, document, canvas, graphics) {
        this.theme = theme; // light, dark
        this.width = width;
        this.height = height;
        this.document = document;
        this.canvas = canvas;
        this.graphics = graphics;
        this.waveHeight = 0.5; // range 0 ~ 1
        this.isMouseActive = true;
        this.mousePosX = 0;
        this.mouseDownTime = 0;
        this.backWave = new Wave(120, this.width, 10);
        this.frontWave = new Wave(100, this.width, 15);
        this.frame = 0;
        this.lastFrame = 0;

        // create background & gradation
        this.background = this.document.createElement('div');
        this.background.style.cssText = `background-color: #212121; opacity: ${this.theme === "light" ? "0" : "1"}; position: absolute; inset: 0px; z-index: -1;`;
        this.gradation = this.document.createElement('div');
        this.gradation.style.cssText = `background: linear-gradient(0deg, ${this.theme === "light" ? "#64A2EA" : "#224773"}, transparent); position: absolute; z-index: 1; pointer-events: none;`;
        this.document.body.appendChild(this.background);
        this.document.body.appendChild(this.gradation);
    }

    switchTheme() {
        if(this.theme === "light") {
            this.background.style.opacity = 1;
            this.gradation.style.background = "linear-gradient(0deg, #224773, transparent)"
            this.theme = "dark";
        } else if(this.theme === "dark") {
            this.background.style.opacity = 0;
            this.gradation.style.background = "linear-gradient(0deg, #64A2EA, transparent)"
            this.theme = "light";
        }
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
        this.frontWave.resize(width);
        this.backWave.resize(width);
    }

    registerFpsText(fpsText) {
        this.fpsText = fpsText;

        setInterval(() => {
            const fps = this.frame - this.lastFrame
            this.fpsText.text = "fps : " + fps;
            this.lastFrame = this.frame;
        }, 1000);
    }

    mouseDown(mousePosX) {
        if(this.isMouseActive) {
            this.isMouseActive = false
            this.mousePosX = mousePosX;
        }
    }

    startWave() {
        this.frontWave.startWave(this.frame);
        this.backWave.startWave(this.frame);
    }

    stopWave() {
        this.frontWave.stopWave();
        this.backWave.stopWave();
    }

    draw(wave, color, height) {
        this.graphics.beginFill(color);
        this.graphics.moveTo(0, this.height);
        this.graphics.lineTo(0, wave.y[1][0] + height);
        for(let i = 0; i < wave.n; i++) {
            wave.y[0][i] = wave.y[1][i];
            wave.y[1][i] = wave.y[2][i];
            this.graphics.lineTo(wave.x[i], wave.y[1][i] + height);
        }
        this.graphics.lineTo(this.width, wave.y[1][wave.n - 1] + height);
        this.graphics.lineTo(this.width, this.height);
        this.graphics.closePath();
        this.graphics.endFill();
    }
    
    render() {
        // user mouse interaction
        if(!this.isMouseActive) {
            if(this.mouseDownTime == 0)
                this.mouseDownTime = this.frame;

            const sinPos = Math.sin((this.frame - this.mouseDownTime) * 0.2) * -5;
            const backIndex = parseInt(this.mousePosX / this.width * this.backWave.n);
            const frontIndex = parseInt(this.mousePosX / this.width * this.frontWave.n);

            this.backWave.y[1][backIndex] = this.backWave.y[1][backIndex] - sinPos;
            this.frontWave.y[1][frontIndex] = this.frontWave.y[1][frontIndex] - sinPos;
            
            if(sinPos > 0) {
                this.isMouseActive = true;
                this.mouseDownTime = 0;
            }
        }

        // update(calculate) wave position
        this.backWave.update(this.frame);
        this.frontWave.update(this.frame);

        // draw wave
        this.graphics.clear();
        this.draw(this.backWave, getBackWaveColor(this.theme), ((1 - this.waveHeight) * 0.8 + 0.1) * this.height);
        this.draw(this.frontWave, getFrontWaveColor(this.theme), ((1 - this.waveHeight) * 0.8 + 0.1) * this.height);

        // update wave gradation position
        this.gradation.style.inset = `${((1 - this.waveHeight) * 0.8 + 0.1) * this.height < this.height / 2 ? this.height / 2 : ((1 - this.waveHeight) * 0.8 + 0.1) * this.height}px 0 0`;

        // frame increase, avoid frame greater than maximum integer
        this.frame++;
        if(this.frame >= Number.MAX_SAFE_INTEGER)
            this.frame = 0;
    }
}