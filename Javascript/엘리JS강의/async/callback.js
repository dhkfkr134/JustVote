'use strict'

// JavaScript is synchronous. - 순서에 맞게 실행되는 것
// Execute the code block by orger after hoisting.
// hoisting: var, function declaration

console.log('1');
setTimeout(() => {
  console.log('2');
}, 1000); // 1초뒤에 로그를 찍어라.
console.log('3');

// Synchronous callback - 즉각적으로 동기적으로 실행
function printImmediately(print){
  print();
}
printImmediately(() => console.log('hello'));

// Asynchronous callback - 나중에 언제 실행될 지 예측 될 수 없는 콜백
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay( () => console.log('비동기 callback'), 2000);

console.clear();

// 콜백 지옥 체험
class UserStorage {
  loginUser(id, password, onSuccess, onError){
    setTimeout(() => {
      if(
        (id === 'ellie' && password === 'dream' ||
        (id === 'coder' && password === 'academy'))
      ) {
        onSuccess(id);
      } else {
        onError(new Error('not found'));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if(user === 'ellie') {
        onSuccess({ name: 'ellie', role: 'admin'});
      } else {
        onError(new Error('no access'));
      }
    });
  }
}

const userStorage = new UserStorage();

const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
  id,
  password,
  user => {
    userStorage.getRoles(
      user,
      userWithRole => {
        alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
      },
      error => {
        console.log(error);
      }
    );
  },
  error => {
    console.log(error);
  }
);

// 문제점은 콜백함수 안에서 콜백함수를 또 호출하고, 또
// 다른 콜백 함수를 호출하고 이런식으로 하면 가독성이 떨어진다.
// 콜백 체인이 길어지면 디버깅, 유지보수가 힘들다.