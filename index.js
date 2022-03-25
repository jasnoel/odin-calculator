const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

const operate = (operator, a, b) => {
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
            return `Error wrong operator: ${operator} isn't supported`;
    }
}

let operation = "";

const display = document.querySelector('.display');

const buttons = Array.from(document.querySelectorAll('button')).filter(btn => !(btn.classList.contains("AC") || btn.classList.contains("=")));
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
            operation += e.target.classList[0];
            display.textContent = operation;
        });
});