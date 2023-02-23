// reference : https://kr.mathworks.com/matlabcentral/fileexchange/59915-simple-wave-equation-solver

export class Wave {
    constructor(n, width, waveSize) {
        this.n = n;
        this.x = [...Array(n)].map((_, i) => i / n * width);
        this.y = [this.x.map(xi => 0), this.x.map(xi => 0), this.x.map(xi => 0)]; // 0 - past, 1 - current, 2 - future
        this.isWave = false;
        this.waveStartTime = 0;
        this.waveSize = waveSize; // wave height size
    }

    resize(width) {
        this.x = [...Array(this.n)].map((_, i) => i / this.n * width);
    }

    startWave(frame) {
        this.isWave = true;
        if(this.waveStartTime === 0)
            this.waveStartTime = frame;
            
    }

    stopWave() {
        this.isWave = false;
        this.waveStartTime = 0;
    }

    update(frame) {
        // wave equation
        for(let i = 1; i < this.n - 1; i++) {
            this.y[2][i] = (0.5 * (this.y[1][i + 1] + this.y[1][i - 1]) + this.y[1][i] - this.y[0][i]) * 0.994;
        }
        // update flexible movement for the edges of the wave.
        // if you remove below statements, both sides of the edge will be having fixed position.
        this.y[2][0] = this.y[2][1]; // left edge of the wave
        this.y[2][this.n - 1] = this.y[2][this.n - 2]; // right edge of the wave

        // if isWave is true, the wave will be moving as sin function.
        if(this.isWave) {
            this.y[2][this.n - 1] = Math.sin((frame - this.waveStartTime) * 0.1) * this.waveSize;
        }
    }
}