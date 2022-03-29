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
    dot: false,
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
                if (!this.operator) {
                    this.operator = value;
                } else {
                    this.operate();
                    this.operator = value;
                    this.text += value;
                    this.display();
                }
            }
        } else {
            if (!this.operator) {
                this.text += value;
                this.firstNumber = parseFloat(this.text);
                if (!(this.firstNumber % 1)) {     //managing . btn
                    dot.classList.remove("unallowed");
                }
                this.display();
            } else {
                this.text += value;
                if (this.dot) {
                    value = '.' + value;
                    this.dot = false;
                }
                if (value == '.') {
                    this.dot = true;
                }
                this.secondNumber = parseFloat((this.secondNumber || '') + '' + value);
                if (!(this.secondNumber % 1)) {    //managing . btn
                    dot.classList.remove("unallowed");
                }
                this.display();
            }
        }
    },
    operate() {
        this.firstNumber = reallyOperate(this.operator, this.firstNumber, this.secondNumber);
        this.operator = '';
        this.secondNumber = null;
        dot.classList.add("unallowed");
        this.text = this.firstNumber;
    },
    resetOperation() {
        this.text = "";
        this.firstNumber = null;
        this.secondNumber = null;
        this.operator = '';
        dot.classList.add("unallowed");
        this.display();
    }
};

const buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach(button => {
    if (button.classList[0] != 'dot') {
        button.addEventListener('click', (e) => {
            operation.addText(e.target.classList[0]);
            operation.display();
        });
    }
});

const dot = document.querySelector('.dot');
dot.addEventListener('click', () => {
    if (!operation.secondNumber && operation.firstNumber && !(operation.firstNumber % 1)) {
        operation.addText('.');
        operation.display();
        dot.classList.add("unallowed");
    } else if (operation.secondNumber && !(operation.secondNumber % 1)) {
        operation.addText('.');
        operation.display();
        dot.classList.add("unallowed");
    }
})