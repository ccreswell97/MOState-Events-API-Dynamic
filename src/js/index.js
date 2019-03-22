'use strict';

const ul = document.getElementById('events');
let date = '02/14/2019' 
const url = 'http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=' + date; 
let loadingImg = document.getElementById("loader");

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