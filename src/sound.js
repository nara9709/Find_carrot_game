'use strict';
const audioBgm = new Audio('./audio/bg.mp3');
const audioAlert = new Audio('./audio/alert.wav');
const audioWin = new Audio('./audio/game_win.mp3');
const audioCarrot = new Audio('./audio/carrot_pull.mp3');
const audioBug = new Audio('./audio/bug_pull.mp3');

export function playCarrot() {
  playSound(audioCarrot, 0.7);
}
export function playBug() {
  playSound(audioBug, 0.7);
}
export function playBgm() {
  playSound(audioBgm, 1);
}
export function playWin() {
  playSound(audioWin, 0.7);
}
export function playAlert() {
  playSound(audioAlert, 0.7);
}

export function stopBgm() {
  stopSound(audioBgm);
}

function playSound(sound, volume) {
  sound.currentTime = 0;
  sound.play();
  sound.volume = volume;
}

function stopSound(sound) {
  sound.pause();
}
