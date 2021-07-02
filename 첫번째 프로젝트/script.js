const toDoForm = document.querySelector("form"),
  doText = toDoForm.querySelector(".inputText"),
  doAmount = toDoForm.querySelector(".inputAmount"),
  historyLi = document.querySelector(".history"),
  balance = document.querySelector(".balance"),
  expense = document.querySelector(".expense"),
  income = document.querySelector(".income"),
  historyLiList = historyLi.querySelector("div");
const HISTORY = "history";
const BALANCE = "balance";
let history = [];
let total = 0;
let incomeTotal = 0,
  expenseTotal = 0;
function paintHistory(historyObj) {
  const li = document.createElement("li");
  const cancelBtn = document.createElement("div");
  cancelBtn.className = "btn";
  const containerDiv = document.createElement("div");
  const textSpan = document.createElement("div");
  const amountSpan = document.createElement("div");
  textSpan.innerHTML = historyObj.text;
  amountSpan.innerHTML = parseInt(historyObj.amount);
  console.log(textSpan.text, amountSpan.text);
  cancelBtn.innerText = "X";
  containerDiv.appendChild(cancelBtn);

  containerDiv.appendChild(textSpan);
  containerDiv.appendChild(amountSpan);
  li.appendChild(containerDiv);
  historyLi.appendChild(li);
  if (historyObj.amount > 0) {
    incomeTotal += parseInt(historyObj.amount);
    income.innerText = incomeTotal + "₩";
    containerDiv.className = "incomeDiv";
  } else {
    expenseTotal += parseInt(historyObj.amount);
    expense.innerText = -expenseTotal + "₩";
    containerDiv.className = "expenseDiv";
  }
  total += parseInt(historyObj.amount);

  localStorage.setItem(BALANCE, total);
  balance.innerHTML = total + "₩";
  history.push(historyObj);
  saveHistory();
}
function saveHistory() {
  localStorage.setItem(HISTORY, JSON.stringify(history));
}
function handleSubmit(event) {
  event.preventDefault();
  const currentText = doText.value;
  const currentAmount = doAmount.value;
  const historyObj = {
    text: currentText,
    amount: currentAmount,
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
      };
      console.log(his.text, his.amount);
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
