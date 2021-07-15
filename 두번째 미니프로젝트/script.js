const answer_input = document.querySelector(".answer_container");

const word = ["application", "programming", "interface", "wizard"];
//일단 처음에 랜덤으로 단어를 선택해서 그 단어 수만큼 div인지 뭔지를 만든다.
function checkRight(result, ran) {
  let temp = word[ran].toUpperCase();

  let nums = [];
  for (let i = 0; i < word[ran].length; i++) {
    if (result === word[ran][i]) {
      nums.push(i);
    }
  }
  let children = answer_input.childNodes;
  if (nums.length > 0) {
    for (let i = 0; i < nums.length; i++) {
      children[nums[i]].innerHTML = `${result}`;
    }
  } else {
    //틀린 div에 추가
  }
}

function init() {
  //addeventlistener를 input을 통해서 하는게 아니라
  const ran = Math.floor(Math.random() * word.length);
  console.log(word.length);
  console.log(ran);
  let aletter;
  for (let i = 0; i < word[ran].length; i++) {
    console.log(word[ran].length);
    aletter = document.createElement("span");
    aletter.classList.add("letter");
    aletter.innerHTML = `${" "}`;
    //그냥 내가 입력한 걸 굳이 aletter에 addevent할 피룡가없다.
    //입력한걸 알아내서 비교하면 되잖아.
    answer_input.appendChild(aletter);
  }
  document.addEventListener("keyup", function (e) {
    let result = e.key;
    console.log(result);
    checkRight(result, ran);
  });
}
init();
