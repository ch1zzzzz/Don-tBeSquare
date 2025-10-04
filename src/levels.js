const levels = {
    1: level1(),
    2: bombIntroLevel(),
    3: barrierIntroLevel(),
    4: waveMadnessLevel(),
    5: spawnPatterns(),
    '!!': bossLevel(),
    'U': upgradeIntroLevel()
}

function getLevel(level) {
    const levelData = levels[level]

    console.log("Level")
    console.log(level)
    console.log(levelData)

    return levels[level]
}

function isLevelBeat(level) {
    return localStorage.getItem("Beaten: " + level)
}

function setLevelBeat(level) {
    if (!isLevelBeat(level)) {
        localStorage.setItem("Beaten: " + level, true)
    } else {
        console.log("Beat Level " + level + " again")
    }
}

function levelSelectLevel() {
    return {
        song: 'criticalExplode',
        imortal: true,
        isTutorial: true,
        oneTimeSpawns: {
            0: [
                {
                    spawnFunction: 'levelUnlock',
                    spawnData: {
                        enimie: {
                            type: 'wave',
                            data: {
                                minAmplitude: 2,
                                maxAmplitude: 3,
                                frequenzyPerSecond: 0.5,
                                minSpeed: 0,
                                maxSpeed: 0,
                                effects: ['switch-level:1']
                            }
                        },
                        pos: {
                            x: 430,
                            y: 125
                        },
                        requiredLevelsBeat: []
                    }
                },
                {
                    spawnFunction: 'levelUnlock',
                    spawnData: {
                        enimie: {
                            type: 'wave',
                            data: {
                                minAmplitude: 2,
                                maxAmplitude: 3,
                                frequenzyPerSecond: 0.5,
                                minSpeed: 0,
                                maxSpeed: 0,
                                effects: ['switch-level:2']
                            }
                        },
                        pos: {
                            x: 430,
                            y: 225
                        },
                        requiredLevelsBeat: ['1']
                    }
                },
                {
                    spawnFunction: 'levelUnlock',
                    spawnData: {
                        enimie: {
                            type: 'wave',
                            data: {
                                minAmplitude: 2,
                                maxAmplitude: 3,
                                frequenzyPerSecond: 0.5,
                                minSpeed: 0,
                                maxSpeed: 0,
                                effects: ['switch-level:3']
                            }
                        },
                        pos: {
                            x: 430,
                            y: 325
                        },
                        requiredLevelsBeat: ['2']
                    }
                },
                {
                    spawnFunction: 'levelUnlock',
                    spawnData: {
                        enimie: {
                            type: 'wave',
                            data: {
                                minAmplitude: 2,
                                maxAmplitude: 3,
                                frequenzyPerSecond: 0.5,
                                minSpeed: 0,
                                maxSpeed: 0,
                                effects: ['switch-level:4']
                            }
                        },
                        pos: {
                            x: 150,
                            y: 75
                        },
                        requiredLevelsBeat: ['3']
                    }
                },
                {
                    spawnFunction: 'levelUnlock',
                    spawnData: {
                        enimie: {
                            type: 'wave',
                            data: {
                                minAmplitude: 2,
                                maxAmplitude: 3,
                                frequenzyPerSecond: 0.5,
                                minSpeed: 0,
                                maxSpeed: 0,
                                effects: ['switch-level:5']
                            }
                        },
                        pos: {
                            x: 150,
                            y: 375
                        },
                        requiredLevelsBeat: ['4']
                    }
                },
                {
                    spawnFunction: 'levelUnlock',
                    spawnData: {
                        enimie: {
                            type: 'wave',
                            data: {
                                minAmplitude: 2,
                                maxAmplitude: 3,
                                frequenzyPerSecond: 0.5,
                                minSpeed: 0,
                                maxSpeed: 0,
                                effects: ['switch-level:!!']
                            }
                        },
                        pos: {
                            x: 330,
                            y: 225
                        },
                        requiredLevelsBeat: ['5'] //['5']
                    }
                },
                {
                    spawnFunction: 'levelUnlock',
                    spawnData: {
                        enimie: {
                            type: 'wave',
                            data: {
                                minAmplitude: 2,
                                maxAmplitude: 3,
                                frequenzyPerSecond: 0.5,
                                minSpeed: 0,
                                maxSpeed: 0,
                                effects: ['switch-level:U']
                            }
                        },
                        pos: {
                            x: 580,
                            y: 430
                        },
                        requiredLevelsBeat: ['!!']
                    }
                }
            ],
        },
        endSeconds: Infinity
    }
}

function level1() {
    return {
        song: 'criticalExplode',
        0: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 5,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 2
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 5,
                                effects: ['hurt', 'critical']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.2
            }
        ],
        10: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 7,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 5
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 6,
                                effects: ['hurt', 'critical']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.2
            }
        ],
        20: [],
        22: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 630,
                    minY: 10,
                    maxY: 440,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 3,
                                effects: ['hurt']
                            },
                            count: 9
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 3,
                                effects: ['hurt', 'critical']
                            },
                            count: 1
                        }
                    ]
                },
                spawnsPerSecond: 0.75
            }
        ],
        32: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 630,
                    minY: 10,
                    maxY: 440,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['hurt']
                            },
                            count: 5
                        }
                    ]
                },
                spawnsPerSecond: 0.75
            }
        ],
        35: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 630,
                    minY: 10,
                    maxY: 440,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['hurt']
                            },
                            count: 5
                        }
                    ]
                },
                spawnsPerSecond: 0.75
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 5,
                                effects: ['hurt', 'critical']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        42: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 630,
                    minY: 10,
                    maxY: 440,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['hurt']
                            },
                            count: 5
                        }
                    ]
                },
                spawnsPerSecond: 0.75
            },
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 630,
                    minY: 63.75,
                    maxY: 386.25,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 8,
                                maxSpeed: 8,
                                effects: ['hurt']
                            },
                            count: 4
                        }
                    ]
                },
                spawnsPerSecond: 0.75
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 5,
                                effects: ['hurt', 'critical']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        52: [],
        54: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 7,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 5
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 6,
                                effects: ['hurt', 'critical']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.2
            }
        ],
        64: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 7,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 7.5
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 6,
                                effects: ['hurt', 'critical']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.2
            }
        ],
        74: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 4,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 10
            }
        ],
        84: [],
        endSeconds: 87
    }
}

function weaponSwitchIntroLevel() {
    return {
        song: 'criticalExplode',
        0: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 7,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 2
            }
        ],
        4: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 7,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 2
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 7,
                                effects: ['switch-weapon']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.2
            }
        ],
        30: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 7,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 5
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 7,
                                effects: ['switch-weapon']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.2
            }
        ],
        40: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 7
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 7,
                                effects: ['switch-weapon']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.2
            }
        ],
        50: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 7
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 7,
                                effects: ['switch-weapon']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.2
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 5,
                                effects: ['hurt', 'critical']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.2
            }
        ],
        endSeconds: 100
    }
}

function bombIntroLevel() {
    return {
        song: 'criticalExplode',
        0: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 630,
                    minY: 80,
                    maxY: 370,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['hurt']
                            },
                            count: 7
                        }
                    ]
                },
                spawnsPerSecond: 0.6
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 15,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 70
                        },
                        {
                            minX: 610, maxX: 670, minY: 380, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 8
            }
        ],
        5: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 630,
                    minY: 80,
                    maxY: 370,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['hurt']
                            },
                            count: 6
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['explosive']
                            },
                            count: 1
                        }
                    ]
                },
                spawnsPerSecond: 0.6
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 15,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 70
                        },
                        {
                            minX: 610, maxX: 670, minY: 380, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 8
            }
        ],
        15: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 630,
                    minY: 80,
                    maxY: 370,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['hurt']
                            },
                            count: 4
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['hurt', 'critical']
                            },
                            count: 1
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['explosive']
                            },
                            count: 2
                        }
                    ]
                },
                spawnsPerSecond: 0.6
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 5,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 70
                        },
                        {
                            minX: 610, maxX: 670, minY: 380, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 4
            }
        ],
        25: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 630,
                    minY: 80,
                    maxY: 370,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['hurt']
                            },
                            count: 2
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['hurt', 'critical']
                            },
                            count: 1
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['explosive']
                            },
                            count: 4
                        }
                    ]
                },
                spawnsPerSecond: 0.6
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 5,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 70
                        },
                        {
                            minX: 610, maxX: 670, minY: 380, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 4
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 5,
                                effects: ['switch-weapon']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 70, maxY: 380
                        }
                    ]
                },
                spawnsPerSecond: 0.2
            }
        ],
        50: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 5,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 70
                        },
                        {
                            minX: 610, maxX: 670, minY: 380, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 4
            }
        ],
        55: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['hurt']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['explosive']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 6
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 5,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 10, maxY: 70
                        },
                        {
                            minX: 610, maxX: 670, minY: 380, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 4
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 5,
                                effects: ['switch-weapon']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 3,
                                maxSpeed: 5,
                                effects: ['critical']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 70, maxY: 380
                        }
                    ]
                },
                spawnsPerSecond: 0.4
            }
        ],
        85: [],
        endSeconds: 90
    }
}

function barrierIntroLevelOld() {
    return {
        song: 'criticalExplode',
        0: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 670,
                    minY: 10,
                    maxY: 440,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 5,
                                effects: ['shield1']
                            },
                            count: 10
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        10: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 670,
                    minY: 10,
                    maxY: 440,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 5,
                                effects: ['shield2']
                            },
                            count: 10
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        15: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 670,
                    minY: 10,
                    maxY: 440,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 5,
                                effects: ['shield3']
                            },
                            count: 10
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        20: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 670,
                    minY: 10,
                    maxY: 440,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 5,
                                effects: ['shield3']
                            },
                            count: 9
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 5,
                                effects: ['switch-weapon']
                            },
                            count: 1
                        }
                    ]
                },
                spawnsPerSecond: 0.4
            }
        ],
        25: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 670,
                    minY: 10,
                    maxY: 440,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 5,
                                effects: ['shield3']
                            },
                            count: 6
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 5,
                                effects: ['explosive']
                            },
                            count: 2
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 5,
                                effects: ['switch-weapon']
                            },
                            count: 1
                        }
                    ]
                },
                spawnsPerSecond: 0.4
            }
        ],
        45: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 670,
                    minY: 10,
                    maxY: 440,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 5,
                                effects: ['shield3']
                            },
                            count: 9
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 5,
                                maxSpeed: 5,
                                effects: ['switch-weapon']
                            },
                            count: 1
                        }
                    ]
                },
                spawnsPerSecond: 0.4
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['hurt']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['explosive']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 670, maxX: 690, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 5
            }
        ],
        55: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 670,
                    minY: 10,
                    maxY: 440,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 6,
                                maxSpeed: 6,
                                effects: ['shield3']
                            },
                            count: 9
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 6,
                                maxSpeed: 6,
                                effects: ['switch-weapon']
                            },
                            count: 1
                        }
                    ]
                },
                spawnsPerSecond: 0.4
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['explosive']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 670, maxX: 690, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 8
            }
        ],
        60: [],
        endSeconds: 65
    }
}

function barrierIntroLevel() {
    return {
        song: 'criticalExplode',
        0: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['shield3']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 70, maxY: 380
                        }
                    ]
                },
                spawnsPerSecond: 4
            }
        ],
        5: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['shield3']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 70, maxY: 380
                        }
                    ]
                },
                spawnsPerSecond: 4
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 6,
                                effects: ['critical', 'hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 70, maxY: 380
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        10: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['shield3']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 70, maxY: 380
                        }
                    ]
                },
                spawnsPerSecond: 4
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 6,
                                effects: ['critical', 'hurt']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 2,
                                maxSpeed: 4,
                                effects: ['critical', 'shield1']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 2,
                                maxSpeed: 4,
                                effects: ['critical', 'shield2']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 2,
                                maxSpeed: 4,
                                effects: ['critical', 'shield3']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 70, maxY: 380
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        15: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['shield3']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 70, maxY: 380
                        }
                    ]
                },
                spawnsPerSecond: 4
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 6,
                                effects: ['critical', 'hurt']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 2,
                                maxSpeed: 4,
                                effects: ['critical', 'shield1']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 2,
                                maxSpeed: 4,
                                effects: ['critical', 'shield2']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 2,
                                maxSpeed: 4,
                                effects: ['critical', 'shield3']
                            }
                        },
                        {
                            type: 'wave',
                            data: {
                                minSpeed: 6,
                                maxSpeed: 6,
                                frequenzyPerSecond: 1,
                                maxAmplitude: 20,
                                minAmplitude: 20,
                                effects: ['health']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 610, maxX: 670, minY: 70, maxY: 380
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        30: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 610,
                    minY: 60,
                    maxY: 390,
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['shield3']
                            },
                            count: 7
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                effects: ['critical', 'hurt']
                            },
                            count: 1
                        }
                    ]
                },
                spawnsPerSecond: 1
            }
        ],
        40: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 610,
                    minY: 100,
                    maxY: 340,
                    enimies: [
                        {
                            type: 'wave',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                frequenzyPerSecond: 0.25,
                                minAmplitude: 20,
                                maxAmplitude: 20,
                                effects: ['shield3']
                            },
                            count: 5
                        },
                        {
                            type: 'wave',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                frequenzyPerSecond: 0.25,
                                minAmplitude: 20,
                                maxAmplitude: 20,
                                effects: ['explosive']
                            },
                            count: 1
                        }
                    ]
                },
                spawnsPerSecond: 1
            }
        ],
        50: [
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 610,
                    minY: 0,
                    maxY: 112.5,
                    enimies: [
                        {
                            type: 'wave',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                frequenzyPerSecond: 1,
                                minAmplitude: 20,
                                maxAmplitude: 20,
                                effects: ['shield3']
                            },
                            count: 4
                        }
                    ]
                },
                spawnsPerSecond: 1
            },
            {
                spawnFunction: 'verticalLine',
                spawnData: {
                    x: 610,
                    minY: 337.5,
                    maxY: 450,
                    enimies: [
                        {
                            type: 'wave',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 4,
                                frequenzyPerSecond: 1,
                                minAmplitude: -20,
                                maxAmplitude: -20,
                                effects: ['shield3']
                            },
                            count: 4
                        }
                    ]
                },
                spawnsPerSecond: 1
            }
        ],
        60: [],
        endSeconds: 65
    }
}

function upgradeIntroLevel() {
    return {
        song: 'criticalExplode',
        0: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['hurt']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 670, maxX: 690, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 4
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['shield3']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 670, maxX: 690, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 1
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['health']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['upgrade']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 670, maxX: 690, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        50: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['shield3']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 670, maxX: 690, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 8
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['health']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['upgrade']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 670, maxX: 690, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        70: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 8,
                                maxSpeed: 16,
                                effects: ['shield3']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 670, maxX: 690, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 8
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['health']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['upgrade']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 670, maxX: 690, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        80: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 8,
                                maxSpeed: 16,
                                effects: ['shield3']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 670, maxX: 690, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 16
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['health']
                            }
                        },
                        {
                            type: 'goLeft',
                            data: {
                                minSpeed: 4,
                                maxSpeed: 8,
                                effects: ['upgrade']
                            }
                        }
                    ],
                    areas: [
                        {
                            minX: 670, maxX: 690, minY: 10, maxY: 440
                        }
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        90: [],
        endSeconds: 95
    }
}

const WAVE = 'wave'
const SHIELD1 = 'shield1'
const SHIELD2 = 'shield2'
const SHIELD3 = 'shield3'
const CRITICAL = 'critical'
const HURT = 'hurt'
const RANDOM = 'random'

function waveMadnessLevel() {
    const rightWall = {
        minX: 610,
        maxX: 660,
        minY: 50,
        maxY: 400
    }

    const leftWall = {
        minX: -50,
        maxX: -10,
        minY: 50,
        maxY: 400
    }

    const waveEnimieUp = {
        type: 'wave',
        data: {
            minAmplitude: 50,
            maxAmplitude: 40,
            frequenzyPerSecond: 0.5,
            minSpeed: 5,
            maxSpeed: 5,
            effects: ['shield3']
        }
    }

    const waveEnimieDown = {
        type: 'wave',
        data: {
            minAmplitude: -50,
            maxAmplitude: -40,
            frequenzyPerSecond: 0.5,
            minSpeed: 5,
            maxSpeed: 5,
            effects: ['shield3']
        }
    }

    const centerRightPoint = {
        minX: 605,
        maxX: 605,
        minY: 225,
        maxY: 225
    }

    const bottomRightPoint = {
        minX: 605,
        maxX: 605,
        minY: 375,
        maxY: 375
    }

    const topRightPoint = {
        minX: 605,
        maxX: 605,
        minY: 75,
        maxY: 75
    }

    const weirdWavePattern = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                waveEnimieUp, waveEnimieDown
            ],
            areas: [
                centerRightPoint
            ]
        },
        spawnsPerSecond: 2
    }

    const waveEnimieUpNarrow = {
        type: 'wave',
        data: {
            minAmplitude: 10,
            maxAmplitude: 10,
            frequenzyPerSecond: 0.5,
            minSpeed: 5,
            maxSpeed: 5,
            effects: ['shield3']
        }
    }

    const waveEnimieDownNarrow = {
        type: 'wave',
        data: {
            minAmplitude: -10,
            maxAmplitude: -10,
            frequenzyPerSecond: 0.5,
            minSpeed: 5,
            maxSpeed: 5,
            effects: ['shield3']
        }
    }

    const weirdWavePatternNarrow = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                waveEnimieUpNarrow, waveEnimieDownNarrow
            ],
            areas: [
                centerRightPoint
            ]
        },
        spawnsPerSecond: 2
    }

    const waveLightningEnimie = {
        type: 'wave',
        data: {
            minAmplitude: 20,
            maxAmplitude: 20,
            frequenzyPerSecond: 0.4,
            minSpeed: 5,
            maxSpeed: 5,
            effects: ['hurt', 'critical']
        }
    }

    const weirdWavePatternWithLightning = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                waveEnimieUp, waveEnimieDown,
                waveEnimieUp, waveEnimieDown,
                waveLightningEnimie
            ],
            areas: [
                centerRightPoint
            ]
        },
        spawnsPerSecond: 2
    }

    const waveEnimieUpRight = {
        type: 'wave',
        data: {
            minAmplitude: 50,
            maxAmplitude: 40,
            frequenzyPerSecond: 0.5,
            minSpeed: -5,
            maxSpeed: -5,
            effects: ['shield3']
        }
    }

    const waveEnimieDownRight = {
        type: 'wave',
        data: {
            minAmplitude: -50,
            maxAmplitude: -40,
            frequenzyPerSecond: 0.5,
            minSpeed: -5,
            maxSpeed: -5,
            effects: ['shield3']
        }
    }

    const centerLeftPoint = {
        minX: -10,
        maxX: -10,
        minY: 225,
        maxY: 225
    }

    const weirdWavePatternRight = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                waveEnimieUpRight, waveEnimieDownRight
            ],
            areas: [
                centerLeftPoint
            ]
        },
        spawnsPerSecond: 2
    }

    const goLeftLightning = {
        type: 'goLeft',
        data: {
            minSpeed: 3,
            maxSpeed: 5,
            effects: ['hurt', 'critical']
        }
    }

    const sporadicLightning = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                goLeftLightning
            ],
            areas: [
                rightWall
            ]
        },
        spawnsPerSecond: 0.75
    }

    const weirdWaveTop = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                waveEnimieUpNarrow
            ],
            areas: [
                topRightPoint
            ]
        },
        spawnsPerSecond: 2
    }

    const weridWaveBottom = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                waveEnimieDownNarrow
            ],
            areas: [
                bottomRightPoint
            ]
        },
        spawnsPerSecond: 2
    }

    return {
        song: 'criticalExplode',
        0: [
            weirdWavePattern
        ],
        2: [
            weirdWavePatternWithLightning
        ],
        10: [
            weirdWavePattern,
            weirdWavePatternRight
        ],
        15: [
            weirdWavePatternRight
        ],
        20: [
            weirdWavePatternRight,
            sporadicLightning
        ],
        25: [
            weirdWavePatternRight
        ],
        30: [
            weirdWavePattern
        ],
        32: [
            weirdWavePatternNarrow
        ],
        35: [
            weirdWaveTop,
            weirdWavePatternNarrow,
            weridWaveBottom
        ],
        40: [
            weirdWaveTop,
            weirdWavePatternNarrow,
            weridWaveBottom
        ],
        45: [],
        47: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        {
                            type: 'wave',
                            data: {
                                minSpeed: -8,
                                maxSpeed: 8,
                                frequenzyPerSecond: 0.5,
                                minAmplitude: -20,
                                maxAmplitude: 20,
                                effects: ['hurt']
                            }
                        },
                        {
                            type: 'wave',
                            data: {
                                minSpeed: -8,
                                maxSpeed: 8,
                                frequenzyPerSecond: 0.5,
                                minAmplitude: -20,
                                maxAmplitude: 20,
                                effects: ['shield3']
                            }
                        }
                    ],
                    areas: [
                        rightWall,
                        leftWall
                    ]
                },
                spawnsPerSecond: 6
            }
        ],
        57: [],
        endSeconds: 60
    }
}

function spawnPatterns() {
    const threeRedPattern = {
        type: 'pattern',
        data: [
            {
                x: 0,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 5,
                        maxSpeed: 5,
                        effects: ['hurt']
                    }
                }
            },
            {
                x: 50,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 5,
                        maxSpeed: 5,
                        effects: ['hurt']
                    }
                }
            },
            {
                x: 100,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 5,
                        maxSpeed: 5,
                        effects: ['hurt']
                    }
                }
            }
        ]
    }

    const twoRedCritical = {
        type: 'pattern',
        data: [
            {
                x: 0,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 5,
                        maxSpeed: 5,
                        effects: ['hurt']
                    }
                }
            },
            {
                x: 50,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 5,
                        maxSpeed: 5,
                        effects: ['hurt']
                    }
                }
            },
            {
                x: 100,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 5,
                        maxSpeed: 5,
                        effects: ['hurt', 'critical']
                    }
                }
            }
        ]
    }

    const twoArmoredCritical = {
        type: 'pattern',
        data: [
            {
                x: 0,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 3,
                        effects: ['shield3']
                    }
                }
            },
            {
                x: 50,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 3,
                        effects: ['shield3']
                    }
                }
            },
            {
                x: 100,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 3,
                        effects: ['hurt', 'critical']
                    }
                }
            }
        ]
    }

    const rightWall = {
        minX: 610,
        maxX: 650,
        minY: 30,
        maxY: 420
    }

    return {
        song: 'criticalExplode',
        oneTimeSpawns: {
            15: [
                {
                    spawnFunction: 'random',
                    spawnData: {
                        enimies: [
                            twoArmoredCritical
                        ],
                        areas: [
                            rightWall
                        ]
                    }
                }
            ],
            22: [
                {
                    spawnFunction: 'verticalLine',
                    spawnData: {
                        enimies: [
                            {
                                count: 3,
                                ...twoArmoredCritical
                            }
                        ],
                        x: 610,
                        minY: 50,
                        maxY: 400
                    }
                }
            ]
        },
        0: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        threeRedPattern
                    ],
                    areas: [
                        rightWall
                    ]
                },
                spawnsPerSecond: 1
            }
        ],
        5: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        twoRedCritical
                    ],
                    areas: [
                        rightWall
                    ]
                },
                spawnsPerSecond: 0.5
            }
        ],
        10: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        twoRedCritical
                    ],
                    areas: [
                        rightWall
                    ]
                },
                spawnsPerSecond: 0.5
            },
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        threeRedPattern
                    ],
                    areas: [
                        rightWall
                    ]
                },
                spawnsPerSecond: 1
            }
        ],
        20: [],
        25: [
            {
                spawnFunction: 'random',
                spawnData: {
                    enimies: [
                        threeRedPattern
                    ],
                    areas: [
                        rightWall
                    ]
                },
                spawnsPerSecond: 2
            }
        ],
        endSeconds: 50
    }
}

// TODO Screenshake

function bossLevel() {
    const normalLeft = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 5,
                        effects: ['hurt']
                    }
                }
            ],
            areas: [
                {
                    minX: 610, maxX: 610, minY: 10, maxY: 440
                }
            ]
        },
        minCount: 1,
        maxCount: 4,
        minHP: 40,
        maxHP: 100
    }

    const normalRight = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                {
                    type: 'goLeft',
                    data: {
                        minSpeed: -3,
                        maxSpeed: -5,
                        effects: ['hurt']
                    }
                }
            ],
            areas: [
                {
                    minX: -10, maxX: -10, minY: 10, maxY: 440
                }
            ]
        },
        minCount: 1,
        maxCount: 4,
        minHP: 20,
        maxHP: 80
    }

    const randomEnimieLeft = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 5,
                        effects: ['hurt']
                    }
                },
                {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 5,
                        effects: ['shield3']
                    }
                },
                {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 5,
                        effects: ['shield2']
                    }
                }
            ],
            areas: [
                {
                    minX: 610, maxX: 610, minY: 10, maxY: 440
                }
            ]
        },
        minCount: 1,
        maxCount: 1,
        minHP: 0,
        maxHP: 100
    }

    const explosionBois = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 5,
                        effects: ['explosive']
                    }
                }
            ],
            areas: [
                {
                    minX: 610, maxX: 610, minY: 10, maxY: 440
                }
            ]
        },
        minCount: 3,
        maxCount: 10,
        minHP: 0,
        maxHP: 50
    }

    const criticalBois = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 5,
                        effects: ['hurt', 'critical']
                    }
                }
            ],
            areas: [
                {
                    minX: 610, maxX: 610, minY: 10, maxY: 440
                }
            ]
        },
        minCount: 1,
        maxCount: 1,
        minHP: 0,
        maxHP: 50
    }

    const twoRedCritical = {
        type: 'pattern',
        data: [
            {
                x: 0,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 5,
                        maxSpeed: 5,
                        effects: ['hurt']
                    }
                }
            },
            {
                x: 50,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 5,
                        maxSpeed: 5,
                        effects: ['hurt']
                    }
                }
            },
            {
                x: 100,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 5,
                        maxSpeed: 5,
                        effects: ['hurt', 'critical']
                    }
                }
            }
        ]
    }

    const twoArmoredCritical = {
        type: 'pattern',
        data: [
            {
                x: 0,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 3,
                        effects: ['shield3']
                    }
                }
            },
            {
                x: 50,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 3,
                        effects: ['shield3']
                    }
                }
            },
            {
                x: 100,
                y: 0,
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 3,
                        maxSpeed: 3,
                        effects: ['hurt', 'critical']
                    }
                }
            }
        ]
    }

    const patternBois = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                twoArmoredCritical,
                twoRedCritical
            ],
            areas: [
                {
                    minX: 610, maxX: 610, minY: 10, maxY: 440
                }
            ]
        },
        minCount: 1,
        maxCount: 1,
        minHP: 0,
        maxHP: 30
    }

    const wavyBois = {
        spawnFunction: 'random',
        spawnData: {
            enimies: [
                {
                    type: 'wave',
                    data: {
                        minSpeed: -5,
                        maxSpeed: -7,
                        frequenzyPerSecond: 1,
                        minAmplitude: 10,
                        maxAmplitude: 10,
                        effects: ['shield3']
                    }
                }
            ],
            areas: [
                {
                    minX: -10, maxX: -10, minY: 10, maxY: 440
                }
            ]
        },
        minCount: 1,
        maxCount: 3,
        minHP: 30,
        maxHP: 70
    }

    return {
        song: 'criticalExplode',
        isBossLevel: true,
        bossHP: 100,
        // Cleanup

        // Fix Wrong Level Name Bug
        // Fix Explosive Chain Reaction

        // End Screen Highscore
        // Menue Better Placement
        // Explosion More Effect
        dashSpawnPatternSpawns: [
            normalLeft,
            normalRight,
            randomEnimieLeft,
            explosionBois,
            wavyBois
        ],
        shootSpawns: [
            {
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 7,
                        maxSpeed: 7,
                        effects: ['hurt']
                    }
                },
                spawnsPerSecond: 2,
                count: 3,
                moveWhileShooting: true,
                minHP: 50,
                maxHP: 100
            },
            {
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 7,
                        maxSpeed: 7,
                        effects: ['hurt']
                    }
                },
                spawnsPerSecond: 5,
                count: 5,
                moveWhileShooting: true,
                minHP: 30,
                maxHP: 70
            },
            {
                enimie: {
                    type: 'goLeft',
                    data: {
                        minSpeed: 15,
                        maxSpeed: 15,
                        effects: ['hurt']
                    }
                },
                spawnsPerSecond: 5,
                count: 5,
                moveWhileShooting: false,
                minHP: 0,
                maxHP: 40
            }
        ],
        endSeconds: Infinity
    }
}