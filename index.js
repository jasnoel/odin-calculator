const add = (a, b) => {
    return parseInt(a) + parseInt(b);
}

const subtract = (a, b) => {
    return parseInt(a) - parseInt(b);
}

const multiply = (a, b) => {
    return parseInt(a) * parseInt(b);
}

const divide = (a, b) => {
    return parseInt(a) / parseInt(b);
}

const reallyOperate = (operator, a, b) => {
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

const displayDiv = document.querySelector('.display');

let operation = {
    text: "",
    firstNumber: null,
    secondNumber: null,
    operator: '',
    display() {
        displayDiv.textContent = this.text;
    },
    addText(value) {
        if (value == 'AC') {
            this.resetOperation();
        } else if (value == '=') {
            this.operate();
            this.display();
        } else if (value == '+' || value == '/' || value == '*') {
            if (!this.operator) {
                this.operator = value;
                this.text += value;
                this.display();
            } else {
                this.operate();
                this.operator = value;
                this.text += value;
                this.display();
            }
        } else if (value == '-') {
            this.text += value;
            this.display();
            if (!this.firstNumber) {
                this.firstNumber = '-';
            } else {
                this.operator = value;
            }
        } else {
            if (!this.operator) {
                this.text += value;
                this.firstNumber = parseInt(this.text);
                this.display();
            } else {
                this.text += value;
                this.secondNumber = parseInt((this.secondNumber || '') + '' + value);
                this.display();
            }
        }
    },
    operate() {
        console.log(this.firstNumber + this.operator + this.secondNumber);
        this.firstNumber = reallyOperate(this.operator, this.firstNumber, this.secondNumber);
        this.operator = '';
        this.secondNumber = null;
        this.text = this.firstNumber;
    },
    resetOperation() {
        this.text = "";
        this.firstNumber = null;
        this.secondNumber = null;
        this.operator = '';
        this.display();
    }
};

const buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
            operation.addText(e.target.classList[0]);
            operation.display();
        });
});


/*
if (value == 'AC') {
    return this.resetOperation();
}
this.text += value;
// if (value == '=') {
//     this.firstNumber = this.text.split(this.operator)[0];
//     this.secondNumber = this.text.split(this.operator)[1];
//     let result = operate(this.operator, this.firstNumber, this.secondNumber);
//     this.addText(result);
//     this.firstNumber = result;
//     this.secondNumber = null;
//     this.operator = '';
// }
if (value == '+' || value == '-' || value == '*' || value == '/') {
    this.operator = value;
    if (!this.firstNumber) {
        this.firstNumber == this.text.split(this.operator)[0];
    } else {
        this.operate();
    }
}*/