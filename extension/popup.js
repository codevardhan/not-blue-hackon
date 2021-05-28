var x=1
function appendRow()
{  
   var d = document.createElement('div');
   d.innerHTML += "<input type='text' id='tst"+ x++ +"'><br >";
    document.getElementById('additional').appendChild(d);
    
}

//let flag=document.getElementById("additional")
//if (flag){
//  console.log("yayy");
//}



document.addEventListener('submit', function(e) { 
e.preventDefault()   
  appendRow();
})