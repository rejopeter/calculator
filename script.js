function add(x, y) {
    const a = Number(x);
    const b = Number(y);
    return a + b;
};
function subtract(x, y) {
    const a = Number(x);
    const b = Number(y);
	return a - b;
};
function multiply(x, y) {
    const a = Number(x);
    const b = Number(y);
	return a * b;
};
function divide(x, y) {
    const a = Number(x);
    const b = Number(y);
	return a / b;
};
function operation(a, b, operator) {
    if (operator == "+") {
        return add(a,b);
    }
    if (operator == "-") {
        return subtract(a,b);
    }
    if (operator == "*") {
        return multiply(a,b);
    }
    if (operator == "/") {
        return divide(a,b);
    }
}
let input = "";
let lastR = null;
let currOp = null;
function appendToInput(value) {
    input += value;
    document.getElementById("display").textContent += value;
}
function handleOperator(value) {
    if (input === "" && lastR === null) return;
    if (currOp && input === "") return;
    if (currOp && input !== "") {
        lastR = operation(lastR, input, currOp);
        lastR = Math.round(lastR * 100000) / 100000;
        input = "";
        document.getElementById("display").textContent = lastR + value;
    } else {
        lastR = input;
        input = "";
        document.getElementById("display").textContent += value;
    }
    currOp = value;
}
document.querySelectorAll("button").forEach(btn => {
    if (!["clear", "delete", "eq", "sign"].includes(btn.id)) {
        btn.addEventListener("click", function () {
            let value = btn.textContent;
            if (["+", "-", "*", "/"].includes(value)) {
                handleOperator(value);
            } else {
                appendToInput(value);
            }
        });
    }
});
function clearInput() {
    input = "";
    lastR = null;
    currOp = null;
    document.getElementById("display").textContent = "";
}
function deleteLast() {
    input = input.slice(0, -1);
    document.getElementById("display").textContent = input;
}
function equal() {
    if (lastR != null && currOp && input !== "") {
        let result = operation(lastR, input, currOp);
        result = Math.round(result * 100000) / 100000;
        input = result.toString();
        document.getElementById("display").textContent = input;
        lastR = null;
        currOp = null;
    }
}
document.getElementById("clear").addEventListener("click", clearInput);
document.getElementById("delete").addEventListener("click", deleteLast);
document.getElementById("eq").addEventListener("click", equal);
document.getElementById("sign").addEventListener("click", function () {
    if (input !== "") {
        input = (-Number(input)).toString();
        document.getElementById("display").textContent = input;
    }
});
document.addEventListener("keydown", function (e) {
    const key = e.key;
    if (!isNaN(key) || key === ".") {
        appendToInput(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperator(key);
    } else if (key === "Enter" || key === "=") {
        equal();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key.toLowerCase() === "c") {
        clearInput();
    }
});