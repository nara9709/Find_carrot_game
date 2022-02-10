'use strict';

const settingBox = document.querySelector('.setting__box');
const popupBoxLose = document.querySelector('.popup__box__lose');
const popupBoxWin = document.querySelector('.popup__box__win');
const popupBoxReply = document.querySelector('.popup__box__reply');
const carrotBox = document.querySelector('.carrot__box');
const timer = document.querySelector('.timer');
const startBtn = document.querySelector('.btn__start');
const stopBtn = document.querySelector('.btn__stop');
const resetBtn = document.querySelector('.btn__reset');
const carrotCount = document.querySelector('.count');

// start game with start button
function onStart() {
  // change start button to stop button
  // Imgs locate randomly
  // Count carrot number
  carrotCount.innerHTML = '8';
  createElement();

  // count carrot number
  // timer start

  startTimer();

  // song play
}

// 2. stop game with stop button

// timer stop
// song stop

startBtn.addEventListener('click', () => {
  popupBoxLose.classList.add('hidden');
  popupBoxWin.classList.add('hidden');
  popupBoxReply.classList.add('hidden');
  startBtn.classList.add('hidden');
  onStart();
});

let timeCountdown;
function startTimer() {
  let sec = 10;
  timeCountdown = setInterval(() => {
    timer.innerHTML = `00 : ${sec}`;
    sec--;

    stopBtn.addEventListener('click', () => {
      startBtn.classList.remove('hidden');
      let pauseTime = Number(sec);
      timer.innerHTML = ` 00 : ${pauseTime}`;
      clearInterval(timeCountdown);

      gameReply();

      // startBtn.addEventListener('click', (pauseTime) => {
      //   startBtn.classList.add('hidden');
      //   sec = pauseTime;
      //   timeCountdown;
      // });
    });

    if (sec === -1) {
      sec = 0;
      timer.innerHTML = `Time over!`;
      gameFail();
    }
  }, 1000);
}

// Create element
function createElement() {
  for (let i = 1; i <= 8; i++) {
    const createCarrot = document.createElement('img');
    createCarrot.setAttribute('src', './img/carrot.png');
    createCarrot.setAttribute('class', 'carrot__img');
    createCarrot.setAttribute('data-value', `${[i]}`);
    createLocaCarrot(createCarrot);
  }

  for (let i = 1; i <= 8; i++) {
    const createBug = document.createElement('img');
    createBug.setAttribute('src', './img/bug.png');
    createBug.setAttribute('class', 'bug__img');
    createLocaBug(createBug);
  }
}

// Make random coordinates with min, max
function randint(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createLocaCarrot(element) {
  element.style.position = 'absolute';
  element.style.left = randint(17, 1513) + 'px';
  element.style.top = randint(641, 800) + 'px';

  carrotBox.appendChild(element);
  // let carrotNumber = 8;
  // carrotCount.innerHTML = `${Number(carrotNumber)}`;

  element.addEventListener('click', (e) => {
    element.classList.add('hidden');
    let counter = parseInt(carrotCount.innerHTML);
    let result = counter - 1;
    carrotCount.innerHTML = result;

    if (result == 0) {
      gameWin();
    }
  });
}

function createLocaBug(element) {
  element.style.position = 'absolute';
  element.style.left = randint(17, 1513) + 'px';
  element.style.top = randint(641, 1037) + 'px';

  carrotBox.appendChild(element);

  element.addEventListener('click', () => {
    gameFail();
  });
}

function gameFail() {
  clearInterval(timeCountdown);
  startBtn.classList.toggle('hidden');
  popupBoxLose.classList.toggle('hidden');

  while (carrotBox.firstChild) {
    carrotBox.firstChild.remove();
  }
}

function gameWin() {
  clearInterval(timeCountdown);
  startBtn.classList.toggle('hidden');
  popupBoxWin.classList.toggle('hidden');

  while (carrotBox.firstChild) {
    carrotBox.firstChild.remove();
  }
}

function gameReply() {
  popupBoxReply.classList.remove('hidden');
  startBtn.classList.remove('hidden');

  while (carrotBox.firstChild) {
    carrotBox.firstChild.remove();
  }
}

// Click reset button
document.body.addEventListener('click', (e) => {
  // console.log()
  if (e.target.className == 'fas fa-undo') {
    startBtn.classList.toggle('hidden');
    popupBoxLose.classList.add('hidden');
    popupBoxWin.classList.add('hidden');
    popupBoxReply.classList.add('hidden');
    onStart();
  }
});

function countCarrot() {
  carrotBox.addEventListener('click', (e) => {
    // if (
    //   e.target.tagName == 'IMG' &&
    //   typeof e.target.dataset.value == 'string'
    // ) {
    // }
  });
}
