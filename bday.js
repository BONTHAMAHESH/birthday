const birthdaySong = [
    { freq: 440.00, duration: 0.25 }, // A
    { freq: 440.00, duration: 0.25 }, // A
    { freq: 493.88, duration: 0.55 }, // B
    { freq: 440.00, duration: 0.55 }, // A
    { freq: 659.25, duration: 0.55 }, // E
    { freq: 587.33, duration: 0.95 }, // D

    { freq: 440.00, duration: 0.25 }, // A
    { freq: 440.00, duration: 0.25 }, // A
    { freq: 493.88, duration: 0.55 }, // B
    { freq: 440.00, duration: 0.55 }, // A
    { freq: 783.99, duration: 0.55 }, // High G
    { freq: 659.25, duration: 0.95 }, // E

    { freq: 440.00, duration: 0.25 }, // A
    { freq: 440.00, duration: 0.25 }, // A
    { freq: 880.00, duration: 0.55 }, // High A
    { freq: 659.25, duration: 0.55 }, // E
    { freq: 587.33, duration: 0.55 }, // D
    { freq: 523.25, duration: 0.55 }, // C
    { freq: 493.88, duration: 0.95 }, // B

    { freq: 698.46, duration: 0.25 }, // F#
    { freq: 698.46, duration: 0.25 }, // F#
    { freq: 659.25, duration: 0.55 }, // E
    { freq: 659.25, duration: 0.55 }, // E
    { freq: 659.25, duration: 0.95 }, // E
    { freq: 587.33, duration: 0.55 }, // D
    { freq: 659.25, duration: 0.95 }, // E
    { freq: 523.25, duration: 1.35 }  // C
];

let audioContext;

function playBirthdaySong() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.14, audioContext.currentTime);
    gain.connect(audioContext.destination);

    let currentTime = audioContext.currentTime;
    birthdaySong.forEach(note => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(note.freq, currentTime);
        oscillator.connect(gain);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);
        currentTime += note.duration + 0.04;
    });
}

window.addEventListener('DOMContentLoaded', function() {
    playBirthdaySong();
});

document.addEventListener('click', function onceClickPlay() {
    if (audioContext && audioContext.state === 'suspended') {
        playBirthdaySong();
    }
    document.removeEventListener('click', onceClickPlay);
});
