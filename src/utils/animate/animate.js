export class Animate {
    constructor(setter, startValue, endValue) {
        this.setter = setter;
        this.startValue = startValue;
        this.endValue = endValue;
        this.counter = 0.0;
        this.func = (value) => {
            return 1/(1+(0.01*value/(1-0.01*value))**-2)*(this.endValue-this.startValue)+this.startValue
        }
    }

    run(alpha) {
        const animator = setInterval(() => {
            this.setter(this.func(this.counter));

            if(this.counter >= 100.0)
                clearInterval(animator);
            this.counter += alpha;
        }, 1);
    }
}