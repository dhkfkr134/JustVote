
// Fetch the items from the JSON file
// fetch는 간단하게 데이터를 네트워크를 통해서 가져옴
function loadItems() {
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.items);
}

// 주어진 아이템들을 리스트로 변환
// ++
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// HTML에 data Item 리스트로 추가
function createHTMLString(item) {
  return `
    <li class="item">
      <img src=${item.image}" alt="${item.type}" class="item__thumnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
      `; // 문자열을 리턴할 것임.
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if(key == null || value == null) {
    return;
  }

  displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
  // 이벤트 위임, 하나 하나의 이벤트 리스너를
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems() // promise를 리턴하도록 만들자.
.then(items => {
  displayItems(items);
  setEventListeners(items)
})
.catch(console.log);
// 큰 전략을 짜고 하나하나 구현하자.

