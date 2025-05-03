import flatpickr from "flatpickr";

export function initUI() {
  initDatePickers();
}

function initDatePickers() {
  flatpickr("#start-date-filter", {
    dateFormat: "d-m-Y",
    onClose: function (selectedDates) {
      if (selectedDates[0]) {
        endDatePicker.set("minDate", selectedDates[0]);
      }
    },
  });
  const endDatePicker = flatpickr("#end-date-filter", {
    dateFormat: "d-m-Y",
  });
}
