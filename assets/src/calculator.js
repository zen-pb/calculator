document.getElementById("currentYear").textContent = new Date().getFullYear();

const topScreen = document.querySelector("#topScreen");
const mainScreen = document.querySelector("#mainScreen");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector("#clearBTN");
const backspaceButton = document.querySelector("#backspaceBTN");
const decimalPointButton = document.querySelector("#decimalPointBTN");
const equalsButton = document.querySelector("#equalsBTN");

document.addEventListener("DOMContentLoaded", () => {
  mainScreen.textContent = "0";

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (mainScreen.textContent === "0") {
        mainScreen.textContent = "";
      }

      if (!(mainScreen.textContent.length > 13)) {
        mainScreen.textContent += button.textContent;
      } else {
        alert("You can no longer add more numbers!");
      }
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      topScreen.textContent = button.textContent;
    });
  });

  clearButton.addEventListener("click", () => {
    mainScreen.textContent = "0";
    topScreen.textContent = "";
  });

  backspaceButton.addEventListener("click", () => {
    if (mainScreen.textContent !== "0") {
      mainScreen.textContent = mainScreen.textContent.slice(
        0,
        mainScreen.textContent.length - 1
      );
      if (mainScreen.textContent.length === 0) {
        mainScreen.textContent = "0";
      }
    }
  });

  decimalPointButton.addEventListener("click", () => {
    if (!mainScreen.textContent.includes(".")) {
      if (!(mainScreen.textContent.length > 13)) {
        mainScreen.textContent += ".";
      }
    } else {
      alert("You can no longer add more numbers!");
    }
  });

  equalsButton.addEventListener("click", () => {
    topScreen.textContent = "";
  });
});
