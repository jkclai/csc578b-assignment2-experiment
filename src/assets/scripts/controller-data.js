class DataController {
    constructor() {
        this.data = [];
        this.tempData = {};
    }

    initEntry() {
        this.tempData = {
            "pid": "",
            "mode": "",
            "n": "",
            "r": "",
            "values": "",
            "selectedValue": "",
            "time": "",
            "cursor": ""
        };
    }

    pushEntry() {
        this.data.push(this.tempData);
    }

    setPid(pid) {
        this.tempData["pid"] = pid;
    }

    setMode(mode) {
        this.tempData["mode"] = mode;
    }

    setN(n) {
        this.tempData["n"] = n;
    }

    setR(r) {
        this.tempData["r"] = r;
    }

    setValues(values) {
        this.tempData["values"] = values;
    }

    setSelectedValue(selectedValue) {
        this.tempData["selectedValue"] = selectedValue;
    }

    setTime(time) {
        this.tempData["time"] = time;
    }

    setCursor(cursor) {
        this.tempData["cursor"] = cursor;
    }

    printKeys() {
        return Object.keys(this.data[0]);
    }

    print() {
        return this.data;
    }
}