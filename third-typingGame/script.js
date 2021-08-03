// -타이핑 게임
// 로컬 스토리지에 난이도 저장v
// 단어 입력 후 점수 상승
// 난이도에 따라 단어 입력 후 시간 추가하기(난이도 높을
// 수록 적은 시간 추가)
// 타이머 구현
// 설정 버튼으로 난이도창 보이게/안보이게 v
const header = document.querySelector("header"),
  difficulty = header.querySelector("select"),
  typing_pop = document.querySelector(".typing_pop"),
  secondNscore_container = typing_pop.querySelector(".secondNscore_container"),
  scores = secondNscore_container.querySelector(".scores"),
  seconds = secondNscore_container.querySelector(".seconds"),
  score_result = scores.querySelector(".score_result"),
  second_result = seconds.querySelector(".second_result"),
  section = document.querySelector("section"),
  footer = document.querySelector("footer"),
  optionButton = footer.querySelector(".optionButton"),
  word_container = typing_pop.querySelector(".word_container"),
  word = word_container.querySelector(".word"),
  wordInput = document.querySelector("input"),
  reloadBut = document.querySelector(".reloadBut"),
  notice_pop = document.querySelector("notice_pop");
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];
//타이머 time함수로
let presentWord, result, sec, time, setting;
let score = 0;

function addWord() {
  presentWord = words[Math.floor(Math.random() * words.length)];
  word.innerHTML = `${presentWord}`;
  console.log(presentWord);
}

function changeDifficulty(e) {
  const difficultyResult = e.target.value;
  localStorage.setItem("difficulty", difficultyResult);
  clearInterval(timer);

  if (difficultyResult === "easy") {
    timer = setInterval(timerFunction, 1000);

    time = 10;
  } else if (difficultyResult === "medium") {
    timer = setInterval(timerFunction, 700);
    time = 7;
  } else {
    timer = setInterval(timerFunction, 400);
    time = 5;
  }
}
let timer = setInterval(timerFunction, 1000);
function timerFunction() {
  second_result.innerHTML = `${sec}s`;
  sec--;

  checkTime(sec);
}
function showFunction() {
  header.classList.toggle("active");
}
function checkTime(presentSec) {
  if (presentSec < 0) {
    //게임종료
    //typing_pop.style.display = "none";
    //  notice_pop.style.opacity = "1";
    typing_pop.innerHTML = ` <h1>Time ran out</h1>
    <h2>Your final score is ${score}</h2>
    <button onclick="location.reload()"><h3>reload</h3></button>`;

    clearInterval(timer);
  }
}
function plusTime() {
  sec += parseInt(time);
} //시간수정

function init() {
  sec = 10;
  time = 10;
  localStorage.setItem("difficulty", "easy");
  //$("input[type=text]:not([disabled])").first().focus();
}
init();
addWord();

optionButton.addEventListener("click", showFunction);
difficulty.addEventListener("change", changeDifficulty);
wordInput.addEventListener("input", function (e) {
  result = e.target.value;
  // console.log(presentWord);
  if (presentWord === result) {
    //   //시간추가

    score += 1;
    score_result.innerHTML = `${score}`;
    addWord();
    plusTime();
    e.target.value = "";
    //   //단어바꾸기
  }
});
//1. e.target.value="";로하면 입력자체가 안됨
// function init() {
//   addWord();
// }
// init();
// function init() {
//   localStorage.setItem("difficulty", "easy"); //처음 난이도는 easy
//   sec = 10;
//   addWord();
//   plusTime(); //plusTime특징은 계속 남은 시간에 따라 돌고 있는점이다.
// }
// init();
//게임이 시작되자마자 단어가 나오도록 해야함.

//그뭐냐 꼭 단어 까지 포함해서 setinterval 할 필요는 없다.
//시간만 하면 되지.
