class CursorController {
    constructor(id, sampleRate) {
        this.data = [];
        this.tempData = [];

        this.container = d3.select(id);
        this.sampleRate = sampleRate;

        this.interval = null;
    }

    start() {
        this.data = [];

        var _self = this;

        this.container.on("mousemove click", function() {
            _self.tempData = d3.mouse(this);
        });
        this.container.dispatch("click");

        this.interval = setInterval(function() {
            _self.data.push(_self.tempData);
        }, this.sampleRate);
    }

    stop() {
        this.container.on("mousemove click", null);
        clearInterval(this.interval);
    }

    print() {
        return this.data;
    }
}