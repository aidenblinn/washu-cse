//get token on initialization of page in case already logged in
var token = null;
const xmlHttp = new XMLHttpRequest();
xmlHttp.open("POST", "gettoken.php", true);
xmlHttp.addEventListener("load",function(event){
  const response = JSON.parse(event.target.responseText);
  token = response.token;
}, false);
xmlHttp.send();

//this gathers events for the user and puts them all in the alendar
function renderEvents() {
  //delete all current events on page to start over
  var todelete = document.getElementsByClassName("listing");
  const max = todelete.length;
  for (i = 0; i < max; i++) {
    todelete[0].remove();
  };
  //get month and year of events to be shown
  const month = currentMonth.month;
  const year = currentMonth.year
  var events = "month=" + encodeURIComponent(month) + "&year=" + encodeURIComponent(year);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "getevents.php", true);
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttp.addEventListener("load",function(event) {
    const response = JSON.parse(event.target.responseText);
    for(i = 0; i < response.length; i++) {
      //create div for event listing
      const day = "day-" + String(response[i][1]);
      var newevent = document.createElement("div");
      newevent.setAttribute("class","listing");
      //fill event listing with name and time
      var title = document.createElement("p");
      title.innerHTML = response[i][0];
      title.setAttribute("class","eventname")
      var time = document.createElement("p");
      time.innerHTML = response[i][2].slice(-8,-3) + ": ";
      time.setAttribute("class","eventtime");
      //add delete button to event listing
      var button = document.createElement("input");
      button.setAttribute("type","button");
      button.setAttribute("value","Delete");
      button.setAttribute("name","event-" + response[i][3]);
      button.setAttribute("id","event-" + response[i][3]);
      button.setAttribute("class","deletebutton");
      button.setAttribute("onClick","deleteevent(" + response[i][3] + ")")
      //add share button
      var button1 = document.createElement("input");
      button1.setAttribute("type","button");
      button1.setAttribute("value","Share");
      button1.setAttribute("name","share-" + response[i][3]);
      button1.setAttribute("id","share-" + response[i][3]);
      button1.setAttribute("class","sharebutton");
      button1.setAttribute("onClick","shareevent(" + response[i][3] + ")")
      newevent.appendChild(time);
      newevent.appendChild(title);
      //add tag if user chose one
      if (response[i][4] != null) {
        var tag = document.createElement("p");
        tag.innerHTML = response[i][4];
        tag.setAttribute("class", response[i][4]);
        newevent.appendChild(tag);
      }
      // newevent.appendChild(button1);
      newevent.appendChild(button);
      //append to proper location in calendar
      document.getElementById(day).appendChild(newevent);
    }
  },false);
  xmlHttp.send(events);
}

//add event when button clicked
document.getElementById("addevent").addEventListener("click", addevent, false);
function addevent(event) {
  //get relevant event info and format it correctly
  const title = document.getElementById("title").value;
  const date = document.getElementById("datepicker").value;
  const year = date.substring(0,4);
  var month = parseInt(date.substring(5,7));
  month = month - 1;
  month = String(month);
  const day = date.substring(8,10);
  const time = document.getElementById("time").value + ":00";
  var tag = null;
  const taglist = document.getElementsByName("tag");
  //add tag if chosen
  for(i = 0; i < taglist.length; i++) {
    if (taglist[i].checked) {
      tag = taglist[i].value
    }
  }
  //reset values of input fields
  document.getElementById("title").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("time").value = "";
  //create request and assemble relevant variables to be put in table
  const eventinfo = "title=" + encodeURIComponent(title) + "&year=" + encodeURIComponent(year) + "&month=" + encodeURIComponent(month)
  + "&day=" + encodeURIComponent(day) + "&time=" + encodeURIComponent(time) + "&token=" + encodeURIComponent(token) + "&tag=" + encodeURIComponent(tag);
  if (date == "" || title == "" || time == "") {
    alert("Please fill out all required fields");
  }
  else {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "addevent.php", true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load",function(event) {
      const response = JSON.parse(event.target.responseText);
    },false);
    xmlHttp.send(eventinfo);
  };
  //update calendar to include new event
  updateCalendar();
}

function deleteevent(event_id) {
  const eventinfo = "event_id=" + encodeURIComponent(event_id) + "&token=" + encodeURIComponent(token);
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "deleteevent.php", true);
  xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHttp.addEventListener("load",function(event) {
    updateCalendar();
  },false);
  xmlHttp.send(eventinfo);
}

function shareevent(event_id) {
  const eventinfo = "event_id=" + encodeURIComponent(event_id) + "&token=" + encodeURIComponent(token);
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "shareevent.php", true);
  xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHttp.addEventListener("load",function(event) {
    const response = JSON.parse(event.target.responseText);
    console.log(response);
  },false);
  xmlHttp.send(eventinfo);
}
