function pickRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function shuffleArray(array, iterations) {
    for (let i = 0; i < iterations; i++) {
        for (let j = 0; j < array.length; j++) {
            const randomIndex = Math.floor(Math.random() * array.length)

            const store = array[j]
            array[j] = array[randomIndex]
            array[randomIndex] = store
        }
    }
}

function range(min, max) {
    const l = max - min

    return min + Math.random() * l
}

// Note: none of the vector functions edit the given vectors
// All the vector functions expect a js object with an x and y value
function multiplyVector(vector, number) {
    return {
        x: vector.x * number,
        y: vector.y * number
    }
}

function sumVectors(vectorA, vectorB) {
    return {
        x: vectorA.x + vectorB.x,
        y: vectorA.y + vectorB.y
    }
}

function vectorLength(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
}

function normalizeVector(vector) {
    const l = vectorLength(vector)

    return {
        x: vector.x / l,
        y: vector.y / l
    }
}

function changeVectorLength(vector, length) {
    return multiplyVector(normalizeVector(vector), length)
}

function rotateVectorClockwise90(vector) {
    return {
        x: vector.y,
        y: -vector.x
    }
}

const radPerDeg = Math.PI / 180
function rotateVector(vector, deg) {
    const rad = radPerDeg * deg

    return {
        x: vector.x * Math.cos(rad) - vector.y * Math.sin(rad),
        y: vector.x * Math.sin(rad) + vector.y * Math.cos(rad)
    }
}

function range(min, max) {
    const l = max - min

    return min + Math.random() * l
}

function isBetween(n, min, max) {
    return n > min && n < max
}

function sliceIntersect(a_min, a_max, b_min, b_max) {
    return isBetween(a_min, b_min, b_max) || isBetween(a_max, b_min, b_max) || isBetween(b_min, a_min, a_max)
}

// combines elements of two objects. If both objects have element, it takes the one from ob1
function combineObjects(ob1, ob2) {
    let obj = {}

    const keys1 = Object.keys(ob1)
    const keys2 = Object.keys(ob2)

    for(let i = 0; i < keys2.length; i++) {
        const key = keys2[i]

        obj[key] = ob2[key]
    }

    for (let i = 0; i < keys1.length; i++) {
        const key = keys1[i]

        obj[key] = ob1[key]
    }

    return obj
}