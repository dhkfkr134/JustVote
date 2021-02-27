// promise는 JS에서 제공하는 비동기를 간편하게 처리할 수 있도록 도와주는 objec이다. 
// 정해진 장시간의 기능을 수행 후 정상적으로 기능이 실행되면 성공의 메세지와 함께 값을 전달
// 실패하면 에러를 전달해줌.

'use strict'

// state : pending -> ful 완료 or 거부
// Producer vs Consumer

// 1. Producer
// when new Promise is created, the executor runs automatically.
const promise = new Promise((resolve, reject) => {
  // doing some heavy work (network, read file)
  console.log('doing something...');
  setTimeout(() => {
    //resolve('ellie'); // 성공했을때
    reject(new Error('no network')); // 실패했을 때
  }, 2000);
});

// 2. Consumers: then, catch, finally
promise.then(value => {
  console.log(value);
})
.catch(error => {
  console.log(error);
})
.finally(() => {
  console.log('finally');
}); // chaining
// 값이 정상적으로 전달된다면 그러면(then) 값을 받아올거야.
// 아니라면(catch) error를 출력
// 마지막으로(finally) 실행 - 성공 실패 상관없이 어떠한 기능을 실행할 때

// 3. promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
.then(num => num * 2)
.then(num => num * 3)
.then(num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num - 1), 1000);
  });
})
.then(num => console.log(num)); // num = 5

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('닭'), 1000);
  });

  const getEgg = hen =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen} => 계란`)), 1000);
  });

  const cook = egg =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 후라이`), 1000);
  });

  getHen() //
  .then(getEgg)
  .catch(error => {
    return '빵';
  })
  .then(cook)
  .then(console.log)
  .catch(console.log);
// catch의 순서로 오류 처리 순서를 바꾸면서 처리해 줄 수 있다.

