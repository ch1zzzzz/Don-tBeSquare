const defaultRevolverSetting = {
    name: 'Revolver',
    maxAmmo: 6,
    shotsPerSecond: 6,
    ammoRegenPerSecond: 6,
    bulletsPerShot: 1,
    velocity: 20,
    inheritVelocity: true,
    radius: 10,
    pierce: 1,
    spread: 0
}

const shotgunSetting = {
    name: 'Shotgun',
    maxAmmo: 2,
    shotsPerSecond: 2,
    ammoRegenPerSecond: 2,
    bulletsPerShot: 4,
    velocity: 20,
    inheritVelocity: true,
    radius: 10,
    pierce: 0,
    spread: 30
}

const piercerSetting = {
    name: 'Cannon',
    maxAmmo: 1,
    shotsPerSecond: 1,
    ammoRegenPerSecond: 1,
    bulletsPerShot: 1,
    velocity: 20,
    inheritVelocity: true,
    radius: 25,
    pierce: 500,
    spread: 0
}

const bigRevolverSetting = {
    name: 'Big Iron',
    maxAmmo: 6,
    shotsPerSecond: 6,
    ammoRegenPerSecond: 8,
    bulletsPerShot: 1,
    velocity: 20,
    inheritVelocity: true,
    radius: 15,
    pierce: 0,
    spread: 0
}

const bigShotgunSetting = {
    name: 'Triple Barrel Cannon',
    maxAmmo: 3,
    shotsPerSecond: 2,
    ammoRegenPerSecond: 3,
    bulletsPerShot: 3,
    velocity: 20,
    inheritVelocity: true,
    radius: 15,
    pierce: 0,
    spread: 45
}

const bulletSettings = [
    defaultRevolverSetting,
    shotgunSetting,
    piercerSetting,
    bigRevolverSetting,
    bigShotgunSetting
]

let index = 100
function getRandomBulletSettings() {
    if (index >= bulletSettings.length) {
        index = 0
        shuffleArray(bulletSettings, 5)

        while (bulletSettings[0] == defaultRevolverSetting) {
            shuffleArray(bulletSettings, 1)
        }
    }

    const setting = bulletSettings[index]

    index += 1

    if (!setting) {
        console.log("Invalid Bullet Setting")
        console.log(setting)
        console.log(index)
        return getDefaultRevolver()
    }

    return setting
}

function getDefaultRevolver() {
    return defaultRevolverSetting
}

function getPiercer() {
    return piercerSetting
}

function getUpgradedBulletSettings(originalSettings, weaponUpgrades) {
    return {
        name: originalSettings.name,
        maxAmmo: originalSettings.maxAmmo,
        shotsPerSecond: originalSettings.shotsPerSecond + weaponUpgrades.shotsPerSecond,
        ammoRegenPerSecond: originalSettings.ammoRegenPerSecond + weaponUpgrades.ammoRegenPerSecond,
        bulletsPerShot: originalSettings.bulletsPerShot + weaponUpgrades.bulletsPerShot,
        velocity: originalSettings.velocity,
        inheritVelocity: originalSettings.inheritVelocity,
        radius: originalSettings.radius,
        pierce: originalSettings.pierce + weaponUpgrades.pierce,
        spread: (originalSettings.spread + weaponUpgrades.spread) * weaponUpgrades.spreadMultiplier
    }
}