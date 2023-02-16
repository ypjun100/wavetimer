export class AnimateQueue {
    static queue = []
    static isAnimating = false;
    static mainInterval = setInterval(() => {
        if(this.queue.length) {
            if(!this.isAnimating) {
                this.queue.shift().run();
            }
        }
    }, 100);

    static enQueue(animate) {
        animate.onStarted = () => { this.isAnimating = true; }
        animate.onFinished = () => { this.isAnimating = false; }
        this.queue.push(animate);
    }
}