if(localStorage.getItem("participant_id") == null) {
    localStorage.setItem("participant_id", btoa(Math.random()));
}
const PID = localStorage.getItem("participant_id");

const SCRIPT_ID = "AKfycby7wgfM8YEvQQD2yT9nn2vyeg2rZB-UsdVHRzuWKh1cbhwTftnECcTjFuedFjgAvJfc";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const START_SQUARE_WIDTH = 20;
const START_SQUARE_HEIGHT = 20;

const MIN_VALUE = 0;     // inclusive
const MAX_VALUE = 99;    // inclusive

const BUBBLE_FILL_COLOUR = "white";
const BUBBLE_STROKE_COLOUR = "white";
const BUBBLE_SIZE = {
    3: 50,
    5: 50,
    9: 40,
    25: 30
};

const TEXT_FILL_COLOUR = "black";
const TEXT_STROKE_COLOUR = "black";
const TEXT_POSITION = {
    3: [
        {x: 200, y: 100},
        {x: 100, y: 300},
        {x: 300, y: 300}
    ],
    5: [
        {x: 100, y: 100},
        {x: 300, y: 100},
        {x: 200, y: 200},
        {x: 100, y: 300},
        {x: 300, y: 300}
    ],
    9: [
        {x: 100, y: 100},
        {x: 200, y: 100},
        {x: 300, y: 100},
        {x: 100, y: 200},
        {x: 200, y: 200},
        {x: 300, y: 200},
        {x: 100, y: 300},
        {x: 200, y: 300},
        {x: 300, y: 300}
    ],
    25: [
        {x: 66.6667, y: 66.6667},
        {x: 133.3333, y: 66.6667},
        {x: 200, y: 66.6667},
        {x: 266.6667, y: 66.6667},
        {x: 333.3333, y: 66.6667},
        {x: 66.6667, y: 133.3333},
        {x: 133.3333, y: 133.3333},
        {x: 200, y: 133.3333},
        {x: 266.6667, y: 133.3333},
        {x: 333.3333, y: 133.3333},
        {x: 66.6667, y: 200},
        {x: 133.3333, y: 200},
        {x: 200, y: 200},
        {x: 266.6667, y: 200},
        {x: 333.3333, y: 200},
        {x: 66.6667, y: 266.6667},
        {x: 133.3333, y: 266.6667},
        {x: 200, y: 266.6667},
        {x: 266.6667, y: 266.6667},
        {x: 333.3333, y: 266.6667},
        {x: 66.6667, y: 333.3333},
        {x: 133.3333, y: 333.3333},
        {x: 200, y: 333.3333},
        {x: 266.6667, y: 333.3333},
        {x: 333.3333, y: 333.3333}
    ]
};
const TEXT_SIZE = {
    3: 50,
    5: 50,
    9: 50,
    25: 40
};

const GRAPH_FILL_COLOUR = "gray";
const GRAPH_STROKE_COLOUR = "black";

const N = [3, 5, 9, 25];
const REPETITIONS = 4;