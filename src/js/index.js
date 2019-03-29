// Carmen Creswell
// Assignment 4

'use strict';

import { get } from "https";

let currentDate = new Date();
let otherDate = new Date();
let loadingImg = document.getElementById("loader");
let eventsDateHolder = document.getElementById('eventDateHolder');

addEventListeners();

function getEvents(url) {
    fetch(url)
    .then(function(response) {
        let status = response.status;

        if (!response.ok) {
            document.getElementById("errorHolder").innerHTML = status + " " + response.statusText + ". Refresh to continue";
            //renderHome();
            loadingImg.style.display='none';
            addEventListeners();
            return
        }

        response.json().then(function(data) {
            let ul = document.getElementById('events');
    
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
    })
    
    .catch(function(error) {
        loadingImg.style.display='none';
        console.log(error);
        return
    })
}

function deleteEvents(){
    let ul = document.getElementById('events');
    while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }
}

if (location.pathname === '/') {
    renderHome();
} else if (/\/\d+\-\d+\-\d+/.test(location.pathname)) {
    renderIndex(location.pathname.replace('/', ''));
} else {
    render404();
}

window.addEventListener('popstate', () => {
	renderIndex(parseInt(location.pathname.replace('/', '')));
}, false);

function renderIndex(url) {
    console.log(url);
    let date = new Date(url); 
    console.log(date);

    let day = date.getDate();
    let month = date.getMonth() + 1; // add one to accomodate the 0 indexed months
    let year = date.getFullYear();

    console.log(day);
    console.log(month);
    console.log(year);

    eventsDateHolder.innerText = month + "/" + day + "/" + year;

    let urlToPass = 'http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=' + month + "/" + day + "/" + year;
    console.log(urlToPass);
	getEvents(urlToPass);
}

function render404() {
	document.body.innerHTML = 'Unknown path. <a href="/">Start over</a>.';
}

function renderHome() {
    let date = new Date(); 
    console.log(date);

    let day = date.getDate();
    let month = date.getMonth() + 1; // add one to accomodate the 0 indexed months
    let year = date.getFullYear();

    let urlToPass = 'http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=' + month + "/" + day + "/" + year;

    getEvents(urlToPass);

    eventsDateHolder.innerText = month + "/" + day + "/" + year;

    addEventListeners();

}

function addEventListeners() {
    let back = document.getElementById("left-button");
    let forward = document.getElementById("right-button");

    back.addEventListener("click", function () {
        deleteEvents();
        loadingImg.style.display='inline';

        otherDate.setDate(otherDate.getDate() - 1);

        let day = otherDate.getDate();
        let month = otherDate.getMonth() + 1; // add one to accomodate the 0 indexed months
        let year = otherDate.getFullYear();

        let url = 'http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=' + month + "/" + day + "/" + year;

        history.pushState({}, null, "/" + month + "-" + day + "-" + year);
        eventsDateHolder.innerText = month + "/" + day + "/" + year;
        getEvents(url);
        
    })

    forward.addEventListener("click", function() {
        deleteEvents();
        loadingImg.style.display='inline';

        otherDate.setDate(otherDate.getDate() + 1);

        let day = otherDate.getDate();
        let month = otherDate.getMonth() + 1; // add one to accomodate the 0 indexed months
        let year = otherDate.getFullYear();

        let url = 'http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=' + month + "/" + day + "/" + year;
        
        history.pushState({}, null, "/" + month + "-" + day + "-" + year);
        eventsDateHolder.innerText = month + "/" + day + "/" + year;

        getEvents(url);
    })
}