import flatpickr from "flatpickr";
import { deleteExpense, getExpenses } from "./data";

// *** SELECTORS
const applyFiltBtn = document.querySelector("#apply-filters");
const resetFiltBtn = document.querySelector("#reset-filters");
const fromDate = document.querySelector("#from-date-filter");
const toDate = document.querySelector("#to-date-filter");
const filtModal = document.querySelector(".filter-modal");
const todayTotalSpan = document.querySelector(".today-tot > span");
const thisMonthTotalSpan = document.querySelector(".month-tot > span");
const showModalBtn = document.querySelector(".add-expense-modal");
const modal = document.querySelector(".add-modal");
const closeModalBtn = document.querySelector(".add-modal .close-modal");
const list = document.querySelector(".expense-list");
const infoModal = document.querySelector(".info-modal");
const blurModal = document.querySelector(".blur-modal");

// *** LISTENERS

// *** Show Add modal
showModalBtn.addEventListener("click", () => {
  showModal();
  addBlur();
});
// *** Hide Add modal
closeModalBtn.addEventListener("click", () => {
  hideModal();
  clearInputs();
  removeBlur();
});

// *** APPLY FILTERS
applyFiltBtn.addEventListener("click", () => {
  renderFilterModal(fromDate.value, toDate.value);
});

// *** RESET FILTERS
resetFiltBtn.addEventListener("click", () => {
  fromDatePicker.clear();
  toDatePicker.clear();
});

// *** FUNCTIONS
export function initUI() {
  renderExpenses();
}

// *** FILTERS

function renderFilterModal(from, to) {
  if (!from && !to) return alert("Please pick 'FROM' and 'TO' dates");
  let filtArr = sortExpByLatestDate(getExpenses())
    .reverse()
    .filter((x) => {
      return (
        reverseDateString(x.date) >= reverseDateString(from) &&
        reverseDateString(x.date) <= reverseDateString(to)
      );
    });

  // *** IF NO EXPENSES DURING SELECTED PERIOD
  if (!filtArr.length) {
    filtModal.innerHTML = `
        <div class="filter-modal-content flex-center">
          <button class="close-filter-modal">x</button>
          <h2>Expenses</h2>
          <p>from <span>${from}</span> to <span>${to}</span></p>
          <h3>No expenses during this period!</h3>
        </div>
  `;
  } else {
    // *** Total expenses
    const filtSum = filtArr.reduce((acc, val) => (acc += val.amount), 0);
    // *** CATEGORIES
    const filtFood = filtArr.reduce(
      (acc, val) => (acc += val.category == "food" ? val.amount : 0),
      0
    );

    const filtTransport = filtArr.reduce(
      (acc, val) => (acc += val.category == "transport" ? val.amount : 0),
      0
    );
    const filtBills = filtArr.reduce(
      (acc, val) => (acc += val.category == "bills" ? val.amount : 0),
      0
    );
    const filtEntertainment = filtArr.reduce(
      (acc, val) => (acc += val.category == "entertainment" ? val.amount : 0),
      0
    );
    const filtOther = filtArr.reduce(
      (acc, val) => (acc += val.category == "other" ? val.amount : 0),
      0
    );

    // *** CREATE ELEMENTS
    filtModal.innerHTML = `
          <div class="filter-modal-content flex-center">
            <button class="close-filter-modal">x</button>
            <h2>Expenses</h2>
            <p>from <span>${from}</span> to <span>${to}</span></p>
            <p>Total amount: <span class="tot-amount">${filtSum.toFixed(
              2
            )} €</span></p>
            <h3>Categories:</h3>
            <div class="filter-cat-div">
              <p>Food: <span>${filtFood.toFixed(2)} €</span></p>
              <p>Transport: <span>${filtTransport.toFixed(2)} €</span></p>
              <p>Bills: <span>${filtBills.toFixed(2)} €</span></p>
              <p>Entertainment: <span>${filtEntertainment.toFixed(
                2
              )} €</span></p>
              <p>Other: <span>${filtOther.toFixed(2)} €</span></p>
            </div>
          </div>
    `;
  }
  // *** SHOW MODAL
  filtModal.style.display = "block";
  addBlur();

  // *** CLOSE MODAL LISTENER
  const closeFiltModal = document.querySelector(".close-filter-modal");
  closeFiltModal.addEventListener("click", () => {
    filtModal.innerHTML = "";
    filtModal.style.display = "none";
    removeBlur();
  });
}

// *** SUMMARY

function renderSummary() {
  // *** CREATE DATE
  const today = new Date();
  const d =
    today.getDate() < 10 ? "0" + `${today.getDate()}` : String(today.getDate());
  const m =
    today.getMonth() + 1 < 10
      ? "0" + `${today.getMonth() + 1}`
      : String(today.getMonth() + 1);
  const y = today.getFullYear();

  // *** CREATE TODAY
  const todayTotal = getExpenses()
    .filter((x) => x.date == `${d}/${m}/${y}`)
    .reduce((acc, val) => {
      return (acc += val.amount);
    }, 0);

  // *** CREATE THIS MONTH
  const reg = new RegExp(`${m}/${y}$`);
  const monthTotal = getExpenses()
    .filter((x) => reg.test(x.date))
    .reduce((acc, val) => {
      return (acc += val.amount);
    }, 0);

  // *** RENDER SUMMARY
  todayTotalSpan.textContent = `${todayTotal} €`;
  thisMonthTotalSpan.textContent = `${monthTotal} €`;
}

// *** DISPLAY EXPENSES
export function renderExpenses() {
  list.innerHTML = "";
  const items = getExpenses();
  if (items.length == 0) list.textContent = "No entries yet";
  // *** SORT BY LATEST DATE
  sortExpByLatestDate(items);

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item", "flex-row");
    listItem.dataset.id = item.id;
    listItem.innerHTML = `
        <span class="li-date">${item.date}</span>
        <span class="li-name">${item.name}</span>
        <span class="li-amount">${item.amount.toFixed(2)}€</span>
        <button class="del-btn">x</button>
      `;
    // *** LIST ITEM LISTENERS
    listItem.addEventListener("click", (e) => {
      const target = e.target;
      if (!target.classList.contains("del-btn")) {
        // *** SHOW LIST ITEM DETAILS
        const id = target.dataset.id
          ? target.dataset.id
          : target.parentElement.dataset.id;
        showInfoModal(id);
        addBlur();
      } else {
        // *** DELETE LIST ITEM
        const id = target.parentElement.dataset.id;
        deleteExpense(id);
        renderExpenses();
      }
    });
    list.append(listItem);
  });
  renderSummary();
}

// *** SHOW ADD MODAL
function showModal() {
  modal.style.display = "block";
}

// *** HIDE ADD MODAL
export function hideModal() {
  modal.style.display = "none";
}

// *** CLEAR INPUTS
export function clearInputs() {
  const inputs = modal.querySelectorAll("input,select");
  inputs.forEach((x) => (x.value = ""));
}

// *** EFFECTS

// *** BLUR MODAL
function addBlur() {
  blurModal.style.display = "flex";
}

export function removeBlur() {
  blurModal.style.display = "none";
}

// *** MANIPULATE EXPENSES ARRAY
function sortExpByLatestDate(arr) {
  return arr.sort((a, b) => {
    return reverseDateString(b.date) - reverseDateString(a.date);
  });
}

// *** REVERSE DATE STRING FOR COMPARISONS
function reverseDateString(date) {
  return date.split("/").reverse().join("");
}

// *** SHOW EXPENSE INFO MODAL
function showInfoModal(id) {
  const items = getExpenses();
  const item = items.find((item) => item.id === id);

  if (!item) {
    console.error("Item not found for ID:", id);
    return;
  }

  infoModal.innerHTML = `
  <div class="info-modal-content flex-center">
  <h2>Details</h2>
  <button class="close-info-modal">x</button>
  <p>Name: <span>${item.name}</span></p>
  <p>Amount: <span>${item.amount.toFixed(2)} €</span></p>
  <p>Category: <span>${
    item.category[0].toUpperCase() + item.category.slice(1)
  }</span></p>
  <p>Date: <span>${item.date}</span></p>
  <button type="button" class="info-del-btn">Delete Item</button>
  </div>
  `;

  // *** BUG SQUASHED!
  // infoModal.addEventListener("click", (e) => {
  //   if (e.target.classList.contains("info-del-btn")) {
  //     deleteExpense(id);
  //     renderExpenses();
  //     removeBlur();
  //     console.log("delete", id);
  //     infoModal.style.display = "none";
  //   } else if (e.target.classList.contains("close-info-modal")) {
  //     removeBlur();
  //     console.log("x", id);

  //     infoModal.innerHTML = "";
  //     infoModal.style.display = "none";
  //   }
  // });

  const delBtn = infoModal.querySelector(".info-del-btn");
  delBtn.addEventListener("click", () => {
    deleteExpense(id);
    renderExpenses();
    removeBlur();
    infoModal.style.display = "none";
  });

  const closeBtn = infoModal.querySelector(".close-info-modal");
  closeBtn.addEventListener("click", () => {
    removeBlur();
    infoModal.innerHTML = "";
    infoModal.style.display = "none";
  });

  infoModal.style.display = "flex";
  addBlur();
}

// *** DATE PICKERS
const fromDatePicker = flatpickr("#from-date-filter", {
  dateFormat: "d/m/Y",
  onClose: function (selectedDates) {
    if (selectedDates[0]) {
      toDatePicker.set("minDate", selectedDates[0]);
    }
  },
});
const toDatePicker = flatpickr("#to-date-filter", {
  dateFormat: "d/m/Y",
});

const addModalExcDate = flatpickr("#exp-date", {
  dateFormat: "d/m/Y",
});
