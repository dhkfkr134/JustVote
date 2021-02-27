'use strict';

// Array

// 1. 배열 선언 Declaration
const arr1 = new Array();
const arr2 = [1, 2];

// 2. Index position
const fruits = ['apple', 'banana'];
console.log(fruits);
console.log(fruits[fruits.length - 1]);
// 배열의 마지막을 보통 이렇게 접근함.
// 총 길이 - 1 = 마지막 인덱스

console.clear();
// 3. Looping over an array

// b. for of
for (let fruit of fruits) {
  console.log(fruit);
}

// c. forEach
// fruits.forEach(function (fruit, index) {
//   console.log(fruit, index);
//   // 각 배열의 내용, 인덱스, 배열 전체가 올 수 있다.
//   // 보통 array는 받아오지 않는다.
// });

fruits.forEach((fruit) => console.log(fruit));
// forEach는 배열안에 들어있는 value들 마다 내가 전달한 함수를 출력하는 구나
// ctrl 누르고 문법 클릭하면 해당 사용법이 나와있는 곳으로
// 이동함. 이렇게 직접 확인하는 것은 실력향상에 큰 도움이 됨.

// 4. Addition, deletion, copy
// push : add an item to the end
fruits.push('strawberry', 'peach');

// pop : remove an item from the end
fruits.pop();

// unshift : add an item to the beginning
// 앞에서부터 추가함.
fruits.unshift('lemon');

// shift : remove an item from the beginning
// 맨 앞부터 삭제함.
fruits.shift();

// 주의!! unshift와 shift는 pop과 push보다 훨씬 느리다.
// 중간의 데이터를 바꾸는 것은 index를 활용하는 것이기 때문에 빠르다.

// splice : index로 대상 item을 삭제함.
fruits.splice(1, 1);
// index 1부터 1개를 지운다.

// spice는 지우는 개수를 지정하지 않고 index만 지정하면
// 해당 index부터 전부를 지운다.

fruits.splice(1,1,'tomato', 'watermelon');
// index 1위치에서 1개를 삭제하고
// 거기에 tomato와 watermelon을 삽입한다.

// combine two array - 두 배열을 연결하는 것
const fruits2 = ['pear', 'coconut'];
const newFruits = fruits.concat(fruits2);
console.log(newFruits);
// concat api는 두 배열을 연결시켜 줌.

// 5. Searching (배열안에 무엇이 있는지 검색)
// indexOf : find the index
console.clear();
console.log(fruits);
console.log(fruits.indexOf('apple')); // 0
console.log(fruits.indexOf('tomato')); // 1
console.log(fruits.indexOf('coconut')); // -1

// includes - 배열안에 있는지 확인할 수 있음.
console.log(fruits.includes('tomato')); // true
console.log(fruits.includes('coconut')); // false

// lastIndexOf
console.clear();
fruits.push('apple');
console.log(fruits.indexOf('apple'));
// 중복이 있을 경우 가장 처음에 나오는 index반환
console.log(fruits.lastIndexOf('apple'));
// 중복이 있을 경우 가장 마지막에 나오는 index반환
