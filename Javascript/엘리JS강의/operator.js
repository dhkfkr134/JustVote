// 1. String concatenation
console.log('my'+' cat');
console.log('1' + 2);
console.log(`string literals: 1 + 2 = ${1 + 2}`);

// 2. Numeric operators

// 3. Increment and decrement operators

// 4. Assignment operators

// 5. Comparison operators

// 6. Logical operators : || (or), &&(and), !(not)

// || or연산자, true가 나오면 바로 그 비교문이 종료됨

// && and연산자, finds the first falsy value
// console.log(`and: ${value1 && value2 && check()}`);
// &&은 세 연산자가 모두 ture일때 false가 발견되면,
// 뒤에가 뭐든지 상관없이 false를 리턴함. 그래서 뒤에는 실행이 안될 수 있음.

// 7. Equality
const stringFive = '5';
const numberFive = 5;

// == loose eqality, with type conversion
console.log(stringFive == numberFive);
console.log(stringFive != numberFive);

// === strict eqality, no type conversion
// 타입을 확인하는 것 
console.log(stringFive === numberFive);
console.log(stringFive !== numberFive);

// object equality by reference
const ellie1 = {name: 'ellie' };
const ellie2 = {name: 'ellie' };
const ellie3 = ellie1;
console.log(ellie1 == ellie2); // F
console.log(ellie1 === ellie2); // F
console.log(ellie1 === ellie3); // T

// T F T F T F
console.log(null == undefined); // T
console.log(null === undefined); // F

// 8. conditional operators: if
// if, else if. else
const name = 'df';

// 9. Ternary operator: ?
// condition ? value1 : value2;
console.log(name === 'ellie' ? 'yes' : 'no');

// 10. Switch

// 11. Loops

// while
// do-while
// for loop

// break, continue
// Q1. iterate 0 to 10 and print only even numbers (use continue)

for(let i = 0; i < 11; i++) {
    if(i%2 === 0){
        continue;
    }
    console.log(`i=${i}`);
}

// Q2. iterate from 0 to 10 and print numbers until reaching 8 (use break)
for(let i=0; i<10; i++){
    if(i==8){
        break;
    }
    console.log(`i=${i}`);
}
