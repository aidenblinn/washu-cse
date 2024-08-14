// hide welcome screen
var closeButton = document.getElementById("close");
closeButton.addEventListener("click", close);

function close() {
  document.getElementById("start").remove();
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

function getSongString() {
  var str = document.getElementById("bigImg").src;
  var song1 = str.charAt(59);
  var song2 = str.charAt(60);
  var song3 = song1.concat(song2);
  return song3;
}

// controlling music of selected album
var tracker = 0;

document.getElementById("play").addEventListener("click", playmusic)
function playmusic() {
  tracker = 1;
  var song3 = getSongString();
  var song = String.fromCharCode(96 + parseInt(song3));
  window[song].play();
}


document.getElementById("pause").addEventListener("click", stopmusic)
function stopmusic() {
  tracker = 0;
  var song3 = getSongString();
  var song = String.fromCharCode(96 + parseInt(song3));
  window[song].pause();
}

// when previous arrow clicked

var back = document.getElementById("backarrow");
back.addEventListener("click", previous);

function previous() {
  var current = tracker;
  stopmusic();
  if (current == 1) {
    tracker = 1;
  }
  var song3 = getSongString();
  console.log(song3);
  var newNumber = parseInt(song3) - 1;
  if (newNumber == 0) {
    newNumber = 12;
  }
  var newId = newNumber.toString();
  if (newNumber < 10) {
    var zero = "0";
    newId = zero.concat(newNumber);
  }
  console.log(newId);
  document.getElementById("bigImg").src = newId + ".jpg";
  if (tracker == 1) {
    playmusic();
  }
}

// when next arrow clicked

var forward = document.getElementById("forwardarrow");
forward.addEventListener("click", next);

function next() {
  var current = tracker;
  stopmusic();
  if (current == 1) {
    tracker = 1;
  }
  var song3 = getSongString();
  var newNumber = parseInt(song3) + 1;
  if (newNumber == 13) {
    newNumber = 1;
  }
  var newId = newNumber.toString();
  if (newNumber < 10) {
    var zero = "0";
    newId = zero.concat(newNumber);
  }
  document.getElementById("bigImg").src = newId + ".jpg";
  if (tracker == 1) {
    playmusic();
  }
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
  words.classList.add("lyricParagraph");
  words.innerHTML = lyric.text;
  lyricLine.appendChild(words);
  document.getElementById("inputlyrics").appendChild(lyricLine);
  document.getElementById("typeLyric").value = "";
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

// load wikipedia page

var artistWiki = new XMLHttpRequest();
artistWiki.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    addBio(JSON.parse(this.responseText));
  }
  else if (this.readyState == 4) {
    console.log(this.responseText);
  }
};
artistWiki.open("GET", "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=Dua_Lipa&formatversion=2&exsentences=10&exlimit=1&explaintext=1&origin=*", true);
artistWiki.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
artistWiki.send();

function addBio(text) {
  var content = text.query.pages[0].extract;
  document.getElementById("DuaLipa").innerHTML = content;
}
