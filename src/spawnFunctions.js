const tps = 50

const spawnFunctions = {
    random: function(data) {
        const enimies = data.enimies
        const areas = data.areas

        if (enimies.length == 0 || areas.length == 0) {
            return
        }

        const enimie = pickRandomArrayElement(enimies)
        const area = pickRandomArrayElement(areas)

        return spawnEnimie(range(area.minX, area.maxX), range(area.minY, area.maxY), enimie)
    },
    verticalLine: function(data) {
        const spawnCount = data.enimies.reduce((sum, enimie) => { return sum + enimie.count }, 0)
        const height = data.maxY - data.minY
        const step = height/(spawnCount-1)

        if (!Number.isFinite(step)) {
            console.log("Issue Calculating Step")
            console.log("Spawn Count: ")
            console.log(spawnCount)
            console.log("Height: ")
            console.log(height)
            console.log("Step: ")
            console.log(step)
        }

        let spawnEnimieArray = []

        for (let i = 0; i < data.enimies.length; i++) {
            const enimie = data.enimies[i]
            for (let j = 0; j < enimie.count; j++) {
                spawnEnimieArray.push(i)
            }
        }

        shuffleArray(spawnEnimieArray, 1)

        let enimies = []

        for (let i = 0; i < spawnEnimieArray.length; i++) {
            enimies.push(spawnEnimie(data.x, data.minY+step*i, data.enimies[spawnEnimieArray[i]]))
        }

        return enimies
    },
    levelUnlock: function(data) {
        for (let i = 0; i < data.requiredLevelsBeat.length; i++) {
            if (!isLevelBeat(data.requiredLevelsBeat[i])) {
                return
            }
        }

        return spawnEnimie(data.pos.x, data.pos.y, data.enimie)
    }
}

function spawnEnimiesWithFunction(functionName, data) {
    const func = spawnFunctions[functionName]

    if (!func || ! (func instanceof Function)) {
        console.log("Invalid Function")
        console.log(functionName)
        return
    }

    return func(data)
}

function spawnEnimiesPerSecond(tick, spawnsPerSecond, functionName, data) {
    const everyWhatTicks = Math.round(tps/spawnsPerSecond)

    // Note: This gets fairly inacurate at higher numbers
    // Max is obviously 50 spawns per second
    if (tick % everyWhatTicks != 0) {
        return
    }

    return spawnEnimiesWithFunction(functionName, data)
}

function spawnOneTimeSpawns(tick, spawners) {
    if (!spawners) {
        return
    }

    const spawnerThisTick = spawners[tick/tps]
    
    if (!spawnerThisTick) {
        return
    }

    const enimies = []

    for (let i = 0; i < spawnerThisTick.length; i++) {
        const spawner = spawnerThisTick[i]
        const count = (Number.isFinite(spawner.count) ? spawner.count : 1)

        for (let i = 0; i < count; i++) {
            enimies.push(spawnEnimiesWithFunction(spawner.spawnFunction, spawner.spawnData))
        }
    }

    console.log("One Time Spawn")
    console.log(enimies)

    return enimies
}

const enimieTypeInit = {
    goLeft: function(x, y, data) {
        return {
            type: 'goLeft',
            x,
            y,
            speed: range(data.minSpeed, data.maxSpeed),
            effects: data.effects
        }
    },
    wave: function(x, y, data) {
        return {
            type: 'wave',
            x,
            y,
            speed: range(data.minSpeed, data.maxSpeed),
            frequenzyPerSecond: data.frequenzyPerSecond,
            amplitude: range(data.minAmplitude, data.maxAmplitude),
            effects: data.effects
        }
    },
    pattern: function(x, y, data) {
        const enimies = []

        for (let i = 0; i < data.length; i++) {
            const patternMember = data[i]
            enimies.push(spawnEnimie(patternMember.x + x, patternMember.y + y, patternMember.enimie))
        }

        return enimies
    }
}

function spawnEnimie(x, y, enimie) {
    if (!Number.isFinite(x)) {
        console.log("Invalid X Value: " + x)
        x = 200
    }
    if (!Number.isFinite(y)) {
        console.log("Invalid Y Value: " + y)
        y = 650
    }
    if (!enimie.data) {
        console.log("Invalid data")
        console.log(data)
        console.log(enimie)
    }
    return enimieTypeInit[enimie.type](x, y, enimie.data)
}