// HTTP - Hypertext Transfer Protocol
// AJAX - Asynchronous
// XMLHttPRequest
// fetch() api

// 서버와 데이터를 주고 받을때 JSON을 많이 씀
// 요즘은 XML은 많이 사용하지 않음
// 요즘에는 JSON을 많이 사용함. 
// JSON - Javascript object Notation
// 텍스트를 기반 , 눈으로 읽기 편하고, 직렬화하기 위해 사용됨.
// 데이터 전송시 쓰임, 프로그램 언어나 환경에 상관없이 사용 가능.

// JSON 공부 방법 
// Object를 어떻게 serialize(직렬화해서)
// JSON으로 변환할지,
// 직렬화된 JSON을 deserialize해서 object로 변환할지
// 를 중점적으로 공부하면 됨.

// JSON

// 1. Object to JSON
// Stringfy(obj)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(['apple', 'banana']);
console.log(json);

const rabbit = {
  name : 'tori',
  color : 'white',
  size : null,
  birthDate : new Date(),
  jump: () => {
    console.log(`${this.name} jump!!`);
  },
};

json = JSON.stringify(rabbit);
console.log(json);
// 함수는 Json으로 만들어지지XX

json = JSON.stringify(rabbit, ['name', 'color']);
console.log(json);
// 원하는 속성값만 저장하고 싶을때 사용

// 2. JSON to Object
// parse(json)
console.clear();
json = JSON.stringify(rabbit);
const obj = JSON.parse(json, (key, value) => {
  console.log(key);
  console.log(value);
  
  return key === 'birthDate' ? new Date(value) : value;
});
console.log(obj);

rabbit.jump();
//obj.jump(); 오류 발생 - JSON으로 바뀌는 과정에서 사라짐.

rabbit.birthDate.getDate()

// 각각 콜백 함수를 이용해서 JSON으로 보낼때, 받을때 세부적으로 조정이 가능하다!!!
