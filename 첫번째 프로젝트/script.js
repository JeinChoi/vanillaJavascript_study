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
  expenseTotal = 0;
function deleteBtn(event) {
  const btn = event.target;
  const btndiv = btn.parentNode;
  const containerli = btndiv.parentNode;
  historyLi.removeChild(containerli);
  //그러면 이 태그의 로컬스토리지 내용에서 id를 가져와서
  //div에 저장되어 있는 데이터를 가져옴. ㅓ떻게?
  //이게 핵심이네. 어떻게 로컬 스토리지를 삭제할 것인지.
  let temp = [];
  const liNum = parseInt(containerli.id);
  const bringAmount = parseInt(history[liNum].amount);

  if (btndiv.className === "incomeDiv") {
    //income 기록 수정
    let presentIncome = parseInt(only_income.textContent);
    presentIncome -= bringAmount;
    only_income.innerText = `${presentIncome}`;
  } else {
    let presentExpense = parseInt(only_expense.textContent);
    presentExpense -= bringAmount;
    only_expense.innerText = `${presentExpense}`;
  }
  total -= bringAmount;
  balance.innerText = `${total}₩`;

  for (let i = 0; i < history.length; i++) {
    if (parseInt(containerli.id) !== history[i].id) {
      temp.push(history[i]);
      console.log(containerli.id, history[i].id);
    }
  }

  //income과 expense 도 바꿔줘야함.
  history = temp;
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
  historyLi.appendChild(li);
  if (historyObj.amount > 0) {
    incomeTotal += parseInt(historyObj.amount);
    only_income.innerHTML = incomeTotal;
    containerDiv.className = "incomeDiv";
  } else {
    expenseTotal += parseInt(historyObj.amount);
    only_expense.innerText = expenseTotal;
    containerDiv.className = "expenseDiv";
  }
  cancelBtn.addEventListener("click", deleteBtn); //localStorage 삭제. 리스트에도 element 삭제
  //btn가 포함되어 있는 리스트의 id를 구해야 하나..>?
  total += parseInt(historyObj.amount);

  localStorage.setItem(BALANCE, total);
  balance.innerHTML = total + "₩";
  history.push(historyObj);
  saveHistory();
}
function saveHistory() {
  localStorage.setItem(HISTORY, JSON.stringify(history));
}
let originNum = 0;
function handleSubmit(event) {
  event.preventDefault();
  const currentText = doText.value;
  const currentAmount = doAmount.value;
  const historyObj = {
    text: currentText,
    amount: currentAmount,
    id: originNum,
  };
  originNum++;
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
      console.log(his.text, his.amount, his.id);
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
