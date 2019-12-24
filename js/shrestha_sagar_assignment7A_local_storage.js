/* Assignment 7A
   Sagar Shrestha
   shrestha_sagar_assignment7A_local_storage.js */

//Function to look up an HTML element by id and return the element
function gid(f1) {
    "use strict";
    return window.document.getElementById(f1);
}

//Function to check for and handle errors: if the input is blank, not a number, zero, or negative
function votesCheck() {
    "use strict";
    var errorText, votes;
    var result = true;
    for (var i = 1; i <= 3; i++) {
        errorText = gid("votesError" + i);
        errorText.innerHTML = "";
        votes = gid("votesCandidate" + i).value;
        try {
            if (votes === "") throw "blank";
            if (isNaN(votes)) throw "not a number";
            var x = Number(votes);
            if (votes <= 0) throw "zero or negative";
        } catch (error) {
            errorText.innerHTML = "Input is " + error;
            result = false;
        }
    }
    return result;
}

//Function to take an Array of numbers as a parameter and return the sum
function sum(arr) {
    "use strict";
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}

//Function which takes an Array of numbers as a parameter, and returns an array of percentages 
function pct(myArray) {
    "use strict";
    var sumOfArray = sum(myArray);
    for (var i = 0; i < myArray.length; i++) {
        var x = myArray[i] / sumOfArray;
        myArray[i] = x;
    }
    return myArray;
}

//Function which formats a number into a percentage
function formatPct(x) {
    "use strict";
    var y = ((x * 100).toFixed(1)) + " %";
    return y;
}

//Function to collect all the vote counts and return an Array, ordered by candidate, of their vote counts
function getInputNumbers() {
    "use strict";
    var myArray = [];
    myArray[0] = Number(gid("votesCandidate1").value);
    myArray[1] = Number(gid("votesCandidate2").value);
    myArray[2] = Number(gid("votesCandidate3").value);

    return myArray;
}

//Function to check whether localStorage is supported and then save the array containing the votes
var processVotes = function(array) {
    "use strict";
    if (typeof(Storage) !== "undefined") {
        try {
            for (var i = 0; i < array.length; i++) {
                localStorage.setItem("votes", JSON.stringify(array));
            }
        } catch (e) {
            console.log('localStorage quota exceeded!');
        }
    }
};

//Function to collect all the candidate names and return an Array
function getInputCandidates() {
    "use strict";
    var myArray = [];
    myArray[0] = gid("candidate1").value;
    myArray[1] = gid("candidate2").value;
    myArray[2] = gid("candidate3").value;

    return myArray;
}

//Function to check whether localStorage is supported and then save the array containing the candidate names
var processCandidates = function(array) {
    "use strict";
    if (typeof(Storage) !== "undefined") {
        try {
            for (var i = 0; i < array.length; i++) {
                localStorage.setItem("candidates", JSON.stringify(array));
            }
        } catch (e) {
            console.log('localStorage quota exceeded!');
        }
    }
};

//Function to collect all the parties and return an Array
function getInputParties() {
    "use strict";
    var myArray = [];
    myArray[0] = gid("party1").value;
    myArray[1] = gid("party2").value;
    myArray[2] = gid("party3").value;

    return myArray;
}

//Function to check whether localStorage is supported and then save the array containing the party names
var processParties = function(array) {
    "use strict";
    if (typeof(Storage) !== "undefined") {
        try {
            for (var i = 0; i < array.length; i++) {
                localStorage.setItem("parties", JSON.stringify(array));
            }
        } catch (e) {
            console.log('localStorage quota exceeded!');
        }
    }
};

//Function that accesses the localStorage when loading the page and populates the fields if not undefined
var initForm = function() {
    "use strict";
    if (typeof(Storage) !== "undefined") {
        var votes = localStorage.votes;
        if (votes && votes.length > 0) {
            var candidateVotes = JSON.parse(votes);
            for (var i = 0; i < candidateVotes.length; i++) {
                gid("votesCandidate" + Number(i + 1)).value = Number(candidateVotes[i]);
            }
        } else console.log("Cannot use the votes: " + votes);
        var candidates = localStorage.candidates;
        if (candidates && candidates.length > 0) {
            var candidateNames = JSON.parse(candidates);
            for (var i = 0; i < candidateNames.length; i++) {
                gid("candidate" + Number(i + 1)).value = candidateNames[i];
            }
        } else console.log("Cannot use the candidates: " + candidates);
        var parties = localStorage.parties;
        if (parties && parties.length > 0) {
            var partyNames = JSON.parse(parties);
            for (var i = 0; i < partyNames.length; i++) {
                gid("party" + Number(i + 1)).value = partyNames[i];
            }
        } else console.log("Cannot use the parties: " + parties);
    }
};

//Function to collect all the counts, get the sum of all votes, compute the percentages for each candidate, and place that result on the form in the correct locations
function update() {
    "use strict";
    //Error handling for date not parseable
    if (isNaN(Date.parse(gid("currentDate").value))) {
        gid("dateError").innerHTML = "This is an invalid date";
    }

    //Calling and evaluating to see if "votesCheck" function returns true before carrying out other actions
    if (votesCheck() === true) {
        processCandidates(getInputCandidates());
        processParties(getInputParties());
        var votesArray = getInputNumbers();
        processVotes(votesArray);

        var totalVotes = sum(votesArray);
        var pctVotes = pct(votesArray);

        gid("totalVotes").innerHTML = totalVotes;
        gid("percentCandidate1").innerHTML = formatPct(pctVotes[0]);
        gid("percentCandidate2").innerHTML = formatPct(pctVotes[1]);
        gid("percentCandidate3").innerHTML = formatPct(pctVotes[2]);
    } else {
        gid("totalVotes").innerHTML = "";
        gid("percentCandidate1").innerHTML = "";
        gid("percentCandidate2").innerHTML = "";
        gid("percentCandidate3").innerHTML = "";
    }
}

//Function that returns a date as an ISO string suitable to assigning to the input field's value property
function toISODate(date) { // in the format yyyy-mm-dd
    "use strict";
    var yyyy, mm, dd;
    yyyy = "" + date.getFullYear();
    mm = date.getMonth() + 1; // Months go from 0 .. 11
    dd = date.getDate();
    // Need leading zeroes to form the yyyy-mm-dd pattern.
    if (mm < 10) {
        mm = "0" + mm; // Converting to a string
    }
    if (dd < 10) {
        dd = "0" + dd; // Converting to a string
    }
    return "" + yyyy + "-" + mm + "-" + dd;
}

//Function that initializes the form and attaches the click action to the click button
function init() {
    "use strict";
    initForm();
    //Calling the "toISODate" function 
    var today = new Date();
    var isodate = toISODate(today);
    gid("currentDate").value = isodate;

    //Attaching the Calculate button to the "update" function
    var btn = gid("calculate1");
    btn.addEventListener("click", update);
}

//Assigning the "init" function to be called when the page is loaded
window.onload = init;