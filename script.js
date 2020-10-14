// JS written by John Piper

class Screen {
    constructor() {
        this.display = document.querySelector('h1');
    }
    updateScreen(digits) {
        this.display.textContent = digits;
    }
}

class Calculation {
    constructor() {
        this.total = 0;
        this.leftSum = 0;
        this.rightSum = 0;
        this.mathSymbol = '';
    }
    sum(sumArray) {
        this.clearAllSumValues();
        if (sumArray.length <=2 ) {
            return;
        }
        console.log(sumArray)
        sumArray.forEach(element => {
            if(!isNaN(element)) {
                if(this.leftSum === 0) {
                    this.leftSum = element;
                }
                else {
                    this.rightSum = element;
                }
            }
            else {
                this.mathSymbol = element;
            }
            if (this.leftSum !== 0 && this.rightSum !==0 && this.mathSymbol) {
                this._calculate();
                this._updateSumValuesForNextSum();
            }
        });
        return this.total;
    }
    _calculate() {
        switch (this.mathSymbol) {
            case "+":
                this.total = this.leftSum + this.rightSum;
                break;
            case "-":
                this.total = this.leftSum - this.rightSum;
                break;
            case "*":
                this.total = this.leftSum * this.rightSum;
                break;
            case "/":
                this.total = this.leftSum / this.rightSum;
                break;
            default:
                throw(new Error("No Math Symbol in method"));
        }
    }
    _updateSumValuesForNextSum() {
        this.leftSum = this.total;
        this.rightSum = 0;
        this.mathSymbol = '';
    }
    clearAllSumValues() {
        this.total = 0;
        this.leftSum = 0;
        this.rightSum = 0;
        this.mathSymbol = '';
    }
}

class Memory {
    constructor() {
        this.screenValue = '0';
        this.currentValue = '0'
        this.tokenArray = [];
        this.symbol = '';
        this.dot = '';
    }
    updateScreenValue(digit) {
        if (this.screenValue === '0' && digit !== 0 && digit !== '.') {
            if (Number.isInteger(parseInt(digit))) {
                this.screenValue = digit;
                this.currentValue = digit;
                console.log(this.currentValue);
                this._resetSymboleAndDot();
            }
        }
        else if (Number.isInteger(parseInt(digit))) {
            this.screenValue = this.screenValue + digit;
            this.currentValue = this.currentValue + digit;
            console.log(this.currentValue);
            this._resetSymboleAndDot();
        }
        else if (digit === '.') {
            if (!this.dot && !this.symbol)
                this.screenValue = this.screenValue + digit;
                this.currentValue = this.currentValue + digit
                console.log(this.currentValue);
                this.symbol = '';
        }
        else {
            if (!this.symbol) {
                this.symbol = digit;
                this.screenValue = this.screenValue + digit;
                this.pushTokens();   
                this._resetCurrentValue();
            }
        }
    }
    resetValues() {
        this.screenValue = '0';
        this.currentValue = '0'
        this.tokenArray = [];
        this.symbol = '';
    }
    _resetSymboleAndDot() {
        this.symbol = '';
        this.dot = '';
    }
    _resetCurrentValue() {
        this.currentValue = '0';
    }
    pushNumToken() {
        this.tokenArray.push(parseFloat(this.currentValue));
    }
    pushTokens() {
        this.tokenArray.push(parseFloat(this.currentValue));
        this.tokenArray.push(this.symbol);
    }
    resetTokenArray() {
        this.tokenArray = [];
    }
}
            
class Calculator {
    constructor() {
        this.screen = new Screen();
        this.memory = new Memory();
        this.calculation = new Calculation();
        this.buttons = this.buttons = document.querySelectorAll('button');
        this._loopThroughButtonsAddingClickEvent();
        this.screen.updateScreen(this.memory.screenValue);
    }
    _loopThroughButtonsAddingClickEvent() {
        for (let i=0; i<this.buttons.length; i++) {
            this.buttons[i].addEventListener('click', this._buttonEvent.bind(this));
        }
    }
    _buttonEvent(event) {
        event.preventDefault();
        if (event.target.value === "=") {
            this.memory.pushNumToken(this.memory.currentValue);
            let currentAnswer = this.calculation.sum(this.memory.tokenArray)
            if (currentAnswer) {
                this.screen.updateScreen(currentAnswer);
                this.memory.currentValue = currentAnswer
                this.memory.screenValue = currentAnswer;
                this.memory.resetTokenArray();
            }
        }
        else if (event.target.value === "C") {
            this.memory.resetValues();
            this.screen.updateScreen(this.memory.screenValue);
        }
        else {
            this.memory.updateScreenValue(event.target.value);
            this.screen.updateScreen(this.memory.screenValue);
        }
    }

}

const calculator = new Calculator();

