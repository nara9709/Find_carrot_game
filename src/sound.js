'use strict';
const audioBgm = new Audio('./audio/bg.mp3');
const audioAlert = new Audio('./audio/alert.wav');
const audioWin = new Audio('./audio/game_win.mp3');
const audioCarrot = new Audio('./audio/carrot_pull.mp3');
const audioBug = new Audio('./audio/bug_pull.mp3');

export function playCarrot() {
  playSound(audioCarrot);
}
export function playBug() {
  playSound(audioBug);
}
export function playBgm() {
  playSound(audioBgm);
}
export function playWin() {
  playSound(audioWin);
}
export function playAlert() {
  playSound(audioAlert);
}

export function stopBgm() {
  stopSound(audioBgm);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
