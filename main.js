'use strict';

const settingBox = document.querySelector('.setting__box');
const popupBox = document.querySelector('.popup__box');
const timer = document.querySelector('.timer');
const startBtn = document.querySelector('.btn__start');
const stopBtn = document.querySelector('.btn__stop');
const resetBtn = document.querySelector('.btn__reset');

// start game with start button
function onStart() {
  // change start button to stop button
  startBtn.classList.add('hidden');

  //   const createStopBtn = document.createElement('button');
  //   createStopBtn.setAttribute('class', 'btn btn__stop');
  //   createStopBtn.innerHTML = `<i class="fas fa-stop-circle"></i>`;

  settingBox.insertBefore(createStopBtn, timer);

  // Imgs locate randomly
  //   createLoca();
  // timer start

  startTimer();

  // count carrot number
  // song play
}

// 2. stop game with stop button
// timer stop
// song stop

startBtn.addEventListener('click', () => {
  onStart();
});

let timeCountdown;
function startTimer() {
  let sec = 10;
  timeCountdown = setInterval(() => {
    timer.innerHTML = `00 : ${sec}`;
    sec--;
    if (sec === -1) {
      sec = 0;
      timer.innerHTML = `Time over!`;
      gameFail();
    }
  }, 1000);

  //   timeCountdown = setInterval(() => {
  //     let startSec = 10;
  //     timer.innerHTML = `00: ${startSec}`;
  //     startSec--;
  //   }, 1000);
}

function gameFail() {
  clearInterval(timeCountdown);

  popupBox.classList.toggle('hidden');
}

// Click reset button
resetBtn.addEventListener('click', () => {
  popupBox.classList.toggle('hidden');
  onStart();
});
