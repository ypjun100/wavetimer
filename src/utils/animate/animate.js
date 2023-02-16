export class Animate {
    constructor(setter, startValue, endValue, alpha) {
        this.setter = setter;
        this.startValue = startValue
        this.endValue = endValue;
        this.alpha = alpha;
        this.counter = 0.0;
        this.func = (value) => {
            return 1/(1+(0.01*value/(1-0.01*value))**-2)*(this.endValue-this.startValue)+this.startValue
        }
    }

    run() {
        this.onStarted();

        const animator = setInterval(() => {
            this.setter(this.func(this.counter));

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