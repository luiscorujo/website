// Tiny chiptune-style sound effects built on the Web Audio API.
// The AudioContext is created lazily (after a user gesture) and everything
// fails silently if audio is unavailable.

let audioCtx = null;
let enabled = true;

export function setSoundEnabled(value) {
    enabled = value;
}

function getCtx() {
    try {
        if (!audioCtx) {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) return null;
            audioCtx = new Ctx();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    } catch (e) {
        return null;
    }
}

function tone({ f = 440, to, dur = 0.08, type = 'square', vol = 0.03, delay = 0 }) {
    if (!enabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f, t0);
    if (to) {
        osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    }
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
}

export const sfx = {
    blip: () => tone({ f: 1200, dur: 0.03, vol: 0.015 }),
    click: () => tone({ f: 660, dur: 0.05 }),
    switch: () => tone({ f: 520, to: 780, dur: 0.06 }),
    insert: () => {
        tone({ f: 220, dur: 0.1 });
        tone({ f: 330, dur: 0.12, delay: 0.1 });
    },
    // A floppy drive "seeking": a handful of low, grumbly saw tones.
    seek: () => {
        for (let i = 0; i < 7; i++) {
            tone({ f: 90 + Math.random() * 120, dur: 0.08, type: 'sawtooth', vol: 0.02, delay: i * 0.13 });
        }
    },
    ready: () => {
        tone({ f: 880, dur: 0.08 });
        tone({ f: 1320, dur: 0.14, delay: 0.09 });
    },
    eject: () => tone({ f: 440, to: 180, dur: 0.18 }),
    powerOff: () => tone({ f: 400, to: 40, dur: 0.5, type: 'triangle', vol: 0.05 }),
};
