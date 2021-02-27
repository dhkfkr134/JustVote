// script.js
var button = document.getElementById('findButton');
var bookName = document.getElementById('bookName');
var cnt = 1;

button.addEventListener('click', clickButton);


function clickButton(){

  $.ajax({
    method: "GET",
    url: "https://dapi.kakao.com/v3/search/book?target=title",
    data: { query: "/"+bookName.value+"/" },
    headers: { Authorization: "KakaoAK bd88be02ce3d7af86b3724bcdb9c22f7" }
})
    .done(function (msg) {
        console.log(bookName.value);
        console.log(msg);
        console.log(msg.documents[0].thumbnail);
        $("p").append("<text>" + msg.documents[0].title + "</text>");
        $("p").append("<img src=" + msg.documents[0].thumbnail + "/>");
        $("p").append("<div></div>");
    });
}
