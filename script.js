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


function handleInput(value) {

    if (value === 'clear') {
        firstNumber = operator = secondNumber = '';
        display.textContent = historyDisplay.textContent = '';

    } else if (value === 'erase') {
        if (operator === '') {
            firstNumber = firstNumber.slice(0, -1);
            display.textContent = firstNumber;
        } else if (secondNumber !== '') {
            secondNumber = secondNumber.slice(0, -1);
        } else {
            operator = '';
            historyDisplay.textContent = '';
        }

    } else if (value === '=') {
        if (firstNumber && operator && secondNumber) {
            const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
            historyDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
            display.textContent = result;
            firstNumber = result;
            operator = '';
            secondNumber = '';
            shouldResetDisplay = true;
        }

    } else if (['+', '-', '*', '/'].includes(value)) {
        if (firstNumber && operator && secondNumber) {
            const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
            historyDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
            display.textContent = result;
            firstNumber = result;
            secondNumber = '';
            operator = value;
            shouldResetDisplay = true;
        } else {
            operator = value;
            historyDisplay.textContent = `${firstNumber} ${operator}`;
            display.textContent = '';
            shouldResetDisplay = false;
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
}

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        const value = event.target.getAttribute('data-value');
        handleInput(value);
    });
});

document.addEventListener('keydown', function(event) {
    const key = event.key;
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '=', 'Enter', 'Backspace', 'Escape'];

    if (allowedKeys.includes(key)) {
        let value = key;

        if (value === 'Enter') value = '=';
        if (value === 'Backspace') value = 'erase';
        if (value === 'Escape') value = 'clear';

        handleInput(value);
    }
});