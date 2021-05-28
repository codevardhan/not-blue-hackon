var mailformat = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
var y=1,x=1;
document.addEventListener('DOMContentLoaded',function (){
const observer= new MutationObserver(function(mutaions){
  mutaions.forEach(function (mutaion){
    if(mutaion.addedNodes.length){
      document.addEventListener('submit', function(e) { 
        e.preventDefault();
        let temp =document.getElementById("email"+y++).value;
        if (emails.includes(temp)){

        }
        else{
          if (mailformat.exec(temp)){
            emails.push(temp)
          }else{
            document.getElementById("info").innerHTML = "Invalid Email";
          }
        }
        //console.log(emails)
        localStorage.setItem('email', emails);
        chrome.storage.sync.set({'email': emails}, function() {
        });
        console.log("DONE");
      });
    }
  })
});
const bears=document.getElementById('additional');
observer.observe(bears,{
  childList:true
})
});

function appendRow()
{  
  var d = document.createElement('div');
  if (x<=3){
  d.innerHTML += "<input type='text' id='email"+ x++ +"'><br >";
  document.getElementById('additional').appendChild(d);
  }
}

let user,user_email,prim;
let emails=[];
document.addEventListener('DOMContentLoaded',function (){
document.getElementById("add").addEventListener("click", function() {
  appendRow();
  });
});
let flag;
document.addEventListener('submit', function(e) { 
  e.preventDefault();
  console.log(x)
  user = document.getElementById("name").value;
  user_email = document.getElementById("email").value;
  prim=document.getElementById("email_pri").value;
  console.log(user,user_email,prim)
  if (mailformat.exec(prim) && mailformat.exec(user_email)){
    emails.push(user)
    emails.push(user_email)
    emails.push(prim)
  }
  else{
    flag=1
  }
  if (flag!=1){
  document.getElementById("info").innerHTML = "Successfully Registered!";}
  else{
    document.getElementById("info").innerHTML = "Invalid Email";

  }
  //<h2 class="greeting" id="greeting"></h2>
  localStorage.setItem('email', emails);
  chrome.storage.sync.set({'email': emails}, function() {
  });
})
document.addEventListener('DOMContentLoaded',function (){
if (localStorage.email){
  document.getElementById("info").innerHTML = "You have already registered";
}
});