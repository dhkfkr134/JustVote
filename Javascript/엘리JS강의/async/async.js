
// async와 await - promise를 더 간결하고 간편하고 더 동기적으로 실행되는 것처험 보이게 만드는 아이들

// then.then.then. chaining을 계속하면 난잡해질 수 있음.

// 이런거 위에 api로 async와 await 을 사용하면 동기식으로 코드를 순서대로 작성하는 것처럼 간편하게 작성하도록 도와줌
// 새로운것이 추가된 것이 아니라 promise위에 더 간편하게 api를 제공함.

// 기존에 존재하는 것을 감싸서 조금더 간편하게 쓸 수 있게 하는 것을
// Syntactic sugar이라고 한다.

// async와 await은 promise를 깔끔하게 사용할 수 있는 것

// 1. async
// 기존 promise를 사용했던 함수에서
// promise를 빼고, 함수 앞에 async만 써주면
// code block이 promise로 자동적으로 바뀌게 됨.

// function fetchUser() {
//   return new Promise((resolve, reject) => {
//     // do network request in 10 secs ...
//     resolve('ellie');
//   });
// }
// >>>
async function fetchUser() {
  // do network request in 10 secs ...
  resolve('ellie');
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await ***
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return 'apple';
}

async function getBanana() {
  await delay(1000);
  return 'banana';
}

async function pickFruits() {
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}

pickFruits().then(console.log);

// 3. useful Promise APIs
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then(fruits =>
    fruits.join(' + ')
    );
}
// all - Promise에 있는 API 모든 Promise들이 받아질때까지 병렬로 실행해줌
pickAllFruits().then(console.log);


function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}
// race - 배열에 전달된 Promise들 중에서 가장 먼저 값을 리턴한 것만 전달됨.
pickOnlyOne().then(console.log);