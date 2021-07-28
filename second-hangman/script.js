const html = document.querySelector("html"),
  body = document.querySelector("body"),
  answer_container = document.querySelector(".answer_container"),
  notice_wrong = document.querySelector(".notice_wrong"),
  wrong_lettersss = notice_wrong.querySelector(".wrong_lettersss"),
  wrong_title = notice_wrong.querySelector(".wrong_title"),
  figure_parts = document.querySelectorAll(".figure-part"),
  popup_notice = document.querySelector(".popup_notice"),
  popup_notice_container = document.querySelector(".popup_notice_container");
advice = document.querySelector(".advice");
const words = ["application", "programming", "interface", "wizard"];
let randomWord;
let wrong_letter = [];
let playable;
function popupAdvice() {
  advice.style.display = "block";
}
function popup() {
  popup_notice.innerHTML = `<p>Unfortunately you lost. 😕</p>
  <p></p><p>...the word was: ${randomWord}</p>
  <button onclick="init()">Play again</button>`;
  popup_notice_container.style.display = "flex";
}
function draw_hangMan() {
  figure_parts[wrong_letter.length - 1].style.display = "block";
  if (wrong_letter.length === 6) {
    playable = false;
    document.removeEventListener("keyup", inputLetter);
    popup();
  }
} //6번 틀렸으면 popup함수 호출
let answers = [];
let answers_letter = [];
//plusBottom
function inputLetter(e) {
  const plusBottoms = answer_container.querySelectorAll(".plusBottom");
  //모든 plusBottoms를 가져옴.
  let result = e.key;
  let i = 0;
  for (i = 0; i < randomWord.length; i++) {
    if (result === randomWord[i]) {
      plusBottoms[i].innerText = `${result}`; //firstchild 없앰

      answers[i] = true;
      if (!answers.includes(false)) {
        //만약에 answers함수에 모두 true로 저장이 된다면 정답
        popup_notice.innerHTML = `<p>Congratulations! You won! 😃</p>
        <button onclick="init()">Play again</button>`;
        popup_notice_container.style.display = "flex";
        playable = false;
        document.removeEventListener("keyup", inputLetter);
        //정답처리 되었으니 이벤트리스너를 지운다.
      }
    }
  }
  if (answers_letter.includes(result) || wrong_letter.includes(result)) {
    //만약에 정답이든 오답이든 이미 입력이 되었으면 밑에서 문구가 올라온다.
    advice.style.display = "flex";
    advice.classList.add("show");
    setTimeout(() => {
      advice.classList.remove("show");
    }, 1000);
    setTimeout(() => {
      advice.style.display = "none";
    }, 2000);
  }
  if (!randomWord.includes(result) && !wrong_letter.includes(result)) {
    //틀린철자에도 포함이 안되어있고 정답에 없는 철자라면
    wrong_letter.push(result);
    const wrong_le = document.createElement("span");
    if (wrong_letter.length === 1) {
      //처음에 틀렸을 때 Wrong을 띄어줌
      wrong_title.innerText = `Wrong`;
      wrong_le.innerHTML = `${result}`;
    } else if (wrong_letter.length <= 6) {
      wrong_le.innerHTML = `,${result}`;
    }
    wrong_lettersss.appendChild(wrong_le); //틀린 철자를 보여주는 판에 추가
    draw_hangMan();
  }
  for (let j = 0; j < randomWord.length; j++) {
    if (result === randomWord[j]) {
      answers_letter.push(result);
    }
  } //위에 선택지에 includes를 유의하기 위해 맨밑에 answers_letter을 저장한다.
}

function makeWordPane(randomWord) {
  for (let i = 0; i < randomWord.length; i++) {
    const letter = document.createElement("div");
    letter.classList.add("plusBottom"); //판의 classname이 plusBottom임
    letter.innerHTML = `<span> </span>`;
    answer_container.appendChild(letter);
  }
} //랜덤 단어수만큼 칸을 만들어 주는 함수
function init() {
  playable = true;

  answer_container.innerHTML = ``;
  wrong_title.innerHTML = ``;
  wrong_lettersss.innerHTML = ``;

  wrong_letter.splice(0); //오답처리된 철자가 저장된다.
  answers.splice(0); //이배열은 단어길이만큼 false로 저장된 배열이다.
  //입력된 철자가 답이랑 같을 때 false를 true로 바꿔준다.
  answers_letter.splice(0); //정답처리된 철자가 저장된다.

  popup_notice_container.style.display = "none"; //단어를 맞췄을 때 혹은 틀렸을때 나타나는 팝업창인데
  //초기화할 때는 none으로 한다.
  figure_parts.forEach((part) => {
    part.style.display = "none";
  }); //행맨도 안보이도록 초기화한다.

  randomWord = words[Math.floor(Math.random() * words.length)];
  document.addEventListener("keyup", inputLetter);
  //키보드를 입력하게 되면 실행되는 함수 inputLetter
  if (playable) {
    makeWordPane(randomWord);
    for (let i = 0; i < randomWord.length; i++) {
      answers[i] = false;
    }
  }
}
init();
