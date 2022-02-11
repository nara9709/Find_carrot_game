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
const audioBgm = new Audio('./sound/bg.mp3');
const audioAlert = new Audio('./sound/alert.wav');
const audioWin = new Audio('./sound/game_win.mp3');
const audioCarrot = new Audio('./sound/carrot_pull.mp3');
const audioBug = new Audio('./sound/bug_pull.mp3');

// Start Game
function onStart() {
  // song play
  audioBgm.currentTime = 0;
  audioBgm.play();

  carrotCount.innerHTML = '8';

  // Set carrots and bugs on random loncation
  createElement();

  //Timer start
  startTimer();
}

// Start button
startBtn.addEventListener('click', () => {
  popupBoxLose.classList.add('hidden');
  popupBoxWin.classList.add('hidden');
  popupBoxReply.classList.add('hidden');
  startBtn.classList.add('hidden');
  onStart();
});

// Timer
let timeCountdown;
function startTimer() {
  let sec = 4;
  timeCountdown = setInterval(() => {
    timer.innerHTML = `00 : ${sec}`;
    sec--;

    stopBtn.addEventListener('click', () => {
      startBtn.classList.remove('hidden');
      let pauseTime = Number(sec);
      timer.innerHTML = ` 00 : ${pauseTime}`;
      clearInterval(timeCountdown);

      gameReply();
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
  element.style.left = randint(17, 1981) + 'px';
  element.style.top = randint(641, 800) + 'px';

  carrotBox.appendChild(element);

  element.addEventListener('click', (e) => {
    audioCarrot.play();
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
    audioBug.play();
    gameFail();
  });
}

// When game is fail
function gameFail() {
  audioBug.play();
  audioBgm.pause();

  clearInterval(timeCountdown);
  startBtn.classList.toggle('hidden');
  popupBoxLose.classList.toggle('hidden');

  while (carrotBox.firstChild) {
    carrotBox.firstChild.remove();
  }
}

// When game is win
function gameWin() {
  audioBgm.pause();
  audioWin.play();

  clearInterval(timeCountdown);
  startBtn.classList.toggle('hidden');
  popupBoxWin.classList.toggle('hidden');

  while (carrotBox.firstChild) {
    carrotBox.firstChild.remove();
  }
}

// When click stop button
function gameReply() {
  audioBgm.pause();
  audioAlert.play();

  popupBoxReply.classList.remove('hidden');
  startBtn.classList.remove('hidden');

  while (carrotBox.firstChild) {
    carrotBox.firstChild.remove();
  }
}

// Reset button
document.body.addEventListener('click', (e) => {
  if (e.target.className == 'fas fa-undo') {
    startBtn.classList.toggle('hidden');
    popupBoxLose.classList.add('hidden');
    popupBoxWin.classList.add('hidden');
    popupBoxReply.classList.add('hidden');
    onStart();
  }
});
