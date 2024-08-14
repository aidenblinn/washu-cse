// hide welcome screen

var closeButton = document.getElementById("close");
closeButton.addEventListener("click", close);

function close() {
  document.getElementById("start").remove();
}

// adding event listeners to every image

document.getElementById("album").addEventListener("mouseover", hover);
document.getElementById("album").addEventListener("mouseout", unhover);

// hover and unhover
function hover() {
  this.classList.add("hovered");
}

function unhover() {
  this.classList.remove("hovered");
}

// creating all music files
var a = new Audio("1.mp3");
var b = new Audio("2.mp3");
var c = new Audio("3.mp3");
var d = new Audio("4.mp3");
var e = new Audio("5.mp3");
var f = new Audio("6.mp3");
var g = new Audio("7.mp3");
var h = new Audio("8.mp3");
var i = new Audio("9.mp3");
var j = new Audio("10.mp3");
var k = new Audio("11.mp3");
var l = new Audio("12.mp3");

// controlling music of selected album
document.getElementById("play").addEventListener("click", playmusic)
function playmusic() {
  var str = document.getElementById("bigImg").src;
  console.log(str);
  var songnum = str.charAt(0);
  console.log(songnum);
  var song = String.fromCharCode(96 + parseInt(songnum));
  window[song].play();
}

document.getElementById("pause").addEventListener("click", stopmusic)
function stopmusic() {
  var str = document.getElementById("bigImg").src;
  var songnum = str.charAt(0);
  var song = String.fromCharCode(96 + parseInt(songnum));
  window[song].pause();
}

// when previous arrow clicked

var back = document.getElementById("backarrow");
back.addEventListener("click", previous);

function previous() {
  stopmusic(currentImg);
  var newNumber = parseInt(currentImg) - 1;
  if (newNumber == 0) {
    newNumber = 12;
  }
  var newId = newNumber.toString();
  currentImg = newId;
  document.getElementById("bigImg").src = "newId" + ".mp3";
  playmusic(currentImg);
}

// when next arrow clicked

var forward = document.getElementById("forwardarrow");
forward.addEventListener("click", next);

function next() {
  stopmusic(currentImg);
  var newNumber = parseInt(currentImg) + 1;
  if (newNumber == 13) {
    newNumber = 1;
  }
  var newId = newNumber.toString();
  var img  = document.getElementById(newId).firstElementChild;
  currentImg = newId;
  document.getElementById("bigImg").src = "newId" + ".mp3";
  playmusic(currentImg);
}

// LYRICS

var apiKey = "7167c5-bfb835-854571-ab06f9-e548e2";

// load existing lyrics
var existing = new XMLHttpRequest();
existing.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var lyrics = JSON.parse(this.responseText);
    for (var i = 0; i < lyrics.length; i++) {
      showLyric(lyrics[i]);
    }
  }
  else if (this.readyState == 4) {
    console.log(this.responseText);
  }
};
existing.open("GET", "https://cse204.work/todos", true);
existing.setRequestHeader("x-api-key", apiKey);
existing.send();

function showLyric(lyric) {
  var lyricLine = document.createElement("div");
  lyricLine.classList.add("lyric")
  lyricLine.setAttribute("id", lyric.id);
  var words = document.createElement("p");
  words.innerHTML = lyric.text;
  lyricLine.appendChild(words);
  document.getElementById("addNewComment").appendChild(commentElement);
  document.getElementById("input").value = "";
}

// add new lyric
document.getElementById("addLyric").addEventListener("click", function(event) {
  event.preventDefault();
  var data =  {
    text: document.getElementById("typeLyric").value
  }
  var createRequest = new XMLHttpRequest();
  createRequest.onreadystatechange = function() {
    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {
      // parse JSON response
      showLyric(JSON.parse(this.responseText));
    }
    else if (this.readyState == 4) {
      // this.status !== 200, error from server
      console.log(this.responseText);
    }
  }
  createRequest.open("POST", "https://cse204.work/todos", true);
  createRequest.setRequestHeader("Content-type", "application/json");
  createRequest.setRequestHeader("x-api-key", apiKey);
  createRequest.send(JSON.stringify(data));
});
