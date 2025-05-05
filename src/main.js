import { addExpense, loadExpenses } from "./data";
import "./style.css";
import { clearInputs, hideModal, initUI, renderExpenses } from "./ui";

// console.log(UI);

// *** QUERIES

// **** LISTENERS ****

document.addEventListener("DOMContentLoaded", () => {
  // *** Add expense
  document
    .querySelector(".modal-form > .submit-btn")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const name = document.querySelector("#exp-name").value;
      const amount = document.querySelector("#exp-amount").value;
      const category = document.querySelector("#exp-category").value;
      const date = document.querySelector("#exp-date").value;
      // console.log(name, amount, category, date);
      if (amount > 9999) alert("Amount can't be higher than 9999€");
      if (name && amount && category && date) {
        addExpense(name, amount, category, date);
        clearInputs();
        hideModal();
        renderExpenses();
      } else {
        alert("Please fill with valid inputs");
      }
    });
});

// **** INITIALIZATION ****
loadExpenses();
initUI();
