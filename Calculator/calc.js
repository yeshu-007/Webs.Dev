
const display = document.getElementById("display");
const buttons = document.querySelectorAll("#buttons button");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let currentInput = "";

buttons.forEach(button => {
  const value = button.getAttribute("data-value");

  if (value) {
    button.addEventListener("click", () => {
      currentInput += value;
      display.value = currentInput;
    });
  }
});

clearButton.addEventListener("click", () => {
  currentInput = "";
  display.value = "";
});


equalsButton.addEventListener("click", () => {
  try {
    const result = Function(`"use strict"; return (${currentInput})`)();
    display.value = result;
    currentInput = result.toString();
  } 
  catch (error) {
    display.value = "Error";
    currentInput = "";
  }
});
