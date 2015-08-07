'use strict';

/*
Mock Data
 */

var peopleData = [{
  "firstName": "Jennifer",
  "lastName": "Olson",
  "status": "Approved"
}, {
  "firstName": "Catherine",
  "lastName": "Graham",
  "status": "Approved"
}, {
  "firstName": "Margaret",
  "lastName": "Hughes",
  "status": "Approved"
}, {
  "firstName": "Keith",
  "lastName": "Franklin",
  "status": "Pending"
}, {
  "firstName": "Susan",
  "lastName": "Jackson",
  "status": "Approved"
}, {
  "firstName": "Justin",
  "lastName": "Austin",
  "status": "Approved"
}, {
  "firstName": "Paula",
  "lastName": "Kim",
  "status": "Denied"
}, {
  "firstName": "Martin",
  "lastName": "Franklin",
  "status": "Denied"
}, {
  "firstName": "Johnny",
  "lastName": "Porter",
  "status": "Pending"
}, {
  "firstName": "Tammy",
  "lastName": "Medina",
  "status": "Denied"
}, {
  "firstName": "Brian",
  "lastName": "Lane",
  "status": "Denied"
}, {
  "firstName": "Clarence",
  "lastName": "Palmer",
  "status": "Approved"
}, {
  "firstName": "Howard",
  "lastName": "Stanley",
  "status": "Approved"
}, {
  "firstName": "Diane",
  "lastName": "Flores",
  "status": "Approved"
}, {
  "firstName": "Deborah",
  "lastName": "Fields",
  "status": "Denied"
}, {
  "firstName": "Sarah",
  "lastName": "Meyer",
  "status": "Approved"
}, {
  "firstName": "Ruth",
  "lastName": "Jordan",
  "status": "Approved"
}, {
  "firstName": "Michael",
  "lastName": "Lawrence",
  "status": "Denied"
}, {
  "firstName": "Anna",
  "lastName": "Burton",
  "status": "Denied"
}, {
  "firstName": "Bobby",
  "lastName": "Evans",
  "status": "Denied"
}];

/*
View Components
 */

/**
 * View component to display a person.
 * 
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} status
 */
function PersonComponent(firstName, lastName, status) {
    this.firstName = formatProperNoun(firstName);
    this.lastName = formatProperNoun(lastName);
    this.status = formatProperNoun(status);
}

PersonComponent.prototype.render = function() {
    var el = document.createElement('tr');
    el.innerHTML =
        '<td>' + this.lastName + ', ' + this.firstName + '</td>' +
        '<td>' + this.status + '</td>';
    return el;
};

PersonComponent.prototype.getFullName = function() {
    return this.lastName + ', ' + this.firstName;
};

/*
App Load
 */

var personComponents = [];

document.addEventListener('DOMContentLoaded', init());

function init() {
    // populate component list from existing data.
    for (var i = 0, n = peopleData.length; i < n; ++i) {
        var personData = peopleData[i];
        personComponents.push(new PersonComponent(personData.firstName, personData.lastName, personData.status));
    }

    // sort
    sortPersonComponents();

    // render initial table
    renderTable();

    // hook up events
    var form=document.forms[0];

    form.addEventListener('input',function(e){
    	e.stopPropagation();

    	this.firstName.value = formatProperNoun(this.firstName.value);
    	this.lastName.value = formatProperNoun(this.lastName.value);
    	this.status.value = formatProperNoun(this.status.value);
    });

    form.addEventListener('submit', function(e) {
    	e.preventDefault();
    	e.stopPropagation();

        addPerson(this.firstName.value, this.lastName.value, this.status.value);

        this.reset();
    });
}

/*
Functionality Methods
 */

function formatProperNoun(str) {
    str = str || '';

    var properNoun = str.charAt(0).toUpperCase();
    if (str.length > 1) {
        properNoun += str.substring(1).toLowerCase();
    }

    return properNoun;
}

function clearTable() {
    var peopleContainer = document.getElementsByTagName('tbody')[0];

    while (peopleContainer.firstChild !== null) {
        peopleContainer.removeChild(peopleContainer.firstChild);
    }
}

function renderTable() {
    var peopleContainer = document.getElementsByTagName('tbody')[0];
    for (var i = 0, n = personComponents.length; i < n; ++i) {
        var personComponent = personComponents[i];
        peopleContainer.appendChild(personComponent.render());
    }
}

function sortPersonComponents() {
    // sort
    personComponents.sort(function(a, b) {
        var fullNameA = a.getFullName();
        var fullNameB = b.getFullName();

        if (fullNameA < fullNameB)
            return -1;
        else if (fullNameA === fullNameB) {
            if (a.status < b.status)
                return -1;
            return 1;
        } else
            return 1;
    });
}

function addPerson(firstName, lastName, status) {
    // Doing this since it's a tiny app otherwise I would utilize DOM references and insert into the table vs re-rendering all.
    // Programming in a React, component, or game design fashion is much cleaner and fun.
    clearTable();

    // this would normally be done as part of a table component.
    // for the example only.
    var person = new PersonComponent(firstName, lastName, status);
    personComponents.push(person);
    sortPersonComponents();

    // re-render table
    renderTable();

    // save person to server
    savePerson(person).then(function(responseText) {
        console.log('save success: ' + responseText);
    }).catch(function(statusText) {
        console.log('save error status: ' + statusText);
    });
}

/*
AJAX
 */

// simple form of javascript ajax without using third-party module.
// I built a simple http module a while back like so many others to not be buried in jquery
// but after gaining massive amounts of knowledge I will be making a new lightwieght PreloadJS style one when I get a few days
// for getting into the future of WebGL assets and custom size loading.
function savePerson(personData) {
    var promise = new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function() {
            if (this.status === 200 ||
                this.status === 4) {
                resolve(JSON.parse(this.responseText));
            } else {
                reject(this.statusText);
            }
        };

        xhr.open('post', '/member/save”', true);
        xhr.send(JSON.stringify(personData));
    });
    return promise;
}
