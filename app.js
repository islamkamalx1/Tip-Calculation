const bill = document.querySelector("#bill");
const tips = document.querySelectorAll(".tip");
const custom = document.querySelector("#custom");
const peopleNum = document.querySelector("#people-num");
const tipPerPerson = document.querySelector("#tip-amount");
const totalPerPerson = document.querySelector("#total");
const reset = document.querySelector(".reset");
const error = document.querySelector(".error");

tips.forEach((tip) => {
  tip.addEventListener("click", clickHandler);
});

bill.addEventListener("input", billHandler);

peopleNum.addEventListener("input", peopleHandler);

custom.addEventListener("input", customTipHandler);

reset.addEventListener("click", resetHandler);

bill.value = "0.0";
peopleNum.value = "1";
tipPerPerson.value = `$${(0.0).toFixed(2)}`;
totalPerPerson.value = `$${(0.0).toFixed(2)}`;

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function billHandler() {
  billValue = parseFloat(bill.value);
  // console.log(billValue);
  calculateTip();
}

function peopleHandler() {
  peopleValue = parseFloat(peopleNum.value);
  // console.log(peopleValue);

  if (peopleValue < 1) {
    error.style.display = 'flex';
    peopleNum.style.border = "2px solid red";
  } else {
    error.style.display = 'none';
    peopleNum.style.border = "none";
    calculateTip();
  }

}

function clickHandler(e) {
  tips.forEach((tip) => {
    tip.classList.remove("active-tip");
    if (e.target.value === tip.value) {
      tip.classList.add("active-tip");
      tipValue = parseFloat(tip.value) / 100;
    }
  });
  // console.log(tipValue);
  calculateTip();
}

function customTipHandler() {
  tipValue = parseFloat(custom.value / 100);
  tips.forEach((tip) => {
    tip.classList.remove("active-tip");
  });
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = billValue / peopleValue + tipAmount;
    tipPerPerson.value = `$${tipAmount.toFixed(2)}`;
    totalPerPerson.value = `$${total.toFixed(2)}`;
  }
}

function resetHandler() {
  bill.value = "0.0";
  billHandler();
  peopleNum.value = "1";
  peopleHandler();
  custom.value = "";
}
