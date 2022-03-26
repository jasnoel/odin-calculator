const add = (a, b) => {
    return parseFloat(a) + parseFloat(b);
}

const subtract = (a, b) => {
    return parseFloat(a) - parseFloat(b);
}

const multiply = (a, b) => {
    return parseFloat(a) * parseFloat(b);
}

const divide = (a, b) => {
    return parseFloat(a) / parseFloat(b);
}

const reallyOperate = (operator, a, b) => {
    switch (operator) {
        case '+':
          return Math.round(add(a, b) * 100) / 100;
        case '-':
            return Math.round(subtract(a, b) * 100) / 100;
        case '*':
            return Math.round(multiply(a, b) * 100) / 100;
        case '/':
            return Math.round(divide(a, b) * 100) / 100;
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
        } else if (value == '-') {  //problem if you do 7-7-7
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
                this.firstNumber = parseFloat(this.text);
                this.display();
            } else {
                this.text += value;
                this.secondNumber = parseFloat((this.secondNumber || '') + '' + value);
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
