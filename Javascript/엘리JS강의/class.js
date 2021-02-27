'use strict';
// class
// template / declare once / no data in
// 클래스를 이용해서 데이터를 넣어 만드는 것이

// object 
// instance of a class
// created many times
// data in

// class : template
// object : instance of a class

// JavaScript classes
// - introduced in ES6
// - syntactical sugar over prototype-based inheritance
// 문법상으로 추가된

// 1. Class declarations
class Person {
    // constructor
    constructor(name, age) {
        // fields
        this.name = name;
        this.age = age;
    }

    // methods
    speak() {
        console.log(`${this.name}: hello!`);
    }
}

const cheolsoon = new Person('cheolsoon', 24);
console.log(cheolsoon.name);
console.log(cheolsoon.age);
cheolsoon.speak();

// 2. Getter and setters
class User {
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    // getter와 setter 안에서 사용되는 변수를 조금 다르게 쓴다.
    get age() {
        return this._age;
    }

    set age(value) {
    //    if(value < 0){
    //        throw Error('age can not be negative');
    //    }
        this._age = value < 0 ? 0 : value;
    }
}
// User의 age가 -1이 되는 것은 말이 안되잖아~~
// 클래스를 사용하는 사용자가 잘못 사용해도
// 방어적으로 사용할 수 있도록 만들어주는 것이 
// getter 와 setter이다. 
const user1 = new User('steve', 'Job', -1);
console.log(user1.age);

// 3. Fields (public, private)
// 가장 최근에 추가된 것
// #기호를 붙이면 private이다. 클래스 내부에서 읽고 쓸 수 있음
// 클래스 외부에서는 사용할 수 없다.
class Experiment {
    publicField = 2;
    #privateField = 0;
}
const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);

// 4. static properties and methods
// 가장 최근에 추가됨. 
class Article {
    static publisher = 'Dream Coding';
    constructor(articleNumber) {
        this.articleNumber = articleNumber;
    }

    static printPublisher() {
        console.log(Article.publisher);
    }
}

const article1 = new Article(1);
const article2 = new Article(2);
console.log(Article.publisher);
Article.printPublisher();
// 만들어진 객체에 상관없이 동일하게 이용되는 값과
// 사용되어 지는 method가 있을 수 있다. 
// 그런 것들을 static 키워드로 사용하면
// 메모리를 아낄 수 있다.
// 클래스명으로 접근할 수 있다. 

// 5. Inheritance
// a way for one class to extend another class.
class Shape {
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        console.log(`drawing ${this.color} color of`)
    }

    getArea() {
        return this.width * this.height;
    }
}

class Rectangle extends Shape {}
class Triangle extends Shape {
    draw() {
        super.draw();
        console.log('삼각별');
    }
    getArea() {
        return ((this.width * this.height) / 2);
    }
}

const rectangle = new Rectangle(20, 20, 'blue');
const triangle = new Triangle(20, 20, 'Red');
console.log(rectangle.getArea());
console.log(triangle.getArea());

// 필요한 함수들만 overriding 해서 사용할 수 있다. 
// 삼각형의 너비는 /2 해줘야 하므로 오버라이딩해서 바꿔준다. 
// super.() 를 이용하면 부모의 함수를 먼저 호출하고
// 그 뒤에 본인이 지정한 실행문을 실행 할 수 있다.

// 6. Class checking: instanceOf
console.log(rectangle instanceof Rectangle);
console.log(triangle instanceof Rectangle);
console.log(triangle instanceof Triangle);
console.log(triangle instanceof Shape);
console.log(triangle instanceof Object);
// 왼쪽의 object가 오른쪽의 인스턴스인지 확인하는 것
// true false를 반환함.
// T F T T T 
