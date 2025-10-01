// Codes
const W = 87;
const A = 65;
const S = 83;
const D = 68;
const J = 74;
const SPACE = 32;
const ESC = 27;

let pressedKeys = {};
window.addEventListener('keyup', function (e) {
    pressedKeys[e.keyCode] = false
})

window.addEventListener('keydown', function (e) {
    pressedKeys[e.keyCode] = true;
})

function getPlayerVector(speed) {
    let vector_x = 0;
    let vector_y = 0;

    if (pressedKeys[W]) {
        vector_y -= 1;
    }
    if (pressedKeys[A]) {
        vector_x -= 1;
    }
    if (pressedKeys[S]) {
        vector_y += 1;
    }
    if (pressedKeys[D]) {
        vector_x += 1;
    }

    return {
        x: vector_x * speed,
        y: vector_y * speed
    }
}

function tryingToExcape() {
    return pressedKeys[ESC]
}

function isPlayerShooting() {
    return pressedKeys[J]
}