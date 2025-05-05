const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? 'Are you ok?' : a / b;

function operate(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return "Nope";
    }
}

let firstNumber = '';
let operator = '';
let secondNumber = '';
let shouldResetDisplay = false;
let isPercent = false;

const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.display');
const historyDisplay = document.querySelector('.history');

function handleInput(value) {
    if (value === 'clear') {
        firstNumber = operator = secondNumber = '';
        shouldResetDisplay = false;
        isPercent = false;
        display.textContent = historyDisplay.textContent = '';

    } else if (value === 'erase') {
        if (operator === '') {
            firstNumber = firstNumber.slice(0, -1);
        } else if (secondNumber !== '') {
            secondNumber = secondNumber.slice(0, -1);
        } else {
            operator = '';
        }
        updateDisplays();

    } else if (value === 'percent') {
        percent();

    } else if (value === '=') {
        if (firstNumber && operator && secondNumber) {
            let a = parseFloat(firstNumber);
            let b = parseFloat(secondNumber);
            if (isPercent) {
                b = (a * b) / 100;
                isPercent = false;
            }
            const result = operate(operator, a, b);
            display.textContent = result;
            historyDisplay.textContent = '';
            firstNumber = result.toString();
            operator = '';
            secondNumber = '';
            shouldResetDisplay = true;
        }

    } else if (['+', '-', '*', '/'].includes(value)) {
        if (!firstNumber) return;

        if (firstNumber && operator && secondNumber) {
            let a = parseFloat(firstNumber);
            let b = parseFloat(secondNumber);
            if (isPercent) {
                b = (a * b) / 100;
                isPercent = false;
            }
            const result = operate(operator, a, b);
            firstNumber = result.toString();
            secondNumber = '';
        }
        operator = value;
        shouldResetDisplay = false;
        updateDisplays();

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
        } else {
            if (value === '.' && secondNumber.includes('.')) return;
            secondNumber += value;
        }

        updateDisplays();
    }
}

function updateDisplays() {
    let expression = firstNumber;
    if (operator) expression += ` ${operator} `;
    if (secondNumber) {
        expression += `${secondNumber}${isPercent ? '%' : ''}`;
    }
    display.textContent = expression;

    if (firstNumber && operator && secondNumber) {
        let a = parseFloat(firstNumber);
        let b = parseFloat(secondNumber);
        if (isPercent) {
            b = (a * b) / 100;
        }
        const result = operate(operator, a, b);
        historyDisplay.textContent = result;
    } else {
        historyDisplay.textContent = '';
    }
}

function percent() {
    if (operator && secondNumber) {
        isPercent = true;
        updateDisplays(); 
    }
}

function toggleSign() {
    if (operator === '') {
        if (firstNumber) {
            firstNumber = (parseFloat(firstNumber) * -1).toString();
        }
    } else {
        if (secondNumber) {
            secondNumber = (parseFloat(secondNumber) * -1).toString();
        }
    }
    updateDisplays();
}

buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        const value = event.target.getAttribute('data-value');
        if (value === 'toggleSign') {
            toggleSign();
        } else {
            handleInput(value);
        }
    });
});

document.addEventListener('keydown', function (event) {
    const key = event.key;
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '=', '%', 'Enter', 'Backspace', 'Escape', ' '];

    if (allowedKeys.includes(key)) {
        let value = key;

        if (value === 'Enter') value = '=';
        if (value === 'Backspace') value = 'erase';
        if (value === 'Escape') value = 'clear';
        if (value === '%') return percent();
        if (value === ' ') return toggleSign();

        handleInput(value);
    }
});