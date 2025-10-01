// Returns the audio data as a buffer aka. audio data in an array (aka. a sample?)
async function getSampleFromFileData(audioContext, filepath) {
    const response = await fetch(filepath)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
    return audioBuffer
}

// Takes an object of names and 
function loadSamplesFromSources(audioContext, sources) {
    const keys = Object.keys(sources)
    const soundLibrary = {}

    for (let i = 0; i < keys.length; i++) {
        const sampleName = keys[i]
        const path = sources[sampleName]

        getSampleFromFileData(audioContext, path).then((sample) => {
            soundLibrary[sampleName] = sample 
        }).catch((err) => {
            console.error("Failed to load sample")
            console.error(err)
        })
    }

    return soundLibrary
}

// Plays an Audio Buffer. Fire and forget (garbage collecter removes after playing).
// Audio Buffers can be reused
// Returns source
function playSample(audioContext, audioBuffer, options) {
    const sampleSource = new AudioBufferSourceNode(audioContext, {
        buffer: audioBuffer,
        playbackRate: options.playbackRate ? options.playbackRate : 1,
        detune: options.detune ? options.detune : 0,
        loop: options.loop ? true : false,
        loopStart: options.loop ? options.loop.start : 0,
        loopEnd: options.loop ? options.loop.end : 0
    })

    let latestOut = sampleSource

    if (options.filter) {
        const filter = new BiquadFilterNode(audioContext, options.filter)
        latestOut = latestOut.connect(filter)
    }

    if (options.pan) {
        const pan = audioContext.createStereoPanner()
        pan.pan.value = options.pan
        latestOut = latestOut.connect(pan)
    }

    if (options.gain) {
        const gain = audioContext.createGain()
        gain.gain.value = options.gain
        latestOut = latestOut.connect(gain)
    }

    latestOut.connect(audioContext.destination)

    const when = (options.when ? options.when : 0) + audioContext.currentTime
    const offset = options.offset ? options.offset : 0

    sampleSource.start(when, offset)

    if (options.duration) {
        sampleSource.stop(when+options.duration)
    }

    return sampleSource
}

function playSampleFromLibrary(audioContext, library, name, options={playbackRate: 1}) {
    const sample = library[name]

    if (!sample) {
        console.warn("Couldn't find sample " + name)
        return
    }

    return playSample(audioContext, sample, options)
}

function initAudioSystem(sources, presets) {
    const context = new AudioContext()
    
    return {
        context,
        library: loadSamplesFromSources(context, sources),
        presets
    }
}

function playSampleFromSystem(system, name, options) {
    return playSampleFromLibrary(system.context, system.library, name, options)
}

function playPresetFromSystem(system, name, options={}) {
    const preset = system.presets[name]

    if (!preset) {
        console.warn("Couldn't find preset " + name)
        return
    }

    if (!preset.options) {
        console.warn("Preset " + name + " is missing options parameter")
        return
    }

    return playSampleFromSystem(system, preset.sample, combineObjects(options, preset.options))
}

