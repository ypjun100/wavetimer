export class WaveAnimateQueue {
    static queue = [];
    static isAnimating = false;
    static mainInterval = setInterval(() => {
        if(this.queue.length) {
            if(!this.isAnimating) {
                this.queue.shift().run();
            }
        }
    }, 50);

    static enQueue(waveAnimate) {
        waveAnimate.onStarted = () => { this.isAnimating = true; }
        waveAnimate.onFinished = () => { this.isAnimating = false; }
        this.queue.push(waveAnimate);
    }
}

export class WaveAnimate {
    constructor(wave, endValue, alpha) {
        this.wave = wave;
        this.endValue = endValue;
        this.alpha = alpha;
        this.counter = 0.0;
        this.isStarted = false;
    }

    run() {
        this.onStarted();

        const animator = setInterval(() => {
            if(!this.isStarted) {
                this.isStarted = true;
                this.startValue = this.wave.waveHeight;
                this.func = (value) => {
                    return 1/(1+(0.01*value/(1-0.01*value))**-2)*(this.endValue-this.startValue)+this.startValue
                }
            }

            this.wave.waveHeight = this.func(this.counter);
            if(this.counter >= 100.0) {
                clearInterval(animator);
                this.onFinished();
            }
            this.counter += this.alpha;
        }, 1);
    }

    onStarted() {}
    onFinished() {}
}