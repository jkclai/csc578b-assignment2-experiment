class TimeController {
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
    }

    start() {
        this.startTime = 0;
        this.endTime = 0;

        this.startTime = Date.now();
    }

    stop() {
        this.endTime = Date.now();
    }

    print() {
        return this.endTime - this.startTime;
    }
}