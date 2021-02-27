// Objects
// one of the JavaScript's data types.
// a collection of related data and/or functionality.
// Nerly all objects in JavaScript are instances of Object
// Object는 {Key: value}의 집합체이다.

// 1. Literals and properties.
const obj1 = {}; // 'object literal' syntax
const obj2 = new Object(); // 'object constructor' syntax

function print(person) {
  console.log(person.name);
  console.log(person.age);
}

const ellie = { name: 'ellie', age: 4 };
print(ellie);

ellie.hasJob = true; // 자바는 동적으로 다른 속성을 추가할 수 있다.
// 가능하면 피해서 코딩하는 것이 좋다.
console.log(ellie.hasJob);

// can delete properties later
// 속성의 삭제도 가능하다
delete ellie.hasJob;
console.log(ellie.hasJob);


// 2. Computed properties
// key should be always string
console.log(ellie.name); // 코딩하는 순간 그 키에 해당하는 값을 받아오고 싶을 때 사용
console.log(ellie['name']); // 정확하게 어떤 키가 필요한지 모를 때, 런타임에 결정될 때 사용
ellie['hasJob'] = true;
console.log(ellie.hasJob);

function printValue(obj, key){
  //console.log(obj.key);
  console.log(obj[key]);
}
printValue(ellie, 'name');
printValue(ellie, 'age');


// 3. Property value shorthand
const person1 = {name: 'bob', age: 2};
const person2 = {name: 'steve', age: 3};
const person3 = {name: 'anna', age: 4};
const person4 = new Person('ellie', 30);

// 4. Constructor function
function Person(name, age){
  // this = {};
  this.name = name;
  this.age = age;
  // return this;
}

// 5. in operator: property existence check(key in obj)
// obj안에 키워드가 들어있는지 확인하는 것.

console.log('name' in ellie);
console.log('age' in ellie);

// 6. for..in vs for..of
// for (key in obj)
for (key in ellie) {
  console.log(key);
}
// name age hasJob

// for (value of iterable)
const array = [1,2,4,5];
for(value of array){
  console.log(value);
}

// 7. Fun cloning
// Object.assign(dest, [obj1, obj2, obj3...])
const user = { name: 'ellie', age: '20' };
const user2 = user;
user2.name = 'bob';
console.log(user);
// bob이 출력됨. user가 참조하고 있는 곳을 user2도 같이
// 참조하는데 user2의 이름을 바꾸는 것은 user가 가리키는 곳의
// 이름을 바꾸는 것과 똑같기 때문이다.
// 완전히 복사하는 방법은 무엇인가?

// old way
const user3 = {}; // 빈 객체
for (key in user) {
  user3[key] = user[key];
}
console.clear(); // console창 지워줌
console.log(user3);
// user의 키 값을 돌아보면서 값을 할당해줌

const user4 = Object.assign({}, user);
console.log(user4);

// another example
const fruit1 = { color: 'red'};
const fruit2 = { color: 'blue', size: 'big'};
const fruit3 = { color: 'blue', size: 'small'};

const mixed = Object.assign({}, fruit1, fruit2, fruit3);
console.log(mixed.color);
console.log(mixed.size);
// blue, small - 이유는 assign에서 뒤에 오는 것으로 덮어 씌워지기 때문에.

