function initGameAudioSystem() {
    const sources = {
        simpleShot: 'audio/SimpleShot1.mp3',
        laserShot: 'audio/LaserShot2.mp3',
        failure: 'audio/Failure Sound.mp3',
        jackpot: 'audio/Jackpot Melody 1.mp3',
        zap: 'audio/Zapping.mp3',
        lightning: 'audio/Lightning.mp3',
        coin: 'audio/Coins 1.mp3',
        bounceSong: 'audio/BounceSong.mp3',
        score1: 'audio/Score 1.mp3',
        score2: 'audio/Score 2.mp3',
        score3: 'audio/Score 3.mp3'
    }

    const presets = {
        'enimie-hit': {
            sample: 'simpleShot',
            options: {
                playbackRate: 3.5,
                gain: 2,
                duration: 0.2,
                filter: {
                    type: 'bandpass',
                    Q: 3,
                    frequency: 7000
                }
            }
        },
        'thunder': {
            sample: 'simpleShot',
            options: {
                playbackRate: 0.5,
                gain: 1.5
            }
        },
        'bossBounce': {
            sample: 'simpleShot',
            options: {
                playbackRate: 0.3,
                gain: 1.5
            }
        },
        'shot': {
            sample: 'laserShot',
            options: {
                playbackRate: 0.45,
                gain: 0.2,
                duration: 0.2,
                filter: {
                    type: 'lowpass',
                    Q: 5,
                    frequency: 5000
                }
            }
        },
        'gameOver': {
            sample: 'failure',
            options: {
                playbackRate: 1
            }
        },
        'victory': {
            sample: 'jackpot',
            options: {
                playbackRate: 1
            }
        },
        'criticalExplode': {
            sample: 'zap',
            options: {
                playbackRate: 1
            }
        },
        'criticalLightning': {
            sample: 'lightning',
            options: {
                playbackRate: 1
            }
        },
        'hurt': {
            sample: 'failure',
            options: {
                playbackRate: 1,
                duration: 0.25,
                gain: 0.7
            }
        },
        'score': {
            sample: 'coin',
            options: {
                playBackRate: 0.5,
                filter: {
                    type: 'lowpass',
                    Q: 1,
                    frequency: 10000
                }
            }
        },
        'bounceSong': {
            sample: 'bounceSong',
            options: {
                playbackRate: 0.9,
                loop: {
                    start: 0,
                    end: 48
                }
            }
        },
        'healthGain': {
            sample: 'score1',
            options: {
                playbackRate: 1
            }
        },
        'healthNotNeeded': {
            sample: 'score2',
            options: {
                playbackRate: 1
            }
        },
        'switchWeapon': {
            sample: 'score3',
            options: {
                playbackRate: 0.5
            }
        }
    }

    return initAudioSystem(sources, presets)
}