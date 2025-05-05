import flatpickr from "flatpickr";
import { deleteExpense, getExpenses } from "./data";

// *** SELECTORS
const container = document.querySelector(".container");
const showModalBtn = document.querySelector(".add-expense-modal");
const modal = document.querySelector(".add-modal");
const closeModalBtn = document.querySelector(".add-modal .close-modal");
const list = document.querySelector(".expense-list");
const infoModal = document.querySelector(".info-modal");
// console.log(list.innerHTML);

// const submitExpBtn = document.querySelector(".submit-btn");

// *** LISTENERS

// *** Show modal
showModalBtn.addEventListener("click", () => {
  showModal();
});
// *** Hide modal
closeModalBtn.addEventListener("click", () => {
  hideModal();
  clearInputs();
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
  initDatePickers();
  renderExpenses();
}

// *** DISPLAY EXPENSES
export function renderExpenses() {
  list.innerHTML = "";
  const items = getExpenses();
  if (items.length == 0) list.textContent = "No entries yet";
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item", "flex-row");
    listItem.dataset.id = item.id;
    listItem.innerHTML = `
        <span class="li-date">${item.date}</span>
        <span class="li-name">${item.name}</span>
        <span class="li-amount">${item.amount.toFixed(2)}€</span>
        <span class="del-btn">x</span>
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
      } else {
        // *** DELETE LIST ITEM
        const id = target.parentElement.dataset.id;
        deleteExpense(id);
        renderExpenses();
      }
    });
    list.append(listItem);
  });
}

function showModal() {
  modal.style.display = "block";
}

export function hideModal() {
  modal.style.display = "none";
}

export function clearInputs() {
  const inputs = modal.querySelectorAll("input,select");
  inputs.forEach((x) => (x.value = ""));
}

function showInfoModal(id) {
  const items = getExpenses();
  const item = items.filter((item) => item.id === id)[0];
  console.log(item);

  const infoModal = document.createElement("div");
  infoModal.classList.add("info-modal", "flex-center");
  infoModal.innerHTML = `
        <div class="info-title-div">
          <h2>Details</h2>
          <span class="close-info-modal">x</span>
        </div>
        <p>Name: <span>${item.name}</span></p>
        <p>Amount: <span>${item.amount.toFixed(2)} €</span></p>
        <p>Category: <span>${item.category}</span></p>
        <p>Date: <span>${item.date}</span></p>
        <button type="button" class="info-del-btn">Delete Item</button>
  `;
  container.append(infoModal);

  // *** LISTENERS
  infoModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("info-del-btn")) {
      console.log(id);

      deleteExpense(id);
      infoModal.style.display = "none";
      renderExpenses();
    }
    if (e.target.classList.contains("close-info-modal")) {
      infoModal.style.display = "none";
    }
  });

  infoModal.style.display = "flex";
}

// *** Initialize Datepickers
function initDatePickers() {
  flatpickr("#start-date-filter", {
    dateFormat: "d/m/Y",
    onClose: function (selectedDates) {
      if (selectedDates[0]) {
        endDatePicker.set("minDate", selectedDates[0]);
      }
    },
  });
  const endDatePicker = flatpickr("#end-date-filter", {
    dateFormat: "d/m/Y",
  });
  flatpickr("#exp-date", {
    dateFormat: "d/m/Y",
  });
}
