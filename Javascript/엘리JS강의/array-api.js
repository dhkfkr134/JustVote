// Q1. make a string out of an array
{
  const fruits = ['apple', 'banana', 'orange'];
  const fruit = fruits[0] + fruits[1] + fruits[2];

  const result = fruits.join('-'); // 인자는 옵션 구분자로 사용할 것을 지정해줌
  console.log(result);
}

// Q2. make an array out of a string
{
  const fruits = '🍎, 🥝, 🍌, 🍒';

  const result = fruits.split(',', 2); // 두번째 인자는 옵션 받아올 개수 지정
  console.log(result);
}

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
  const array = [1, 2, 3, 4, 5];

  const result = array.reverse(); // 배열 아이템의 순서를 거꾸로 만들어줌.
  console.log(result);
  console.log(array); // 배열 자체를 바꿔준다는 것을 알 수 있고, 바꾼 배열을 리턴함.
  for(let i=0; i<5; i++){
    array[i] = i+1;
  }

}

// Q4. make new array without the first two elements
{
  const array = [1, 2, 3, 4, 5];
  const result = array.slice(2, 5); // 맨 마지막의 것은 배제되어지므로
  // index 2 ~ 5까지 받으면 실제로는 2 ~ 4가 받아짐.

  // const result = array.splice(0, 2);
  // splice는 배열 자체를 바꿔버림. 따라서 slice를 사용해야 함.
  console.log(result);
  console.log(array);
}

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];

// Q5. find a student with the score 90
{
//const student2 = students.find(score===90);
  const result = students.find((student) => student.score === 90);
  console.log(result);
}

// Q6. make an array of enrolled students
{
  //students.find(enrolled===true);
  const result = students.filter((student) => students.enrolled);
  console.log(result);
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
  const array = [students.score];
  const result = students.map((student) => student.score);
  console.log(result);
}

// Q8. check if there is a student with the score lower than 50
{
  console.clear();
  const result = students.some((student) => student.score < 50);
  console.log(result);

  const result2 = students.every((student) => student.score < 50);
  console.log(result);
}

// Q9. compute students' average score
{
  // reduce 모든 배열을 돌면서 어떤 값을 누적시킬때 사용.
  const result = students.reduce((prev, curr) => prev + curr.score, 0);
  console.log(result/students.length);
}

// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
  const result = students.map((student) => student.score).join();
  console.log(result);
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
  const result = students
  .map(students => students.score)
  .sort((a, b) => a - b)
  .join(',');
  console.log(result);
}