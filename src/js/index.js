'use strict';

const ul = document.getElementById('events');
//let date = '02/14/2019'; 
let currentDate = new Date();
//const url = 'http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=' + date; 
let loadingImg = document.getElementById("loader");

let back = document.getElementById("left-button");
let forward = document.getElementById("right-button");
let mill = currentDate.getMilliseconds();
console.log("Milliseconds: " + mill);

back.addEventListener("click", function () {
    currentDate = (mill * 60) * 86400;

})

forward.addEventListener("click", function() {
    currentDate = (mill * 60) * 86400;
})

let day = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();

let url = 'http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=' + month + "/" + day + "/" + year;
console.log(currentDate);
console.log(day);
console.log(url);

fetch(url)
.then(function(response) {
    let status = response.status;
    console.log(status);

    if (!response.ok) {
        document.getElementById("errorHolder").innerHTML = status + " " + response.statusText + ". Refresh to continue";
    }

    return response.json();
})
.then(function(data) {
    console.log(data);

    loadingImg.style.display='none';
    
    for (let i = 0; i < data.feed.entry.length; i++) {
        let event = data.feed.entry[i].title.$t; 
        let li = document.createElement('li');
        li.innerText = event;
        ul.appendChild(li);
    }
})
.catch(function(error) {
    loadingImg.style.display='none';
    console.log(error);
});