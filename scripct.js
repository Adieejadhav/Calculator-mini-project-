const input = document.querySelector('.inp');
const button = document.querySelector('.btn');
const result = document.querySelector('h1');



button.addEventListener('click', () => {
    let str = input.value;
    result.innerText = `${evaluatingResult(str)}`
});


function decidePrecedence(operators) {
    return operators.some(op => op === '*' || op === '/');
}


function creatingNumbers(str) {
    return str.match(/\d+/g).map(Number);
}


function extractOperators(str) {
    const regex = /[+\-*/^]/g;
    return str.match(regex) || [];
}



function handleMultiplicationAndDivision(numbers, operators) {
    let index;
    while (operators.includes('*') || operators.includes('/')) {
        index = operators.findIndex(op => op === '*' || op === '/');
        if (operators[index] === '*') {
            let result = numbers[index] * numbers[index + 1];
            numbers.splice(index, 2, result);
            operators.splice(index, 1);
        } else if (operators[index] === '/') {
            let result = numbers[index] / numbers[index + 1];
            numbers.splice(index, 2, result);
            operators.splice(index, 1);
        }
    }
}



function handleAdditionAndSubstraction(numbers, operators) {
    let index;
    while (operators.includes('+') || operators.includes('-')) {
        index = operators.findIndex(op => op === '+' || op === '-');
        if (operators[index] === '+') {
            let result = numbers[index] + numbers[index + 1];
            numbers.splice(index, 2, result);
            operators.splice(index, 1);
        } else if (operators[index] === '-') {
            let result = numbers[index] - numbers[index + 1];
            numbers.splice(index, 2, result);
            operators.splice(index, 1);
        }
    }
}



function evaluatingResult(str) {
    let operators = extractOperators(str);
    let numbers = creatingNumbers(str);

    while (operators.length > 0) {
        if (decidePrecedence(operators)) {
            handleMultiplicationAndDivision(numbers, operators);
        } else {
            handleAdditionAndSubstraction(numbers, operators);
        }
    }
    return numbers[0];
}

