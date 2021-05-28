var x=1
function appendRow()
{  
   var d = document.createElement('div');
   if (x<=3){
   d.innerHTML += "<input type='text' id='tst"+ x++ +"'><br >";
    document.getElementById('additional').appendChild(d);
   }

    
}

let user
document.addEventListener('DOMContentLoaded',function (){
document.getElementById("add").addEventListener("click", function() {
  console.log("Hello World");
  });
});

document.addEventListener('submit', function(e) { 
  e.preventDefault();
  user = document.getElementById("name").value;
  console.log(user);  
  appendRow();
})