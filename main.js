'use strict';

const settingBox = document.querySelector('.setting__box');
const popupBoxLose = document.querySelector('.popup__box__lose');
const popupBoxWin = document.querySelector('.popup__box__win');
const carrotBox = document.querySelector('.carrot__box');
const timer = document.querySelector('.timer');
const startBtn = document.querySelector('.btn__start');
const stopBtn = document.querySelector('.btn__stop');
const resetBtn = document.querySelector('.btn__reset');

// start game with start button
function onStart() {
  // change start button to stop button

  // Imgs locate randomly
  createElement();

  // timer start

  startTimer();

  // count carrot number
  // song play
}

// 2. stop game with stop button
// timer stop
// song stop

startBtn.addEventListener('click', () => {
  popupBoxLose.classList.add('hidden');
  startBtn.classList.add('hidden');
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
}

// Create element
function createElement() {
  for (let i = 1; i <= 8; i++) {
    const createCarrot = document.createElement('img');
    createCarrot.setAttribute('src', './img/carrot.png');
    createCarrot.setAttribute('class', 'carrot__img');
    createCarrot.setAttribute('data', `${[i]}`);
    createLocaCarrot(createCarrot);
  }

  for (let i = 1; i <= 8; i++) {
    const createBug = document.createElement('img');
    createBug.setAttribute('src', './img/bug.png');
    createBug.setAttribute('class', 'bug__img');
    createBug.setAttribute('data', `${[i]}`);
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

  element.addEventListener('click', () => {
    element.classList.add('hidden');
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

// Click reset button
resetBtn.addEventListener('click', () => {
  // let carrots = document.querySelectorAll('carrot__img');
  // let bugs = document.querySelectorAll('bug__img');
  startBtn.classList.toggle('hidden');
  popupBoxLose.classList.toggle('hidden');
  onStart();
});
