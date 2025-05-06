import { addExpense, loadExpenses } from "./data";
import "./style.css";
import {
  clearInputs,
  hideModal,
  initUI,
  removeBlur,
  renderExpenses,
} from "./ui";

// *** QUERIES

// **** LISTENERS ****

document.addEventListener("DOMContentLoaded", () => {
  // *** ADD EXPENSE
  document
    .querySelector(".modal-form > .submit-btn")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const name = document.querySelector("#exp-name").value;
      const amount = document.querySelector("#exp-amount").value;
      const category = document.querySelector("#exp-category").value;
      const date = document.querySelector("#exp-date").value;
      // **** INPUT VALIDATION
      if (!/^[\d\w\.\-]{3,15}[\s]?([\w\d\.\-]{1,15})?$/.test(name)) {
        return alert(`
          Please enter a valid name \n
          Allowed characters: Letters, Numbers, ".", "-"`);
      }
      if (amount > 9999) return alert("Amount can't be higher than 9999 €");
      if (!/^[0-9]{1,4}(\.[0-9]{2})?$/.test(String(amount))) {
        return alert(
          "Please enter a valid amount with up to two decimal places"
        );
      }
      if (name && !isNaN(amount) && category && date) {
        addExpense(name, amount, category, date);
        clearInputs();
        hideModal();
        removeBlur();
        renderExpenses();
      } else {
        alert("Please fill with valid inputs");
      }
    });
});

// **** INITIALIZATION ****
loadExpenses();
initUI();
