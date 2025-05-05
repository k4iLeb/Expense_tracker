import flatpickr from "flatpickr";
import { deleteExpense, getExpenses } from "./data";

// *** SELECTORS
const container = document.querySelector(".container");
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
// const infoModal = document.querySelector(".info-modal");
// console.log(list.innerHTML);

// const submitExpBtn = document.querySelector(".submit-btn");

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
  // fromDate.value = "";
  // toDate.value = "";
  fromDatePicker.clear();
  toDatePicker.clear();
});

// TODO: WHEN ADD MODAL IS ON, YOU CANT CLICK OUTSIDE
window.addEventListener("click", (e) => {
  // console.log(e.target);
  // if (e.target === modal) {
  //   console.log(e.target);
  // }
});

// *** FUNCTIONS
export function initUI() {
  // initDatePickers();
  renderExpenses();
  // renderSummary();
}

// *** FILTERS

function renderFilterModal(from, to) {
  if (!from && !to) return alert("Please pick 'FROM' and 'TO' dates");
  // *** TEST
  // from = "05/05/2025";
  // to = "06/05/2025";

  let filtArr = sortExpByLatestDate(getExpenses())
    .reverse()
    .filter((x) => {
      return (
        reverseDateString(x.date) >= reverseDateString(from) &&
        reverseDateString(x.date) <= reverseDateString(to)
      );
    });
  console.log(filtArr);

  const filtSum = filtArr.reduce((acc, val) => (acc += val.amount), 0);
  // console.log(filtSum);
  // *** CATEGORIES
  const filtFood = filtArr.reduce(
    (acc, val) => (acc += val.category == "food" ? val.amount : 0),
    0
  );
  // console.log(`filtFood: ${filtFood}`);

  const filtTransport = filtArr.reduce(
    (acc, val) => (acc += val.category == "transport" ? val.amount : 0),
    0
  );
  // console.log(`filtTransport: ${filtTransport}`);
  const filtBills = filtArr.reduce(
    (acc, val) => (acc += val.category == "bills" ? val.amount : 0),
    0
  );
  // console.log(`filtBills: ${filtBills}`);
  const filtEntertainment = filtArr.reduce(
    (acc, val) => (acc += val.category == "entertainment" ? val.amount : 0),
    0
  );
  // console.log(`filtEntertainment: ${filtEntertainment}`);
  const filtOther = filtArr.reduce(
    (acc, val) => (acc += val.category == "other" ? val.amount : 0),
    0
  );
  // console.log(`filtOther: ${filtOther}`);

  // *** CREATE ELEMENTS
  // const filtModal = document.createElement("div");
  // filtModal.classList.add("filter-modal", "flex-center");
  // filtModal.innerHTML = "";
  filtModal.innerHTML = `
        <div class="filter-modal-content flex-center">
          <button class="close-filter-modal">x</button>
          <h2>Expenses</h2>
          <p><span>${from}</span> - <span>${to}</span></p>
          <p>Total amount: <span class="tot-amount">${filtSum.toFixed(
            2
          )} €</span></p>
          <h3>Categories:</h3>
          <div class="filter-cat-div">
            <p>Food: <span>${filtFood.toFixed(2)} €</span></p>
            <p>Transport: <span>${filtTransport.toFixed(2)} €</span></p>
            <p>Bills: <span>${filtBills.toFixed(2)} €</span></p>
            <p>Entertainment: <span>${filtEntertainment.toFixed(2)} €</span></p>
            <p>Other: <span>${filtOther.toFixed(2)} €</span></p>
          </div>
        </div>
  `;
  // *** SHOW MODAL
  filtModal.style.display = "block";
  addBlur();
  // container.append(filtModal);

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
  // console.log(todayTotal);

  // *** CREATE THIS MONTH
  // console.log(`${d}/${m}/${y}`);
  const reg = new RegExp(`${m}/${y}$`);
  const monthTotal = getExpenses()
    .filter((x) => reg.test(x.date))
    .reduce((acc, val) => {
      return (acc += val.amount);
    }, 0);
  // console.log(monthTotal);

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
        // console.log(id);
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
  const item = items.filter((item) => item.id === id)[0];

  // const infoModal = document.createElement("div");
  // infoModal.classList.add("info-modal", "flex-center");
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
  // container.append(infoModal);

  // *** LISTENERS
  infoModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("info-del-btn")) {
      deleteExpense(id);
      renderExpenses();
      removeBlur();
      infoModal.style.display = "none";
    } else if (e.target.classList.contains("close-info-modal")) {
      removeBlur();
      infoModal.innerHTML = "";
      infoModal.style.display = "none";
    }
  });

  infoModal.style.display = "flex";
  addBlur();
}

// *** Initialize Datepickers
// function initDatePickers() {
//   const fromDatePicker = flatpickr("#from-date-filter", {
//     dateFormat: "d/m/Y",
//     onClose: function (selectedDates) {
//       if (selectedDates[0]) {
//         toDatePicker.set("minDate", selectedDates[0]);
//       }
//     },
//   });
//   const toDatePicker = flatpickr("#to-date-filter", {
//     dateFormat: "d/m/Y",
//   });
//   flatpickr("#exp-date", {
//     dateFormat: "d/m/Y",
//   });
// }
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
