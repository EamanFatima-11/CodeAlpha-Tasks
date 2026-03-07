let display = document.getElementById("display");
let historyList = document.getElementById("historyList");
let expression = "";

// Numbers
function appendNumber(num){
expression += num;
display.value = expression;
}
if (!isNaN(key) || key === ".") {
    appendNumber(key);
}

if ("+-*/".includes(key)) {
    setOperator(key);
}

// Operators
function setOperator(op){
if(expression==="") return;

let last = expression.slice(-1);

if("+-*/".includes(last)) return;

expression += op;
display.value = expression;
}

// Clear
function clearDisplay(){
expression="";
display.value="";
}

// Delete
function deleteLast(){
expression = expression.slice(0,-1);
display.value = expression;
}

// Calculate
function calculate() {

    if (expression === "") return;

    try {

        let result = eval(expression);

        if (!isFinite(result)) {
            display.value = "Error";
            expression = "";
            return;
        }

        display.value = result;
        expression = result.toString();

    } catch {

        display.value = "Error";
        expression = "";

    }
}


// Square
function square() {

    if (expression === "") return;

    try {
        let value = eval(expression);
        let result = value * value;

        display.value = result;
        expression = result.toString();

    } catch {
        display.value = "Error";
        expression = "";
    }
}


// Square Root
function squareRoot() {

    if (expression === "") return;

    try {
        let value = eval(expression);

        if (value < 0) {
            display.value = "Invalid";
            expression = "";
            return;
        }

        let result = Math.sqrt(value);

        display.value = result;
        expression = result.toString();

    } catch {
        display.value = "Error";
        expression = "";
    }
}

// Percentage
function percentage(){
let value = eval(expression);
let result = value / 100;

display.value = result;
expression = result.toString();
}

// Theme toggle
function toggleTheme(){
document.body.classList.toggle("light");
}

// Keyboard support
document.addEventListener("keydown",function(e){

if(!isNaN(e.key) || "+-*/.".includes(e.key)){
appendNumber(e.key);
}

if(e.key==="Enter") calculate();
if(e.key==="Backspace") deleteLast();
if(e.key==="Escape") clearDisplay();

});
