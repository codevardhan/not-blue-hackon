function send(query){
    var myHeaders = new Headers();
    var flag;
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "search-term": query
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://check-ml-api.eastus.cloudapp.azure.com/predict", requestOptions)
      .then(response => response.text())
      .then(function (result) {
        flag=result
        chrome.storage.sync.get('email', function(items) {
        temp=items.email
        console.log(temp)})
        setTimeout(() => {
          let current_score=JSON.parse(flag).score;
          //console.log("Done");
          if (localStorage.last_score){
            if (localStorage.w){}else{
              localStorage.setItem("w",1.0);
            }
            var final_score=(parseFloat(localStorage.last_score)+(current_score)*localStorage.w)/2;
            localStorage.setItem("last_score",final_score);
            if (parseFloat(localStorage.w)<=2.0){
              let new_w=parseFloat(localStorage.w)+parseFloat(0.1)
              localStorage.setItem("w",parseFloat(new_w));
            }
            console.log("Update made")
            //console.log("Weight is "+ localStorage.w);
            //console.log("New score " + final_score);
          }else{
            localStorage.setItem("last_score",current_score);
            localStorage.setItem("w",1.0);
            console.log("Added new")
            //console.log(current_score)
          }
          if ((parseFloat(localStorage.last_score))>=0.80){
            localStorage.setItem("w",1.0);
            localStorage.setItem("last_score",0.0);
            chrome.runtime.sendMessage({ from: 'content_script', message: 'Notification sent' });
            mails()
            console.log("Notification sent")
          }
          console.log(localStorage.last_score)
          console.log(localStorage.w)
        }, 1000);
      })
      .catch(error => console.log('error', error));
}  

function mails(){
  var temp;
  console.log("Mail Start")
  chrome.storage.sync.get('email', function(items) {
    temp=items.email
    console.log(temp)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YWRtaW46aGFyc2hpc2FzZXh5YmVhc3Q=");
    myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify(temp);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://check-ml-api.eastus.cloudapp.azure.com/email", requestOptions)
  .then(response => response.text())
  .then(function (result) {
  setTimeout(() => {}, 1000);})
  .catch(error => console.log('error', error));
});
}



document.addEventListener('DOMContentLoaded', function () {
    let url= window.location.href;
    let ar = url.split('/');
    let missile;
    //console.log(emails)
    if (ar[2]=="www.google.com" || ar[2]=="www.bing.com" || ar[2]=="duckduckgo.com"){
        let engine=ar[2];
        let search=ar.pop().split('q=');
        let pharses=search.pop().split('&');
        let query=pharses[0].split("+").join(" ");
        missile={
            engine:engine,
            query:query
        }
        console.log(missile);
      } else if (ar[2].split(".").includes("yahoo")){
        let engine=ar[2];
        let search=ar.pop().split('p=');
        let pharses=search[1].split('&');
        let query=pharses[0].split("+").join(" ");
        missile={
            engine:engine,
            query:query
        }
        console.log(missile);
      } else if (ar[2]=="www.youtube.com"){
        let engine=ar[2];
        let search=ar.pop().split('query=');
        let pharses=search.pop().split('&');
        let query=pharses[0].split("+").join(" ");
        missile={
            engine:engine,
            query:query
        }
        console.log(missile);
      }else if (ar[2].split(".").includes("amazon")){
        let engine=ar[2];
        let search=ar.pop().split('k=');
        let pharses=search[1].split('&');
        let query=pharses[0].split("+").join(" ");
        missile={
            engine:engine,
            query:query
        }
        console.log(missile);
    }else if (ar[2].split(".").includes("facebook")){
        let engine=ar[2];
        let search=ar.pop().split('q=');
        let pharses=search[1];
        let query=pharses.split("%20").join(" ");
        missile={
            engine:engine,
            query:query
        }
        console.log(missile);
    }else if (ar[2].split(".").includes("instagram")){
        let engine=ar[2];
        missile={
            engine:engine,
            query:ar[ar.length-2]
        }
        console.log(missile);
    }
    let ans= send(missile.query);
    

});
