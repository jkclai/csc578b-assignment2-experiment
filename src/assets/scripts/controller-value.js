class ValueController {
    constructor(min, max) {
        this.data = [];

        this.minValue = min;
        this.maxValue = max;
    }

    get() {
        return this.data;
    }

    set(n) {
        this.data = [];
        
        while(this.data.length != n) {
            var temp = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE);
            if(this.data.indexOf(temp) == -1) {
                this.data.push(temp);
            }
        }
    }
}