function createGameInstance(level, context, audioSystem, startSecond = 0, hardcoreMode = false) {
    return {
        tickCounter: startSecond * tps,
        xPos: 150,
        yPos: 225,
        speed: 5,
        health: 100,
        immunityFrames: 0,

        bullets: [],
        bulletAmmoCount: 6,
        bulletSpawnCooldown: 0,
        ticksSincePressedShoot: 0,
        currentBulletSettings: getDefaultRevolver(),
        currentBaseBulletSettings: getDefaultRevolver(),

        screenShakeVerticalTick: 0,
        screenShakeHorizontalTick: 0,
        bossShakeTick: 0,
        bossDyingTick: 0,
        bossHitTick: 0,
        bossColor: effectColorMap['shield3'],

        weaponUpgrades: {
            pierce: 0,
            ammoRegenPerSecond: 0,
            shotsPerSecond: 0,
            spreadMultiplier: 1,
            bulletsPerShot: 0,
            spread: 0
        },

        enimies: [],

        bossDamage: 0,
        bossX: 400,
        bossY: 220,
        currentBossActivity: {
            name: BOSS_ATTACK_IDLE,
            tick: 0
        },
        bossAttackStamina: 0,

        extraEffects: [],

        level,
        currentSpawners: [],

        hardcoreMode,

        context,

        switchLevel: false,

        stars: createTheStars(),

        scoreRewards: [],
        score: 0,

        audioSystem,
        backgroundSong: null
    }
}

function playPreset(instance, name, xOrigin = false) {
    return playPresetFromSystem(instance.audioSystem, name, xOrigin ? { pan: Math.min(650, Math.max(0, (xOrigin - 325) / 325)) } : {})
}

function createTheStars() {
    const stars = []

    for (let i = 0; i < 300; i++) {
        stars.push({
            x: range(0, 595),
            y: range(0, 445),
            blur: range(0, 30),
            color: 'rgb(' + range(240, 255) + ',' + range(240, 255) + ',' + range(240, 255) + ')',
            frequenzy: range(0.1, 0.5)
        })
    }

    return stars
}

function seeTheStars(instance) {
    for (let i = 0; i < instance.stars.length; i++) {
        const star = instance.stars[i]

        instance.context.fillStyle = star.color
        instance.context.shadowColor = star.color
        instance.context.shadowBlur = star.blur

        instance.context.globalAlpha = 0.1 + 0.1 * Math.sin(instance.tickCounter / tps * Math.PI * star.frequenzy)

        instance.context.fillRect(star.x, star.y, 5, 5)
    }

    instance.context.globalAlpha = 1
    instance.context.shadowBlur = 0
}

// returns true if the enimie overlaps with the circle
function enimieCircleOverlap(enimie, x, y, radius) {
    const distX = Math.abs(enimie.x - x)
    const distY = Math.abs(enimie.y - y)

    return distX < radius + 15 && distY < radius + 15
}

function squareCircleOverlap(sqX, sqY, sideL, ciX, ciY, radius) {
    const distX = Math.abs(sqX - ciX)
    const distY = Math.abs(sqY - ciY)

    const maxDist = radius + sideL / 2

    return distX < maxDist && distY < maxDist
}

// returns index of one enimie who overlaps with the bullet and its path or -1
function bulletCollision(instance, bullet) {
    const x = bullet.x
    const y = bullet.y
    const vec = bullet.pierceFreezeTicks > 0 ? { x: 0, y: 0 } : bullet.vec
    const radius = bullet.radius
    const x_end = x + vec.x
    const y_end = y + vec.y

    for (let i = 0; i < instance.enimies.length; i++) {
        const enimie = instance.enimies[i]

        const overlapStart = enimieCircleOverlap(enimie, x, y, radius)
        const overlapEnd = enimieCircleOverlap(enimie, x_end, y_end, radius)

        if (overlapStart || overlapEnd) {
            return i
        }
    }

    return -1
}

function bulletTick(instance) {
    instance.ticksSincePressedShoot += 1
    if (instance.ticksSincePressedShoot > 20) {
        instance.bulletAmmoCount += instance.currentBulletSettings.ammoRegenPerSecond / tps * ((isPlayerShooting()) ? 0 : 1)
        if (instance.bulletAmmoCount > instance.currentBulletSettings.maxAmmo) {
            instance.bulletAmmoCount = instance.currentBulletSettings.maxAmmo
        }
    }

    instance.bulletSpawnCooldown -= instance.currentBulletSettings.shotsPerSecond / tps
    if (instance.bulletSpawnCooldown < 0) {
        instance.bulletSpawnCooldown = 0
    }

    if (isPlayerShooting()) {
        instance.ticksSincePressedShoot = 0

        if (instance.bulletSpawnCooldown == 0 && instance.bulletAmmoCount >= 1) {
            const vector = {
                x: instance.currentBulletSettings.velocity,
                y: getPlayerVector(instance.currentBulletSettings.velocity / 2).y
            }
            const bulletsToShoot = instance.currentBulletSettings.bulletsPerShot

            if (bulletsToShoot == 0) {
                console.log("No Bullets Per Shot")
            } else if (bulletsToShoot == 1) {
                instance.bullets.push(
                    {
                        x: instance.xPos + 10,
                        y: instance.yPos,
                        vec: vector,
                        pierce: instance.currentBulletSettings.pierce,
                        pierceFreezeTicks: 0,
                        radius: instance.currentBulletSettings.radius
                    }
                )

                playPreset(instance, 'shot', instance.xPos)
            } else {
                const degStep = instance.currentBulletSettings.spread / (bulletsToShoot - 1)
                const offset = -instance.currentBulletSettings.spread / 2

                for (let i = 0; i < bulletsToShoot; i++) {
                    instance.bullets.push(
                        {
                            x: instance.xPos + 10,
                            y: instance.yPos,
                            vec: rotateVector(vector, offset + degStep * i),
                            pierce: instance.currentBulletSettings.pierce,
                            pierceFreezeTicks: 0,
                            radius: instance.currentBulletSettings.radius
                        }
                    )

                    playPreset(instance, 'shot', instance.xPos)
                }
            }

            instance.bulletSpawnCooldown = 1
            instance.bulletAmmoCount -= 1
        }
    }

    instance.context.fillStyle = effectColorMap['upgrade']
    instance.context.shadowColor = effectColorMap['upgrade']
    instance.context.shadowBlur = 10

    let bulletsToPop = []
    for (let i = 0; i < instance.bullets.length; i++) {
        const bullet = instance.bullets[i]
        const bulletVector = bullet.vec

        const collisionIndex = bulletCollision(instance, bullet)
        if (collisionIndex >= 0) {
            // Enimie Effects
            doEnimieEffects(instance, instance.enimies[collisionIndex], false)
            playPreset(instance, 'enimie-hit', bullet.x)

            createShrapenal(instance, bullet.x - bullet.radius / 2, bullet.y - bullet.radius / 2, bullet.radius, bullet.radius, 30, effectColorMap['upgrade'], 2)

            if (bullet.pierce) {
                bullet.pierceFreezeTicks = 5
                bullet.pierce -= 1
            } else {
                bulletsToPop.push(i)
            }
        } else if (instance.level.isBossLevel) {
            if (squareCircleOverlap(instance.bossX, instance.bossY, 90, bullet.x, bullet.y, bullet.radius)) {
                if (instance.bossDamage == 0) {
                    instance.bossShakeTick = 40
                }

                instance.bossDamage += 1
                instance.bossHitTick = 5
                bulletsToPop.push(i)
                createShrapenal(instance, bullet.x - bullet.radius / 2, bullet.y - bullet.radius / 2, bullet.radius, bullet.radius, 30, effectColorMap['upgrade'], 3)
            }
        }

        if (bullet.pierceFreezeTicks > 0) {
            bullet.pierceFreezeTicks -= 1
        } else {
            bullet.x += bulletVector.x
            bullet.y += bulletVector.y
        }

        instance.context.beginPath()
        instance.context.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI)
        instance.context.fill()
    }

    bulletsToPop.forEach(index => {
        instance.bullets.splice(index, 1)
    })

    instance.context.shadowBlur = 0

    instance.bullets = instance.bullets.filter(bullet => { return bullet.x < 700; });
}

function updateSpawners(instance) {
    const spawnerData = instance.level[instance.tickCounter / tps]

    if (spawnerData) {
        instance.currentSpawners = spawnerData
        console.log("Updated Spawners")
        console.log(spawnerData)
    }
}

function pushEnimieMaybeArray(instance, maybeArray) {
    if (maybeArray) {
        if (Array.isArray(maybeArray)) {
            for (let j = 0; j < maybeArray.length; j++) {
                pushEnimieMaybeArray(instance, maybeArray[j])
            }
        } else {
            instance.enimies.push(maybeArray)
        }
    }
}

function spawnEnimies(instance) {
    updateSpawners(instance)

    for (let i = 0; i < instance.currentSpawners.length; i++) {
        const spawner = instance.currentSpawners[i]
        const spawnedEnimie = spawnEnimiesPerSecond(instance.tickCounter, spawner.spawnsPerSecond, spawner.spawnFunction, spawner.spawnData)

        pushEnimieMaybeArray(instance, spawnedEnimie)
    }

    if (instance.level.oneTimeSpawns) {
        const oneTimeSpawnedEnimie = spawnOneTimeSpawns(instance.tickCounter, instance.level.oneTimeSpawns)

        if (oneTimeSpawnedEnimie) {
            pushEnimieMaybeArray(instance, oneTimeSpawnedEnimie)
        }
    }
}

const bossDeathColors = [
    '#f9115aff',
    '#380694',
    '#181fab',
    '#54d7ff',
    '#fff7f7',
    '#fcba03'
]

const effectColorMap = {
    hurt: '#f9113fff',
    critical: '#fff9faff',
    shield1: '#11def9ff',
    shield2: '#115af9ff',
    shield3: '#4b11f9ff',
    health: '#34f911ff',
    upgrade: '#f5f911ff',
    explosive: '#f99411ff',
    'switch-weapon': '#f911f9ff'
}

function enimieTick(instance) {
    instance.context.shadowBlur = 10

    for (let i = 0; i < instance.enimies.length; i++) {
        // enimie actions
        const enimie = instance.enimies[i];

        if (enimie.type == 'goLeft' || enimie.type == 'wave') {
            enimie.x -= enimie.speed
        }

        if (enimie.type == 'wave') {
            enimie.y -= enimie.amplitude / 10 * enimie.frequenzyPerSecond * Math.PI * Math.cos(enimie.frequenzyPerSecond * Math.PI * instance.tickCounter / tps)
        }

        if (!enimie.effects) {
            console.log("Enimie does not have effects")
            console.log(enimie)
        }
        // anti overlap
        if (!enimie.effects.includes('critical')) {
            for (let j = 0; j < instance.enimies.length; j++) {
                if (i == j) {
                    continue
                }

                const otherEnimie = instance.enimies[j];

                const pDistX = instance.xPos - otherEnimie.x
                const pDistY = instance.yPos - otherEnimie.y

                if (Math.sqrt(pDistX * pDistX + pDistY * pDistY) < 100) {
                    continue
                }

                const distX = Math.abs(enimie.x - otherEnimie.x)
                const distY = Math.abs(enimie.y - otherEnimie.y)

                if (distY < 30 && distX < 30) {
                    if (enimie.y > otherEnimie.y) {
                        enimie.y += 1
                    } else {
                        enimie.y -= 1
                    }
                }
            }
        }

        // Enimie Drawing
        if (enimie.effects.length > 0) {
            const colorCycle = Math.round(instance.tickCounter / 20)
            const effectIndex = colorCycle % enimie.effects.length
            const effect = enimie.effects[effectIndex]

            if (!Number.isFinite(effectIndex)) {
                console.log("Invalid effect number")
                console.log(effectIndex)
                console.log(colorCycle)
                console.log(enimie.effects)
            }

            const splitEffect = effect.split(':')
            if (splitEffect[0] == 'switch-level') {
                instance.context.fillStyle = effectColorMap['critical']
                instance.context.shadowColor = effectColorMap['critical']

                instance.context.fillRect(enimie.x - 15, enimie.y - 15, 30, 30)

                instance.context.fillStyle = '#303030ff'
                instance.context.font = '30px sans-serif'
                instance.context.fillText(splitEffect[1], enimie.x - 8, enimie.y + 10)
            } else {
                const color = effectColorMap[effect]

                if (!color) {
                    console.log("Invalid color for effect")
                    console.log(color)
                    console.log(effect)
                } else {
                    instance.context.fillStyle = color
                    instance.context.shadowColor = color

                    instance.context.fillRect(enimie.x - 15, enimie.y - 15, 30, 30)
                }
            }
        } else {
            instance.context.fillStyle = '#f23342'
            instance.context.shadowColor = '#f23342'

            instance.context.fillRect(enimie.x - 15, enimie.y - 15, 30, 30)
        }
    }

    instance.context.fillStyle = '#fff7f7'
    instance.context.shadowColor = '#fff7f7'

    // Remove Enimies
    instance.enimies = instance.enimies.filter(enimie => {
        if ((enimie.type == 'goLeft' || enimie.type == 'wave') && ((enimie.x < -10 && enimie.speed > 0) || (enimie.x > 610 && enimie.speed < 0))) {
            if (enimie.effects.includes('critical')) {
                console.log("Critical Breakthrou. Y: " + enimie.y)
                instance.extraEffects.push({
                    type: 'critical-explosion',
                    x: enimie.x,
                    y: enimie.y,
                    tick: 0
                })
                playPreset(instance, 'criticalExplode', enimie.x)
            }

            return false
        }

        if (enimie.dead) {
            return false
        }

        return true
    })

    instance.context.shadowBlur = 0
}

function movePlayer(instance) {
    const vector = getPlayerVector(instance.speed)
    instance.xPos += vector.x
    instance.yPos += vector.y

    if (instance.xPos > 590) {
        instance.xPos = 590;
    }

    if (instance.xPos < 10) {
        instance.xPos = 10;
    }

    if (instance.yPos > 440) {
        instance.yPos = 440;
    }

    if (instance.yPos < 10) {
        instance.yPos = 10;
    }
}

function drawPlayer(instance) {
    if (instance.immunityFrames > 0 && Math.floor(instance.immunityFrames / 10) % 2 == 0) {
        return
    }

    instance.context.fillStyle = effectColorMap['health']
    instance.context.shadowColor = effectColorMap['health']
    instance.context.shadowBlur = 10;
    instance.context.beginPath();
    instance.context.moveTo(instance.xPos - 10, instance.yPos - 10);
    instance.context.lineTo(instance.xPos + 10, instance.yPos);
    instance.context.lineTo(instance.xPos - 10, instance.yPos + 10);
    instance.context.fill();
    instance.context.shadowBlur = 0;
}

function playerHSlice(instance, y) {
    if (y < instance.yPos - 10 || y > instance.yPos + 10) return null

    return {
        min: instance.xPos - 10,
        max: (y > instance.yPos ? -2 * (y - instance.yPos) + instance.xPos + 10 : -2 * (instance.yPos - y) + instance.xPos + 10)
    }
}

function playerVSlice(instance, x) {
    if (x < instance.xPos - 10 || x > instance.xPos + 10) return null

    return {
        min: -0.5 * (x - (instance.xPos - 10)) + instance.yPos,
        max: +0.5 * (x - (instance.xPos - 10)) + instance.yPos
    }
}

function hIntersectsPlayer(instance, y, xMin, xMax) {
    const slice = playerHSlice(instance, y)

    if (slice == null) return false

    return sliceIntersect(xMin, xMax, slice.min, slice.max)
}

function vIntersectsPlayer(instance, x, yMin, y_max) {
    const slice = playerVSlice(instance, x)

    if (slice == null) return false

    return sliceIntersect(yMin, y_max, slice.min, slice.max)
}

function collisions(instance) {
    if (instance.immunityFrames > 0) {
        return
    }

    for (let i = 0; i < instance.enimies.length; i++) {
        const enimie = instance.enimies[i]

        if (
            hIntersectsPlayer(instance, enimie.y - 15, enimie.x - 15, enimie.x + 15) ||
            hIntersectsPlayer(instance, enimie.y + 15, enimie.x - 15, enimie.x + 15) ||
            vIntersectsPlayer(instance, enimie.x - 15, enimie.y - 15, enimie.y + 15) ||
            vIntersectsPlayer(instance, enimie.x + 15, enimie.y - 15, enimie.y + 15)
        ) {
            console.log("Enimie Hit")
            console.log(enimie)
            doEnimieEffects(instance, enimie, true)
            return
        }
    }

    if (instance.level.isBossLevel) {
        if (
            hIntersectsPlayer(instance, instance.bossY - 30, instance.bossX - 30, instance.bossX + 30) ||
            hIntersectsPlayer(instance, instance.bossY + 30, instance.bossX - 30, instance.bossX + 30) ||
            vIntersectsPlayer(instance, instance.bossX - 30, instance.bossY - 30, instance.bossY + 30) ||
            vIntersectsPlayer(instance, instance.bossX + 30, instance.bossY - 30, instance.bossY + 30)
        ) {
            hitPlayer(instance, 50)
        }
    }
}

function doEnimieEffects(instance, enimie, ranInto) {
    /*
    hurt, shield1, shield2, shield3,
    health, upgrade, explosive,
    switch-weapon,
    critical
    */

    if (!enimie || !enimie.effects) {
        console.log("Invalid Enimie")
        console.log(enimie)
        console.log(enimie.effects)
    }

    if (enimie.dead) {
        return
    }

    const effects = enimie.effects

    if (ranInto && (effects.includes('hurt') || effects.includes('explosive') || effects.includes('shield1') || effects.includes('shield2') || effects.includes('shield3'))) {
        hitPlayer(instance, 40)
    }

    if (effects.includes('shield3')) {
        enimie.effects = effects.filter((effect) => {
            return effect != 'shield3'
        })

        instance.extraEffects.push({
            x: enimie.x,
            y: enimie.y,
            type: 'shield-break',
            tick: 0,
            style: effectColorMap['shield3']
        })

        createShrapenal(instance, enimie.x - 15, enimie.y - 15, 30, 30, 30, effectColorMap['shield3'], 2)

        //addScoreReward(instance, 'Break Shield', effectColorMap['shield3'], 500)

        enimie.effects.push('shield2')

        return
    } else if (effects.includes('shield2')) {
        enimie.effects = effects.filter((effect) => {
            return effect != 'shield2'
        })

        instance.extraEffects.push({
            x: enimie.x,
            y: enimie.y,
            type: 'shield-break',
            tick: 0,
            style: effectColorMap['shield2']
        })

        createShrapenal(instance, enimie.x - 15, enimie.y - 15, 30, 30, 30, effectColorMap['shield2'], 2)

        //addScoreReward(instance, 'Break Shield', effectColorMap['shield2'], 500)

        enimie.effects.push('shield1')

        return
    } else if (effects.includes('shield1')) {
        enimie.effects = effects.filter((effect) => {
            return effect != 'shield1'
        })

        instance.extraEffects.push({
            x: enimie.x,
            y: enimie.y,
            type: 'shield-break',
            tick: 0,
            style: effectColorMap['shield1']
        })

        createShrapenal(instance, enimie.x - 15, enimie.y - 15, 30, 30, 30, effectColorMap['shield1'], 2)

        //addScoreReward(instance, 'Break Shield', effectColorMap['shield1'], 500)

        enimie.effects.push('hurt')

        return
    } else {
        if (effects.includes('hurt')) {
            const style = (effects.includes('critical') ? effectColorMap['critical'] : effectColorMap['hurt'])

            instance.extraEffects.push({
                x: enimie.x,
                y: enimie.y,
                type: 'enimie-death',
                tick: 0,
                style
            })

            createShrapenal(instance, enimie.x - 15, enimie.y - 15, 30, 30, 30, style, 2)
        }

        if (effects.includes('critical')) {
            addScoreReward(instance, 'Destroy Critical', effectColorMap['upgrade'], 5000)
        }

        enimie.dead = true
        instance.score += 100
    }

    if (effects.includes('health')) {
        if (instance.health >= 100) {
            addScoreReward(instance, 'Not Needed', effectColorMap['health'], 5000)

            playPreset(instance, 'healthNotNeeded', enimie.x)
        } else {
            playPreset(instance, 'healthGain', enimie.x)
        }

        instance.health += 25

        instance.extraEffects.push({
            x: enimie.x - 20,
            y: enimie.y,
            type: 'text',
            tick: 0,
            text: "+ 25 HP",
            style: effectColorMap.health
        })
    }

    if (effects.includes('upgrade')) {
        const text = upgradeWeapon(instance)

        instance.extraEffects.push({
            x: enimie.x - 20,
            y: enimie.y,
            type: 'text',
            tick: 0,
            text,
            style: '#fff'
        })

        instance.currentBulletSettings = getUpgradedBulletSettings(instance.currentBaseBulletSettings, instance.weaponUpgrades)
    }

    if (effects.includes('explosive')) {
        // Explode
        instance.extraEffects.push({
            x: enimie.x,
            y: enimie.y,
            type: 'explosion',
            tick: 0
        })

        addScoreReward(instance, 'Explosion', effectColorMap['explosive'], 1000)

        playPreset(instance, 'thunder', enimie.x)
    }

    if (effects.includes('switch-weapon') && enimie.x < 600) {
        instance.currentBaseBulletSettings = getRandomBulletSettings()
        instance.currentBulletSettings = getUpgradedBulletSettings(instance.currentBaseBulletSettings, instance.weaponUpgrades)
        instance.bulletAmmoCount = instance.currentBulletSettings.maxAmmo

        playPreset(instance, 'switchWeapon', enimie.x)

        instance.extraEffects.push({
            x: enimie.x - 20,
            y: enimie.y,
            type: 'text',
            tick: 0,
            text: instance.currentBaseBulletSettings.name,
            style: effectColorMap['switch-weapon']
        })
    }

    for (let i = 0; i < effects.length; i++) {
        const effectSplit = effects[i].split(':')
        if (effectSplit[0] == 'switch-level') {
            if (!ranInto) {
                instance.extraEffects.push({
                    x: enimie.x,
                    y: enimie.y,
                    type: 'switch-level',
                    tick: 0,
                    level: effectSplit[1]
                })
            }

            enimie.dead = false
        }
    }
}

function upgradeWeapon(instance) {
    // Upgrades
    // + 1 Pierce
    // + 1 Reload Per Second
    // + 1 Shot Per Second
    // - 20% Spread
    // + 1 Bullet

    const upgrade = Math.min(Math.floor(Math.random() * 5), 4)

    if (upgrade == 0) {
        if (instance.currentBulletSettings.pierce > 100) {
            return upgradeWeapon(instance)
        }

        instance.weaponUpgrades.pierce += 1

        return '+ 1 Pierce'
    } else if (upgrade == 1) {
        instance.weaponUpgrades.ammoRegenPerSecond += 1

        return '+ 1 Reload Speed'
    } else if (upgrade == 2) {
        if (instance.currentBulletSettings.maxAmmo == 1) {
            return upgradeWeapon(instance)
        }

        instance.weaponUpgrades.shotsPerSecond += 1
        instance.weaponUpgrades.spread += 10

        return '+ 1 Firerate'
    } else if (upgrade == 3) {
        if (instance.currentBulletSettings.bulletsPerShot == 1) {
            return upgradeWeapon(instance)
        }

        instance.weaponUpgrades.spreadMultiplier *= 0.8

        return '- 20% Spread'
    } else if (upgrade == 4) {
        instance.weaponUpgrades.bulletsPerShot += 1
        instance.weaponUpgrades.spread += 30

        return '+ 1 Bullet'
    }

    // Longer Visible Text

    return 'Invalid upgrade selected: ' + upgrade
}

const explosionColor = {
    1: '#ffdc1c',
    2: '#fcba03',
    3: '#ed8302'
}

function effectTick(instance) {
    let effectsToPush = []
    instance.extraEffects = instance.extraEffects.filter(extraEffect => {
        extraEffect.tick += 1

        if (extraEffect.type == 'explosion') {
            if (extraEffect.tick >= 9) {
                return false
            }

            const scale = Math.floor(extraEffect.tick / 3) + 1

            const color = explosionColor[scale]

            instance.context.fillStyle = color
            instance.context.shadowColor = color
            instance.context.shadowBlur = 20

            instance.context.beginPath()
            instance.context.arc(extraEffect.x, extraEffect.y, 15 * scale, 0, 2 * Math.PI)
            instance.context.fill()

            for (let j = 0; j < instance.enimies.length; j++) {
                if (enimieCircleOverlap(instance.enimies[j], extraEffect.x, extraEffect.y, 15 * scale)) {
                    doEnimieEffects(instance, instance.enimies[j], false)
                }
            }

            instance.context.shadowBlur = 0
        }

        if (extraEffect.type == 'switch-level') {
            if (extraEffect.tick >= 30) {
                return false
            }

            if (extraEffect.tick > 20) {
                instance.switchLevel = extraEffect.level
            }

            instance.context.beginPath()
            instance.context.moveTo(-300, -300)
            instance.context.lineTo(900, -300)
            instance.context.lineTo(900, 750)
            instance.context.lineTo(-300, 750)
            instance.context.lineTo(-300, -300)
            const radius = 300 - (300 / 20 * extraEffect.tick)

            if (radius <= 0) {
                console.log(extraEffect.tick)
                console.log(radius)
            } else {
                instance.context.arc(instance.xPos, instance.yPos, radius, 0, 2 * Math.PI, true)
            }

            instance.context.fillStyle = '#000'
            instance.context.fill()
        }

        if (extraEffect.type == 'critical-explosion') {
            if (extraEffect.tick > 10) {
                const lightningX = instance.xPos + getPlayerVector(instance.speed).x * 10
                effectsToPush.push({
                    type: 'lightning',
                    x: lightningX,
                    tick: 0
                })
                playPreset(instance, 'criticalLightning', lightningX)
                return false
            }

            const radius = (9 * extraEffect.tick)
            instance.context.fillStyle = 'rgba(255, 255, 255, ' + (90 - radius) / 90 + ')'

            instance.context.beginPath()
            instance.context.arc(extraEffect.x, extraEffect.y, radius, 0, 2 * Math.PI)
            instance.context.fill()
        }

        if (extraEffect.type == 'lightning') {
            if (extraEffect.tick > 14) {
                return false
            }

            if (extraEffect.tick == 7 && instance.immunityFrames <= 0) {
                if (Math.abs(instance.xPos - extraEffect.x) <= 15) {
                    hitPlayer(instance, 50)
                } else {
                    addScoreReward(instance, 'Doge Lightning', effectColorMap['upgrade'], 5000)
                }
            }

            const brightness = Math.round(((7 - Math.abs(extraEffect.tick - 7)) / 7) * 100) / 100

            instance.context.fillStyle = 'rgba(255, 255, 255, ' + brightness + ')'
            instance.context.shadowColor = 'rgba(255, 255, 255, ' + brightness + ')'
            instance.context.shadowBlur = 20

            instance.context.fillRect(extraEffect.x - 15, 0, 30, 450)

            instance.context.shadowBlur = 0
        }

        if (extraEffect.type == 'enimie-death') {
            if (extraEffect.tick > 10) {
                return false
            }

            instance.context.fillStyle = extraEffect.style
            instance.context.globalAlpha = (15 - extraEffect.tick) / 10

            const outsideOffset = extraEffect.tick

            instance.context.fillRect(extraEffect.x - 15 - outsideOffset, extraEffect.y - 15 - outsideOffset, 15, 15)
            instance.context.fillRect(extraEffect.x + outsideOffset, extraEffect.y - 15 - outsideOffset, 15, 15)
            instance.context.fillRect(extraEffect.x - 15 - outsideOffset, extraEffect.y + outsideOffset, 15, 15)
            instance.context.fillRect(extraEffect.x + outsideOffset, extraEffect.y + outsideOffset, 15, 15)

            instance.context.globalAlpha = 1.0
        }

        if (extraEffect.type == 'shield-break') {
            if (extraEffect.tick > 10) {
                return false
            }

            instance.context.fillStyle = extraEffect.style
            instance.context.globalAlpha = (15 - extraEffect.tick) / 10

            instance.context.fillRect(extraEffect.x - 15 - extraEffect.tick, extraEffect.y - 15 - extraEffect.tick, 30 + extraEffect.tick * 2, 30 + extraEffect.tick * 2)

            instance.context.globalAlpha = 1.0
        }

        if (extraEffect.type == 'text') {
            if (extraEffect.tick >= 15) {
                return false
            }

            instance.context.fillStyle = extraEffect.style
            instance.context.font = '20px sans-serif'
            instance.context.fillText(extraEffect.text, extraEffect.x, extraEffect.y - extraEffect.tick)
        }

        if (extraEffect.type == 'shrapenal') {
            if (extraEffect.y >= 450) {
                return false
            }

            extraEffect.x += extraEffect.velX
            extraEffect.y += extraEffect.velY
            extraEffect.velY += 1

            instance.context.fillStyle = extraEffect.style
            instance.context.globalAlpha = (15 - extraEffect.tick) / 10
            instance.context.beginPath()
            instance.context.arc(extraEffect.x, extraEffect.y, 2, 0, 2 * Math.PI)
            instance.context.fill()
            instance.context.globalAlpha = 1.0
        }

        return true
    })

    for (let i = 0; i < effectsToPush.length; i++) {
        instance.extraEffects.push(effectsToPush[i])
    }
}

function hitPlayer(instance, damage) {
    instance.health -= damage
    instance.immunityFrames = 50
    addScoreReward(instance, 'Hurt', effectColorMap['hurt'], -5000)

    if (instance.health >= 0) {
        playPreset(instance, 'hurt', instance.xPos)
    }
}

function createShrapenal(instance, x, y, w, h, vel, style, number) {
    for (let i = 0; i < number; i++) {
        instance.extraEffects.push({
            tick: 0,
            type: 'shrapenal',
            x: range(x, x + w),
            y: range(y, y + h),
            velX: range(-vel, vel),
            velY: range(-vel, vel),
            style
        })
    }
}

const gameState = {
    ongoing: 0,
    lost: -1,
    won: 1
}

function addScoreReward(instance, reason, style, reward) {
    instance.scoreRewards.push({
        text: (reward > 0 ? '+' : '') + reward + ' ' + reason,
        style,
        tick: 0
    })

    instance.score += reward

    if (reward > 0) {
        playPreset(instance, 'score')
    }
}

function scoreRewardTick(instance) {
    instance.context.font = '15px sans-serif'

    for (let i = 0; i < instance.scoreRewards.length; i++) {
        const ofTheTop = instance.scoreRewards.length - 1 - i
        const reward = instance.scoreRewards[ofTheTop]
        reward.tick += 1

        if (reward.tick > 50) {
            continue
        }

        instance.context.globalAlpha = (50 - reward.tick) / 50
        instance.context.fillStyle = reward.style

        instance.context.fillText(reward.text, instance.xPos - 30, instance.yPos - 30 - 20 * ofTheTop)
    }

    instance.context.globalAlpha = 1.0

    instance.scoreRewards = instance.scoreRewards.filter((reward) => {
        return reward.tick <= 50
    })
}

function drawButton(instance, x, y, c) {
    instance.context.fillStyle = '#fff7'
    instance.context.font = '35px monospace'

    instance.context.beginPath()

    instance.context.moveTo(x - 20, y - 20)
    instance.context.lineTo(x + 20, y - 20)
    instance.context.lineTo(x + 20, y + 20)
    instance.context.lineTo(x - 20, y + 20)
    instance.context.lineTo(x - 20, y - 20)

    instance.context.fillText(c, x - 10, y + 11)

    instance.context.fill()
}

function drawTutorial(instance) {
    // 150 225
    drawButton(instance, 150, 150, 'W')
    drawButton(instance, 75, 225, 'A')
    drawButton(instance, 150, 300, 'S')
    drawButton(instance, 225, 225, 'D')

    drawButton(instance, 300, 225, 'J')
}

function bossRelativeHealth(instance) {
    const bossHealth = instance.level.bossHP - instance.bossDamage

    return bossHealth / instance.level.bossHP
}

const BOSS_ATTACK_IDLE = 0
const BOSS_ATTACK_ALIGN_FOR_DASH = 1
const BOSS_ATTACK_ALIGN_FOR_STOMP = 2
const BOSS_ATTACK_ALIGN_FOR_SHOT = 3
const BOSS_ATTACK_SCREAM = 4
const BOSS_ATTACK_SHOOT = 5
const BOSS_ATTACK_DASH = 6
const BOSS_ATTACK_RECOIL = 7

function getBossActivity(instance) {
    if (instance.bossAttackStamina <= 0) {
        instance.bossShakeTick = 70

        return {
            name: BOSS_ATTACK_IDLE,
            tick: 0
        }
    }

    instance.bossAttackStamina -= 1

    const name = pickRandomArrayElement([BOSS_ATTACK_ALIGN_FOR_DASH, BOSS_ATTACK_ALIGN_FOR_STOMP, BOSS_ATTACK_ALIGN_FOR_SHOT])

    if (name == BOSS_ATTACK_ALIGN_FOR_DASH || name == BOSS_ATTACK_ALIGN_FOR_STOMP || name == BOSS_ATTACK_ALIGN_FOR_SHOT) {
        return {
            name
        }
    } else if (name == BOSS_ATTACK_SCREAM) {
        return {
            name,
            tick: 0
        }
    }

    console.log('You forgot an attack, idiot')
    console.log(name)
}

function switchBossActivity(instance) {
    instance.currentBossActivity = getBossActivity(instance)

    console.log("Switched Boss Activity")
    console.log(instance.currentBossActivity)
}

function moveBossTowardsPoint(instance, x, y, speed) {
    const diffX = x - instance.bossX
    const diffY = y - instance.bossY

    const dist = Math.sqrt(diffX * diffX + diffY * diffY)

    if (dist < speed) {
        instance.bossX = x
        instance.bossY = y

        return true
    }

    const diffVector = {
        x: diffX,
        y: diffY
    }

    const moveVector = changeVectorLength(diffVector, speed)

    instance.bossX += moveVector.x
    instance.bossY += moveVector.y

    return false
}

function spawnBounceAlerted(instance) {
    const hp = bossRelativeHealth(instance)
    const spawner = pickRandomDashAwakeSpawner(instance.level, hp)

    if (!spawner) {
        return
    }

    const count = range(spawner.minCount, spawner.maxCount)

    for (let i = 0; i < count; i++) {
        pushEnimieMaybeArray(instance, spawnEnimiesWithFunction(spawner.spawnFunction, spawner.spawnData))
    }
}

function bossBounceOfWalls(instance) {
    if (instance.bossX < 0) {
        instance.bossX = 0

        instance.currentBossActivity = {
            name: BOSS_ATTACK_RECOIL,
            x: -instance.currentBossActivity.x,
            y: instance.currentBossActivity.y
        }

        spawnBounceAlerted(instance)

        instance.screenShakeHorizontalTick = 20

        playPreset(instance, 'bossBounce', instance.bossX)
    }

    if (instance.bossX > 600) {
        instance.bossX = 600

        instance.currentBossActivity = {
            name: BOSS_ATTACK_RECOIL,
            x: -instance.currentBossActivity.x,
            y: instance.currentBossActivity.y
        }

        spawnBounceAlerted(instance)

        instance.screenShakeHorizontalTick = 20

        playPreset(instance, 'bossBounce', instance.bossX)
    }

    if (instance.bossY < 0) {
        instance.bossY = 0

        instance.currentBossActivity = {
            name: BOSS_ATTACK_RECOIL,
            x: instance.currentBossActivity.x,
            y: -instance.currentBossActivity.y
        }

        spawnBounceAlerted(instance)

        instance.screenShakeVerticalTick = 20

        playPreset(instance, 'bossBounce', instance.bossX)
    }

    if (instance.bossY > 450) {
        instance.bossY = 450

        instance.currentBossActivity = {
            name: BOSS_ATTACK_RECOIL,
            x: instance.currentBossActivity.x,
            y: -instance.currentBossActivity.y
        }

        spawnBounceAlerted(instance)

        instance.screenShakeVerticalTick = 20

        playPreset(instance, 'bossBounce', instance.bossX)
    }
}

function pickRandomShootPattern(level, hp) {
    const bossHP = hp * level.bossHP

    const patterns = level.shootSpawns.filter(pattern => {
        return bossHP >= pattern.minHP && bossHP <= pattern.maxHP
    })

    if (patterns.length == 0) {
        return null
    }

    return pickRandomArrayElement(patterns)
}

function pickRandomDashAwakeSpawner(level, hp) {
    const bossHP = hp * level.bossHP

    const patterns = level.dashSpawnPatternSpawns.filter(pattern => {
        return bossHP >= pattern.minHP && bossHP <= pattern.maxHP
    })

    if (patterns.length == 0) {
        return null
    }

    return pickRandomArrayElement(patterns)
}

function bossTick(instance) {
    const activity = instance.currentBossActivity
    const actName = activity.name
    const hp = bossRelativeHealth(instance)

    if (actName == BOSS_ATTACK_IDLE) {
        if (hp < 1) {
            activity.tick += 1

            if (activity.tick > 100) {
                instance.bossAttackStamina = range(2, 2 + (1 - hp) * 4)
                switchBossActivity(instance)
            }
        }
    } else if (actName == BOSS_ATTACK_ALIGN_FOR_DASH) {
        const xAlign = instance.bossX > 300 ? 550 : 50

        if (moveBossTowardsPoint(instance, xAlign, instance.yPos, 4)) {
            instance.currentBossActivity = {
                name: BOSS_ATTACK_DASH,
                x: (instance.bossX > instance.xPos) ? -10 : 10,
                y: 0
            }
        }
    } else if (actName == BOSS_ATTACK_DASH) {
        instance.bossX += activity.x
        instance.bossY += activity.y

        bossBounceOfWalls(instance)
    } else if (actName == BOSS_ATTACK_RECOIL) {
        instance.bossX += activity.x
        instance.bossY += activity.y

        bossBounceOfWalls(instance)

        if (activity.x == 0 && activity.y == 0) {
            switchBossActivity(instance)
        } else {
            if (activity.x != 0) {
                if (activity.x > 0) {
                    activity.x -= 1
                } else {
                    activity.x += 1
                }
            }

            if (activity.y != 0) {
                if (activity.y > 0) {
                    activity.y -= 1
                } else {
                    activity.y += 1
                }
            }
        }
    } else if (actName == BOSS_ATTACK_ALIGN_FOR_STOMP) {
        if (moveBossTowardsPoint(instance, instance.xPos, 50, 7)) {
            instance.currentBossActivity = {
                name: BOSS_ATTACK_DASH,
                x: 0,
                y: 15
            }
        }
    } else if (actName == BOSS_ATTACK_ALIGN_FOR_SHOT) {
        if (moveBossTowardsPoint(instance, 550, instance.yPos, 7)) {
            instance.currentBossActivity = {
                name: BOSS_ATTACK_SHOOT,
                pattern: pickRandomShootPattern(instance.level, hp),
                cooldown: 0,
                shot: 0
            }
        }
    } else if (actName == BOSS_ATTACK_SHOOT) {
        if (!activity.pattern) {
            instance.bossAttackStamina += 1
            switchBossActivity(instance)
            return
        }

        if (activity.pattern.moveWhileShooting) {
            moveBossTowardsPoint(instance, 550, instance.yPos, 7)
        }

        if (activity.cooldown > 0) {
            activity.cooldown -= 1
        } else {
            if (activity.shot >= activity.pattern.count) {
                switchBossActivity(instance)
                return
            }

            instance.enimies.push(spawnEnimie(instance.bossX, instance.bossY, activity.pattern.enimie))

            activity.shot += 1
            activity.cooldown = tps / activity.pattern.spawnsPerSecond
        }
    } else {
        instance.bossAttackStamina += 1
        switchBossActivity(instance)
    }
}

function drawBoss(instance) {
    if (instance.bossHitTick > 0) {
        instance.bossHitTick -= 1
    }

    const bossColor = instance.bossHitTick > 0 ? effectColorMap['shield1'] : effectColorMap['shield3']

    const barColor = effectColorMap['shield1']

    instance.context.fillStyle = bossColor
    instance.context.shadowColor = bossColor
    instance.context.shadowBlur = 15

    if (instance.bossShakeTick > 0) {
        instance.bossShakeTick -= 1
    }

    const shakeOffset = instance.bossShakeTick == 0 ? 0 : 5 * Math.sin(instance.bossShakeTick / 2)

    instance.context.fillRect(instance.bossX - 30 + shakeOffset, instance.bossY - 30, 60, 60)

    instance.context.fillStyle = barColor
    instance.context.shadowColor = barColor
    instance.context.shadowBlur = 10

    instance.context.fillRect(20, 420, 560 * bossRelativeHealth(instance), 20)

    instance.context.shadowBlur = 0
}

function animateBossDeath(instance) {
    instance.bossDyingTick += 1

    instance.health = 100

    if (instance.bossDyingTick < 150) {
        const shakeOffset = 5 * Math.sin(instance.bossDyingTick / 2)

        if (instance.bossDyingTick > 50) {
            if (instance.bossDyingTick % 20 == 0 || (instance.bossDyingTick > 100 && instance.bossDyingTick % 10 == 0)) {
                instance.bossColor = pickRandomArrayElement(bossDeathColors.filter(color => {
                    return color != instance.bossColor
                }))
            }
        }

        const bossColor = instance.bossColor

        instance.context.fillStyle = bossColor
        instance.context.shadowColor = bossColor
        instance.context.shadowBlur = 15

        instance.context.fillRect(instance.bossX - 30 + shakeOffset, instance.bossY - 30, 60, 60)
    } else {
        if (instance.bossDyingTick > 300) {
            return true
        }

        if (instance.bossDyingTick == 150) {
            instance.extraEffects.push({
                type: 'critical-explosion',
                x: instance.bossX,
                y: instance.bossY,
                tick: 0
            })
            playPreset(instance, 'criticalExplode', instance.bossX)
        }
    }

    return false
}

function drawUI(instance) {
    context.fillStyle = effectColorMap['health']
    context.fillRect(10, 10, instance.health, 10)

    context.fillStyle = effectColorMap['upgrade']
    context.fillRect(120, 10, Math.min(Math.floor(instance.bulletAmmoCount) * 100 / instance.currentBulletSettings.maxAmmo, 100), 10)
}

function tick(instance) {
    clearScreen(instance)

    seeTheStars(instance)

    if (instance.level.isTutorial) {
        drawTutorial(instance)
    }

    bulletTick(instance)

    spawnEnimies(instance)
    enimieTick(instance)

    effectTick(instance)

    if (instance.level.isBossLevel) {
        if (bossRelativeHealth(instance) <= 0) {
            if (animateBossDeath(instance)) {
                if (instance.backgroundSong) {
                    instance.backgroundSong.stop(0)
                }
                return gameState.won
            }
        } else {
            bossTick(instance)
            drawBoss(instance)
        }
    }

    movePlayer(instance)
    drawPlayer(instance)

    if (instance.screenShakeHorizontalTick > 0) {
        instance.screenShakeHorizontalTick -= 1
    }

    if (instance.screenShakeVerticalTick > 0) {
        instance.screenShakeVerticalTick -= 1
    }

    scoreRewardTick(instance)

    collisions(instance)

    drawUI(instance)

    if (instance.health >= 100) {
        instance.health = 100
    }

    if (instance.health <= 0 || (tryingToExcape() && !instance.level.isTutorial)) {
        playPreset(instance, 'gameOver')
        if (instance.backgroundSong) {
            instance.backgroundSong.stop(0)
        }
        return gameState.lost
    }

    if (instance.tickCounter >= instance.level.endSeconds * tps) {
        playPreset(instance, 'victory')
        if (instance.backgroundSong) {
            instance.backgroundSong.stop(0)
        }
        return gameState.won
    }

    instance.tickCounter += 1
    instance.immunityFrames -= 1

    if (instance.tickCounter == 10) {
        instance.backgroundSong = playPreset(instance, instance.level.song)
    }

    return gameState.ongoing
}