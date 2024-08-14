// adding event listeners to every image

var images = document.getElementsByClassName("small");
for (i = 0; i < images.length; i++) {
  var currentImage = images[i];
  currentImage.addEventListener("click", zoomin);
  currentImage.addEventListener("mouseover", hover);
  currentImage.addEventListener("mouseout", unhover);

}

// hover and unhover
function hover() {
  if (document.getElementById("bigImg") == null) {
    this.classList.add("hovered");
  }
}

function unhover() {
  if (document.getElementById("bigImg") == null) {
    this.classList.remove("hovered");
  }
}

// when image is clicked

var currentImg = "";

function zoomin() {
  if (document.getElementById("bigImg") == null) {
    var img  = this.firstElementChild;
    currentImg = this.id;
    var bigImg = document.createElement("img");
    bigImg.src = img.src;
    bigImg.alt = img.alt;
    bigImg.setAttribute("id", "bigImg");

    document.getElementById("clicked").appendChild(bigImg);
    document.getElementById("clicked").classList.remove("hidden");
    document.getElementById("clicked").classList.add("shown");
    document.getElementById("overlay").classList.remove("hidden");

    checkArrows(currentImg);
    playmusic(currentImg);
  }
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

function playmusic(Id) {
  var song = String.fromCharCode(96 + parseInt(Id));
  window[song].play();
}

function stopmusic(Id) {
  var song = String.fromCharCode(96 + parseInt(Id));
  window[song].currentTime = 0;
  window[song].pause();
}

// when previous arrow clicked

var back = document.getElementById("backarrow");
back.addEventListener("click", previous);

function previous() {
  stopmusic(currentImg);
  checkArrows(currentImg);
  var newNumber = parseInt(currentImg) - 1;
  var newId = newNumber.toString();
  checkArrows(newId);
  var img  = document.getElementById(newId).firstElementChild;
  currentImg = newId;
  document.getElementById("bigImg").src = img.src;
  document.getElementById("bigImg").alt = img.alt;
  playmusic(currentImg);
}

// when next arrow clicked

var forward = document.getElementById("forwardarrow");
forward.addEventListener("click", next);

function next() {
  stopmusic(currentImg);
  checkArrows(currentImg);
  var newNumber = parseInt(currentImg) + 1;
  var newId = newNumber.toString();
  checkArrows(newId);
  var img  = document.getElementById(newId).firstElementChild;
  currentImg = newId;
  document.getElementById("bigImg").src = img.src;
  document.getElementById("bigImg").alt = img.alt;
  playmusic(currentImg);
}

// check if an arrow should be hidden
function checkArrows(Id) {
  if (Id == "12") {
    document.getElementById("forwardarrow").classList.add("hidden");
  }
  else if (Id == "1") {
    document.getElementById("backarrow").classList.add("hidden");
  }
  else {
    document.getElementById("backarrow").classList.remove("hidden");
    document.getElementById("forwardarrow").classList.remove("hidden");
  }
}

// when close button is clicked

var closeButton = document.getElementById("close");
closeButton.addEventListener("click", close);


function close() {
  document.getElementById("bigImg").remove();
  document.getElementById("clicked").classList.add("hidden");
  document.getElementById("clicked").classList.remove("shown");
  document.getElementById("overlay").classList.add("hidden");
  stopmusic(currentImg);
}
