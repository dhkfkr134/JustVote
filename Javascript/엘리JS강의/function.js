// Function 

// 한가지의 업무나 값을 계산하기 위해 사용됨 .
// 기본적인 블럭 
// 서브프로그램으로도 부르고 재사용이 가능하다. 

// 1. 함수 정의 방법
// function name(param1, param2) { body... return; }
// one function == one thing 
// naming: doSomething, command, verb 
// e.g createCardAndPoint -> 쪼갤수 있으면 쪼개는 것이 좋음
// js에서 함수는 object이다 

function printHello() {
    console.log('Hello');
}

printHello();

function log(message) {
    console.log(message);
}

// 2. Parameters
// premitive parameters: passed by value
// object parameters: passed by reference

// 3. Default parameters (added in ES6)
function showMessage(message, from = 'unknown'){
    console.log(`${message} by ${from}`);
}
showMessage('hi');
// 파라미터에 값이 오지 않았을때 default값을 정해줄 수 있음.

// 4. Rest parameters (added in ES6)
// ...배열형태로 전달되는 파라미터
function printAll(...args){
    for(let i=0; i<args.length; i++){
        console.log(args[i]);
    }
    // 배열 출력시 간단하게 출력하는 방법
    for(const arg of args){
        console.log(arg);
    }
    // ===이것도 가능
    args.forEach((arg) => console.log(arg));
}
printAll('dream', 'coding', 'ellie');

// 함수는 object의 일종이다.

// 5. Local scope
// 밖에서는 안이 보이지 않고, 안에서만 밖을 볼 수 있다.
// 차량의 선텐을 생각하면 된다.
// 자식은 부모에서 정의된 것을 접근할 수 있지만
// 부모는 자식에서 정의된 변수에 접근할 수 없다.

// 6. Return a value
// 함수의 return값을 따로 지정하지 않을경우
// return undefined; 라고 볼 수 있다.
function sum(a,b){
    return a + b;
}

const result = sum(2,3);
console.log(`sum: ${result}`);

// 7. Early return. early exit
// 함수안에서 ~~일 때 ~~한다. 블럭안에서 로직을 작성하면 가독성이 떨어진다.
// bad
function upgradeUser(user){
    if(user.point > 10){
        // long upgrade logic...
    }
}

// 조건이 맞지않을때는 빨리 리턴해서 함수를 종료하고
// 조건이 맞을때만 필요한 로직을 실행하도록 한다.
// good
function upgradeUser(user){
    if(user.point <= 10){
        return;
    }
    // long upgrade logic...

}

// 1. Function expression
// a function declaration can be called earlier than it is defined. (hoisted)
// a function expression is created when the execution reaches it.
const print = function () { // 함수에 이름이 없는 것을
    console.log('print');   // anonymous 함수라 한다.
};

print();

// 함수가 선언되기 이전에 사용해도 쓸 수 있다. 
// 호이스팅 때문에(자바 엔진이 선언된 것을 맨위로 올리기 때문이다. )

// 2. Callback function using function expression
function randomQuiz(answer, printYes, printNo){
    if(answer === 'love you'){
        printYes();
    } else{
        printNo();
    }
}

// anonymous function
const printYes = function() {
    console.log('yes!');
};

// named function
// better debugging in debugger's stack traces
// recursions - 함수안에서 자신스스로를 부르는 것을 말함(재귀함수)
const printNo = function print() {
    console.log('no!');
};
randomQuiz('wrong', printYes, printNo);
randomQuiz('love you', printYes, printNo);

// Arrow function
// always anonymous
const simplePrint = function () {
    console.log('simple');
};
// 간결하게 사용할 수 있다.
// arrow function은 function도 생략, 블럭도 생략할 수 있다.
const simplePrint2 = () => console.log('simple');
const add = (a, b) => a + b;
// 함수 안에서 여러 일을 해야 하면 블럭을 사용해야하는데.
// 이때는 return 값을 넣어서 값을 반환해야한다.
const simpleMultiply = (a, b) => {
    // do something more
    return a * b;
};

// IIFE : Imediately Invoked Function Expression
(function hello() {
    console.log('IIFE');
})()
// 함수를 선언함과 동시에 호출하기 위해서는 함수를 (..)묶고, 뒤에()를 써준다.

// calculate(command, a, b)
// command : add, sub, div, mul, rem

function calculate(command, a, b){
    if(command === 'add'){
        return add2(a, b);
    } else if(command === 'sub'){
        return sub(a, b);
    } else if(command === 'div'){
       return div(a, b);
    } else if(command === 'mul'){
        return mul(a, b);
    } else if(command === 'rem'){
        return rem(a, b);
    } else{
        return 'error command';
    }
}

const add2 = function addNumber(a, b){
    return a + b;
};

const sub = function (a, b) {
    return a - b;
};

const div = (a, b) => a / b;
const mul = (a, b) => {
    return a * b;
};
const rem = function (a, b){
    return a % b;
};

console.log(`add 5 2 : ${calculate('add',5,2)}`);
console.log(`sub 5 2 : ${calculate('sub',5,2)}`);
console.log(`div 5 2 : ${calculate('div',5,2)}`);
console.log(`mul 5 2 : ${calculate('mul',5,2)}`);
console.log(`rem 5 2 : ${calculate('rem',5,2)}`);
console.log(`hi 5 2 : ${calculate('hi',5,2)}`);

function calculate2(command, a, b){
    switch(command){
        case 'add':
            return a + b;
        case 'sub':
            return a - b;
        case 'div':
            return a / b;
        case 'mul':
            return a * b;
        case 'rem':
            return a % b;
        default:
            throw Error('unknown command');
    }
}
// if문보다는 정해진 데이터를 처리하는 경우에는
// switch 문을 사용하는 것이 좋다.