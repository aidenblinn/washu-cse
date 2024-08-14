//display certain elements based on login state to hide unavailable functions
checksession();
function checksession() {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "checksession.php", true);
  xmlHttp.addEventListener("load",function(event) {
    const response = JSON.parse(event.target.responseText);
    if (response.user != null) {
      document.getElementById("login").style.display = 'none';
      document.getElementById("signup").style.display = 'none';
      document.getElementById("user").style.display = 'none';
      document.getElementById("pass").style.display = 'none';
      document.getElementById("logout").style.display = 'inline-block';
      document.getElementById("whose").innerHTML = response.user + "'s Calendar";
      var form = document.getElementsByClassName("form");
      for (var i = 0; i < form.length; i ++) {
        form[i].style.display = 'block';
      }
    }
    else {
      document.getElementById("login").style.display = 'inline-block';
      document.getElementById("signup").style.display = 'inline-block';
      document.getElementById("user").style.display = 'inline-block';
      document.getElementById("pass").style.display = 'inline-block';
      document.getElementById("logout").style.display = 'none';
      document.getElementById("whose").innerHTML = "Calendar";
      var form = document.getElementsByClassName("form");
      for (var i = 0; i < form.length; i ++) {
        form[i].style.display = 'none';
      }    }
  },false);
  xmlHttp.send();
}

//login function
document.getElementById("login").addEventListener("click", login, false);
function login(event) {
  //get username and password
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;
  document.getElementById("user").value = "";
  document.getElementById("pass").value = "";
  const login = "user=" + encodeURIComponent(user) + "&pass=" + encodeURIComponent(pass);
  //send request to check if valid and if so log in
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "login.php", true);
  xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHttp.addEventListener("load",function(event) {
    //render events and show/hide relevant elements after successful login
    const response = JSON.parse(event.target.responseText);
    alert(response.message);
    checksession();
    renderEvents();
  },false);
  xmlHttp.send(login);
  //change token from that of initial page load if logging in with different account
  const xmlHttp2 = new XMLHttpRequest();
  xmlHttp2.open("POST", "gettoken.php", true);
  xmlHttp2.addEventListener("load",function(event){
    const response = JSON.parse(event.target.responseText);
    token = response.token;
  }, false);
  xmlHttp2.send();
}

//logout function
document.getElementById("logout").addEventListener("click", logout, false);
function logout(event) {
  //request to logout script
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "logout.php", true);
  xmlHttp.addEventListener("load",function(event) {
    //reset token and remove events now that logged out
    token = "";
    checksession();
    renderEvents();
  },false);
  xmlHttp.send();
}

//signup function
document.getElementById("signup").addEventListener("click", signup, false);
function signup(event) {
  //gather user and pass, create request to account script
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;
  const login = "user=" + encodeURIComponent(user) + "&pass=" + encodeURIComponent(pass);
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "makeaccount.php", true);
  xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlHttp.addEventListener("load",function(event) {
    const response = JSON.parse(event.target.responseText);
    alert(response.message)
    //change visibility of certain elements upon successful login
    if (response.success) {
      checksession();
    }
  },false);
  xmlHttp.send(login);
}
