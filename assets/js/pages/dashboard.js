import { getGreeting, getFormattedDate } from "../modules/utils/date.js";

const dashboard = () => {
  const dateElement = document.getElementById("date");
  const greetingsElement = document.getElementById("greetings");

  dateElement.textContent = getFormattedDate();
  greetingsElement.textContent = getGreeting();
};

dashboard();
