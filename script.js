const add = function (a, b) {
    return a + b;
}
const subtract = function (a, b) {
    return a - b;
}
const multiply = function (a, b) {
    return a * b;
}
const divide = function (a, b) {
    if (b === 0) return 'Math says no.'
    return a / b;
}

const operate = function(operator, firstNumber, secondNumber)  {
switch (operator) {
    case '+':
        return add(firstNumber, secondNumber);
    case '-':
        return subtract(firstNumber, secondNumber);
    case '*':
        return multiply(firstNumber, secondNumber);
    case '/':
        return divide(firstNumber, secondNumber);
    default:
            return "Nope.";
    }
};

let firstNumber = '';
let operator = '';
let secondNumber = '';

const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.display');
const historyDisplay = document.querySelector('.history');
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        const value = event.target.getAttribute('data-value');

        if (value === 'clear') {
            firstNumber = '';
            operator = '';
            secondNumber = '';
            display.textContent = '';
            historyDisplay.textContent = '';
            return;
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
            firstNumber = '';
            }
            if (operator === '') {
            firstNumber += value;
            display.textContent = firstNumber;
            shouldResetDisplay = false;
            } else {
            secondNumber += value;
            display.textContent = secondNumber;
            }
        }
    });

});


