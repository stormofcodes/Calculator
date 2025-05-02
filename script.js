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

const operate = function(operator, a, b)  {
switch (operator) {
    case '+':
        return add(a, b);
    case '-':
        return subtract(a, b);
    case '*':
        return multiply(a, b);
    case '/':
        return divide(a, b);
    default:
            return "Nope.";
    }
};


const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.display');

buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        const value = event.target.getAttribute('data-value');

        display.textContent += value;
    });

});


