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
  //그러면 이 태그의 로컬스토리지 내용에서 id를 가져와서
  //div에 저장되어 있는 데이터를 가져옴. ㅓ떻게?
  //이게 핵심이네. 어떻게 로컬 스토리지를 삭제할 것인지.
  let temp = [];
  liNum = parseInt(containerli.id);
  historyLi.removeChild(containerli);
  //console.log(containerli);
  //console.log("리스트 id가 왜 없는 번호가 나오냐고 " + liNum);
  const bringAmount = Number(history[liNum].amount);
  //containerli 리스트를 만들어 리스트아이디도 바꿔줘야되네ㅔ..
  listArr.splice(liNum, 1);
  if (btndiv.className === "incomeDiv") {
    //income 기록 수정
    // let presentIncome = parseInt(only_income.textContent);
    incomeTotal -= bringAmount;
    only_income.innerText = `${incomeTotal}`;
  } else {
    //let presentExpense = parseInt(only_expense.textContent);
    expenseTotal -= bringAmount;
    only_expense.innerText = `${expenseTotal}`;
  }
  console.log(
    "지출:",
    only_expense.textContent,
    " 수입:",
    only_income.textContent
  );
  total -= bringAmount;
  balance.innerText = `${total}₩`;

  for (let i = 0; i < history.length; i++) {
    if (parseInt(containerli.id) !== history[i].id) {
      temp.push(history[i]);
      //  console.log(containerli.id, history[i].id);
    }
  }
  //console.log(temp);

  //income과 expense 도 바꿔줘야함.
  history = temp;

  //번호 다시 부여하기.
  saveHistory();
  resetNum();
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
  const containerDiv = document.createElement("div");
  const textSpan = document.createElement("div");
  const amountSpan = document.createElement("div");
  textSpan.innerHTML = historyObj.text;
  amountSpan.innerHTML = parseInt(historyObj.amount);
  cancelBtn.innerText = "X";
  containerDiv.appendChild(cancelBtn);
  containerDiv.appendChild(textSpan);
  containerDiv.appendChild(amountSpan);
  li.appendChild(containerDiv);
  li.id = historyObj.id;
  listArr.push(li);
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
  cancelBtn.addEventListener("click", deleteBtn); //localStorage 삭제. 리스트에도 element 삭제
  //btn가 포함되어 있는 리스트의 id를 구해야 하나..>?
  total += parseInt(historyObj.amount);

  balance.innerText = `${total}₩`;
  history.push(historyObj);

  saveHistory();
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
  //어떻게 하나의 리스트로 묶지.
}
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
}
function init() {
  loadhistory();
  toDoForm.addEventListener("submit", handleSubmit);
  //하나의 리스트로 데이터를 묶어서 추가한다.
  //일단 내용과 현금양을 하나의 리스트로 묶어야 함.
}
init();
//번호 부여를 어떻게 해야할까. 번호부여....
