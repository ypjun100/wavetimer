export class WaveAnimateQueue {
    static queue = [];
    static isAnimating = false; // guartee priority
    static userFocus = true; // check user focus
    static mainInterval = setInterval(() => {
        if(this.queue.length) {
            if(!this.isAnimating) {
                this.current = this.queue.shift();
                this.current.run();
            }
            if (!this.userFocus) {
                this.current.finish();
            }
            // console.log(this.queue);
        }
    }, 100);

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
        this.animator = setInterval(() => {
            if(!this.isStarted) {
                this.isStarted = true;
                this.startValue = this.wave.waveHeight;
                this.func = (value) => {
                    return 1/(1+(0.01*value/(1-0.01*value))**-2)*(this.endValue-this.startValue)+this.startValue
                }
            }
            this.wave.waveHeight = this.func(this.counter);
            if(this.counter >= 100.0) {
                clearInterval(this.animator);
                this.onFinished();
            }
            this.counter += this.alpha;
        }, 1);
    }

    onStarted() {}
    onFinished() {}
    finish() {
        this.onStarted();
        this.wave.waveHeight = this.endValue;
        clearInterval(this.animator);
        this.onFinished();
    }
}