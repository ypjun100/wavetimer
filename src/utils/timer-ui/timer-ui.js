import { Text, BLEND_MODES, Container } from 'pixi.js';

export class TimerUIContainer {
    constructor(width, height) {
        this.container = new Container();
        this.timerMode = 'paused';
        this.initialSeconds = 60;
        this.numberOfTimes = 0;
        this.currentSeconds = this.initialSeconds;

        // default text style
        const defaultTextStyle = {
            fontFamily: 'Futura',
            fill: '#8fc2ff',
            fontSize: 22
        };

        // main timer text
        this.timerText = new Text(this.secondsToTime(this.currentSeconds), Object.assign({}, defaultTextStyle, {
            fontSize: 92,
            fontWeight: 'bold',
            align: 'center'
        }));
        this.timerText.alpha = 0.9;
        this.timerText.anchor.set(0.5, 0.5);
        this.timerText.position.set(...this.getPosition('center', width, height));
        this.timerText.blendMode = BLEND_MODES.XOR;

        // start time text
        this.startTimeText = new Text(this.secondsToTime(this.initialSeconds), Object.assign({}, defaultTextStyle, { align: 'left' }));
        this.startTimeText.alpha = 0.9;
        this.startTimeText.anchor.set(0, 1);
        this.startTimeText.position.set(...this.getPosition('left-top', width, height));
        this.startTimeText.blendMode = BLEND_MODES.XOR;

        // number of times text
        this.numberOfTimesText = new Text(`${this.numberOfTimes} times`, Object.assign({}, defaultTextStyle, { align: 'right' }));
        this.numberOfTimesText.alpha = 0.9;
        this.numberOfTimesText.anchor.set(1, 1);
        this.numberOfTimesText.position.set(...this.getPosition('right-top', width, height));
        this.numberOfTimesText.blendMode = BLEND_MODES.XOR;

        // reset button
        this.resetButton = new Text('reset', Object.assign({}, defaultTextStyle, { align: 'left' }));
        this.resetButton.anchor.set(0, 0);
        this.resetButton.position.set(...this.getPosition('left-bottom', width, height));
        this.resetButton.blendMode = BLEND_MODES.XOR;
        this.resetButton.interactive = true;
        this.resetButton.cursor = 'pointer';
        this.resetButton.on('pointerdown', this.timerReset.bind(this));

        // start/pause button
        this.startPauseButton = new Text('start', Object.assign({}, defaultTextStyle, { align: 'right' }));
        this.startPauseButton.anchor.set(1, 0);
        this.startPauseButton.position.set(...this.getPosition('right-bottom', width, height));
        this.startPauseButton.blendMode = BLEND_MODES.XOR;
        this.startPauseButton.interactive = true;
        this.startPauseButton.cursor = 'pointer';
        this.startPauseButton.on('pointerdown', this.timerStartPause.bind(this));

        this.container.addChild(this.timerText, this.startTimeText, this.numberOfTimesText, this.resetButton, this.startPauseButton);

        // fps
        this.fps = new Text("fps : 00");
        this.fps.position.set(0, 0);
        this.container.addChild(this.fps);
    }

    getPosition(position, width, height) {
        if(position === "left-top")
            return [width / 2 - 140, height / 2 - 70];
        else if(position === "right-top")
            return [width / 2 + 140, height / 2 - 70]
        else if(position === "center")
            return [width / 2, height / 2]
        else if(position === "left-bottom")
            return [width / 2 - 140, height / 2 + 70]
        else if(position === "right-bottom")
            return [width / 2 + 140, height / 2 + 70]
    }

    rerender() {
        this.timerText.text = this.secondsToTime(this.currentSeconds);
        this.numberOfTimesText.text = `${this.numberOfTimes} times`;
        if(this.timerMode === "paused") {
            this.startPauseButton.text = "start";
        } else if(this.timerMode === "started") {
            this.startPauseButton.text = "pause";
        }
    }

    secondsToTime(seconds) {
        const min = ('0' + parseInt(seconds / 60)).slice(-2);
        const sec = ('0' + seconds % 60).slice(-2);
        return `${min}:${sec}`
    }

    resize(width, height) {
        this.timerText.position.set(...this.getPosition('center', width, height));
        this.startTimeText.position.set(...this.getPosition('left-top', width, height));
        this.numberOfTimesText.position.set(...this.getPosition('right-top', width, height));
        this.resetButton.position.set(...this.getPosition('left-bottom', width, height));
        this.startPauseButton.position.set(...this.getPosition('right-bottom', width, height));
    }

    // timer event
    timerStartPause() {
        if(this.timerMode === "paused") {
            this.timerStart();
        } else {
            this.timerPause();
        }
    }
    timerStart() {
        this.timerMode = "started";
        this.timer = setInterval(this.timerEachSecond.bind(this), 1000);
        this.rerender();
        this.onTimerStarted();
    }
    timerPause() {
        this.timerMode = "paused";
        this.rerender();
        this.onTimerPaused();
        clearInterval(this.timer);
    }
    timerReset() {
        this.currentSeconds = this.initialSeconds;
        this.timerPause();
        clearInterval(this.timer);
    }
    timerEachSecond() {
        this.currentSeconds -= 1;
        this.timerText.text = this.secondsToTime(this.currentSeconds);
        this.onTimerEachSecond(this.currentSeconds, this.initialSeconds);

        if(this.currentSeconds <= 0) {
            this.numberOfTimes++;
            this.timerReset();
        }
    }

    // user custom event
    onTimerEachSecond(currentSeconds, initialSeconds) {}
    onTimerStarted() {}
    onTimerPaused() {}
    onTimerReset() {}
}