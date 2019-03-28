// Carmen Creswell
// Assignment 4

'use strict';

const ul = document.getElementById('events');
let currentDate = new Date();
let otherDate = new Date();
let loadingImg = document.getElementById("loader");
let eventsDateHolder = document.getElementById('eventDateHolder');

let back = document.getElementById("left-button");
let forward = document.getElementById("right-button");
let mill = currentDate.getTime();

let day = currentDate.getDate();
let month = currentDate.getMonth() + 1; // add one to accomodate the 0 indexed months
let year = currentDate.getFullYear();

let url = 'http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=' + month + "/" + day + "/" + year;
eventsDateHolder.innerText = month + "/" + day + "/" + year;

getEvents(url);

back.addEventListener("click", function () {
    deleteEvents();
    otherDate.setDate(otherDate.getDate() - 1);

    let day = otherDate.getDate();
    let month = otherDate.getMonth() + 1; // add one to accomodate the 0 indexed months
    let year = otherDate.getFullYear();

    url = 'http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=' + month + "/" + day + "/" + year;

    eventsDateHolder.innerText = month + "/" + day + "/" + year;
    getEvents(url);
})

forward.addEventListener("click", function() {
    deleteEvents();
    otherDate.setDate(otherDate.getDate() + 1);

    let day = otherDate.getDate();
    let month = otherDate.getMonth() + 1; // add one to accomodate the 0 indexed months
    let year = otherDate.getFullYear();

    url = 'http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=' + month + "/" + day + "/" + year;

    eventsDateHolder.innerText = month + "/" + day + "/" + year;

    getEvents(url);
})

function getEvents(url) {
    fetch(url)
    .then(function(response) {
        let status = response.status;

        if (!response.ok) {
            document.getElementById("errorHolder").innerHTML = status + " " + response.statusText + ". Refresh to continue";
        }
        
        return response.json();
    })
    .then(function(data) {
        deleteEvents();

        errorHolder.innerText = "";
        
        for (let i = 0; i < data.feed.entry.length; i++) {
            let event = data.feed.entry[i].title.$t; 
            let li = document.createElement('li');
            li.innerText = event;
            ul.appendChild(li);
            loadingImg.style.display='none';
        }
    })
    .catch(function(error) {
        loadingImg.style.display='none';
        console.log(error);
    })
}

function deleteEvents(){
    while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }
}