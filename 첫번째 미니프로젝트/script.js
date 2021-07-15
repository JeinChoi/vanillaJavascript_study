const toDoForm = document.querySelector("form"),
  doText = toDoForm.querySelector(".inputText"),
  doAmount = toDoForm.querySelector(".inputAmount"),
  historyLi = document.querySelector(".history"),
  balance = document.querySelector(".balance"),
  expense = document.querySelector(".expense"),
  income = document.querySelector(".income"),
  only_expense = expense.querySelector(".only-expense"),
  only_income = income.querySelector(".only-income"),
  historyLiList = historyLi.querySelector("div");
const HISTORY = "history";
const BALANCE = "balance";
let history = [];
let total = 0;
let incomeTotal = 0,
  expenseTotal = 0,
  liNum = 0;
let listArr = [];

function saveHistory() {
  localStorage.setItem(HISTORY, JSON.stringify(history));
} //계속 숫자가 리셋되면 안됨. 처음에 로드할 때 어떡하냐
function deleteBtn(event) {
  const btn = event.target;
  const btndiv = btn.parentNode;
  const containerli = btndiv.parentNode;
  //event가 실행된 div의 parentNode를 구한다.
  //containerli는 li태그이다.
  let temp = [];
  //삭제되지 않은 객체들만 모아둘 리스트를 따로 만든다.
  liNum = parseInt(containerli.id);
  //리스트 뿐만 아니라 history와 localstorage에도 결과를 반영해야하기 때문에
  //containerli태그의 id를 가져온다.
  historyLi.removeChild(containerli);

  const bringAmount = Number(history[liNum].amount);
  //가져온 liNum으로 history에 저장된 가격을 가져온다.
  listArr.splice(liNum, 1);
  //liNum번째의 li태그를 지운다.
  if (btndiv.className === "incomeDiv") {
    //income 기록 수정
    incomeTotal -= bringAmount;
    only_income.innerText = `${incomeTotal}`;
  } else {
    expenseTotal -= bringAmount;
    only_expense.innerText = `${expenseTotal}`;
  } //각 지출과 수입 결과도 수정해준다.

  total -= bringAmount;
  balance.innerText = `${total}₩`;
  // 전체 합계도 수정해준다.
  for (let i = 0; i < history.length; i++) {
    if (parseInt(containerli.id) !== history[i].id) {
      temp.push(history[i]);
    }
  } //filter함수를 풀어서 써봤다..삭제 버튼이 눌린 태그 id와 비교해서
  //같지 않은 element들만 temp에 다시 저장.
  history = temp;

  saveHistory();
  resetNum();
  //중간에 하나가 빠져서 숫자 정렬을 다시 해준다.
}
function resetNum() {
  const loadedHistory = localStorage.getItem(HISTORY);
  let i = 0;
  let reset = [];
  if (loadedHistory !== null) {
    const parsedHistory = JSON.parse(loadedHistory);
    parsedHistory.forEach(function (his) {
      his.id = i;
      listArr[i].id = i;
      i++;
      reset.push(his);
    });
  }
  history = reset;
  saveHistory();
}
function paintHistory(historyObj) {
  const li = document.createElement("li");
  const cancelBtn = document.createElement("div");
  cancelBtn.className = "btn";
  //맨 왼쪽에 있는 버튼
  const containerDiv = document.createElement("div");
  //li태그 바로 안에 있는 div태그
  const textSpan = document.createElement("div");
  const amountSpan = document.createElement("div");
  //containerDiv 안에 들어 있는 text와 amount div태그
  textSpan.innerHTML = historyObj.text;
  amountSpan.innerHTML = parseInt(historyObj.amount);
  cancelBtn.innerText = "X";
  containerDiv.appendChild(cancelBtn);
  containerDiv.appendChild(textSpan);
  containerDiv.appendChild(amountSpan);
  li.appendChild(containerDiv);
  li.id = historyObj.id;
  //중요한건 li의 아이디와 historyobj의 아이드를 같게 저장해야한다는것
  listArr.push(li);
  //또한 listArr를 생성해서 리스트태그 그 자체도 가리키게 해야한다.
  //왜냐면 삭제를 하고 나서 나머지 li태그의 id를 다시 순서대로 (0,1,2..)설정해줘야 하기 때문
  //그래야 localStorage와도 통일이 되고 resetNum함수의 의미가 있다.
  historyLi.appendChild(li);
  if (historyObj.amount > 0) {
    incomeTotal += parseInt(historyObj.amount);
    only_income.innerText = incomeTotal;
    containerDiv.className = "incomeDiv";
  } else {
    expenseTotal += parseInt(historyObj.amount);
    only_expense.innerText = expenseTotal;
    containerDiv.className = "expenseDiv";
  }
  cancelBtn.addEventListener("click", deleteBtn);
  //맨 왼쪽 버튼을 누르면 deleteBtn이 실행된다.
  total += parseInt(historyObj.amount);
  //수입+지출
  balance.innerText = `${total}₩`;
  history.push(historyObj);
  //전체 기록 객체를 모아두는 배열에 추가하고

  saveHistory();
  //localStorage에도 저장
}

function handleSubmit(event) {
  event.preventDefault();
  const currentText = doText.value;
  const currentAmount = doAmount.value;
  const historyObj = {
    text: currentText,
    amount: currentAmount,
    id: history.length,
  };
  paintHistory(historyObj);
  doText.value = "";
  doAmount.value = "";
} //현재 input에 입력된 두가지 값들을 가져와서 객체를 생성하고 li태그로 출력한다.
function loadhistory() {
  const loadedHistory = localStorage.getItem(HISTORY);
  if (loadedHistory !== null) {
    const parsedHistory = JSON.parse(loadedHistory);
    parsedHistory.forEach(function (his) {
      const historyObj = {
        text: his.text,
        amount: his.amount,
        id: history.length,
      };
      paintHistory(historyObj);
    });
  }
} //새로고침 했을때 원래 로컬스토리지에 저장된 데이터들을 가져오는 함수
function init() {
  loadhistory();
  toDoForm.addEventListener("submit", handleSubmit);
  //form 전체에다가 이벤트리스너를 달아놓음.
}
init();
