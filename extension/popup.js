function openSettings() {
  document.getElementById("settings").classList.toggle("settings-open");
}

document.getElementById("settings-button").addEventListener('click', openSettings)
var user;

function saveName() {
  localStorage.setItem('email', user);
  chrome.storage.sync.set({'email': user}, function() {
  });
}

var user = localStorage.getItem('email');


if (user == null) {
  user = "friend";
}
function changeName() {
  user = document.getElementById("name-input").value;
  var mailformat = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
  console.log(mailformat.exec(user));
  if(mailformat.exec(user))
  {
    console.log("You have entered a valid email address!");    //The pop up alert for a valid email address
    saveName();
    addEmail();
  }
  else{
    errorCode();
  }

}

document.getElementById("name-form").addEventListener('submit', function(e) { 
  e.preventDefault()   
  changeName();
});

function addEmail() {
  document.getElementById("greeting").innerHTML  = `${user} Added!`;
}

function errorCode() {
  document.getElementById("greeting").innerHTML  = `Enter valid Email !`;
}

document.addEventListener('DOMContentLoaded',addEmail())