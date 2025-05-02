const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? 'Math says no.' : a / b;


function operate(operator, a, b)  {
switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return "Nope.";
    }
}

let firstNumber = '';
let operator = '';
let secondNumber = '';
let shouldResetDisplay = false;

const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.display');
const historyDisplay = document.querySelector('.history');

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        const value = event.target.getAttribute('data-value');

        if (value === 'clear') {
            firstNumber = operator = secondNumber = '';
            display.textContent = historyDisplay.textContent = '';

        } else if (value === '=') {
           if (firstNumber && operator && secondNumber) {
            const result = operate(operator, parseFloat(firstNumber),
                            parseFloat(secondNumber));
            historyDisplay.textContent = `${firstNumber} ${operator}
                                            ${secondNumber}`
            display.textContent = result;
            firstNumber = result;
            operator = '';
            secondNumber = '';
            shouldResetDisplay = true;
            }

        } else if (['+', '-', '*', '/'].includes(value)) {
            if (firstNumber && operator && secondNumber) {
            const result = operate(operator, parseFloat(firstNumber),
                            parseFloat(secondNumber));
            historyDisplay.textContent = `${firstNumber} ${operator}
                                            ${secondNumber}`
            display.textContent = result;
            firstNumber = result;
            secondNumber = '';
            operator = value;
            shouldResetDisplay = true;

        } else {
                operator = value;
                historyDisplay.textContent = `${firstNumber} ${operator}`;
            }

        } else {
            if (shouldResetDisplay) {
            display.textContent = '';
            shouldResetDisplay = false;

            if (operator === '') {
                firstNumber = '';
            } else {
                secondNumber = '';
            }
            }
            if (operator === '') {
            if (value === '.' && firstNumber.includes('.')) return;

            firstNumber += value;
            display.textContent = firstNumber;
            shouldResetDisplay = false;

            } else {

            if (value === '.' && firstNumber.includes('.')) return;
            secondNumber += value;
            display.textContent = secondNumber;
            }
        }
    });

});


