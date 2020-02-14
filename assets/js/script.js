// ============================================================
// Initializer
// ============================================================

// Variables
let subjectNr = 0;
let titles = [];
let statements = [];
let numberOfSteps = 0;
let userOpinion = [];                       //This array keeps tabs on answers given.
let orderedPartyOpinionCounter = [];        //This array keeps tabs on the score based on the answers given in alphabetical order.
let partyOpinionPerSubjectAdd = [];         //This array keeps tabs on the opinions of the parties per subject in alphabetical order.
let partyOpinionPerSubjectSubtract = [];    //This array keeps tabs on the opinions of the parties per subject in alphabetical order.
let orderedParties = [];                    //This is the parties array, in alphabetical order.



// DOM elements
let title = document.getElementById("title");
let description = document.getElementById('description');
let buttonContainer = document.getElementById("buttons");
let bar = document.getElementById('progress-bar');

// ============================================================
// Initialization of Arrays
// ============================================================

setupPartyOpinionArray(partyOpinionPerSubjectAdd);
setupPartyOpinionArray(partyOpinionPerSubjectSubtract);

//To initialize the partyOpinionCounter array. Sets values to zero and changes to alphabetical order.
(function() {
    let partyOpinionCounter = [];
    for (let partyOpinionNumber = 0; partyOpinionNumber < parties.length; partyOpinionNumber++) {
        partyOpinionCounter[parties[partyOpinionNumber]['name']] = 0;
    }
    //To change the partyOpinionCounter array to alphabetical order by key.
    Object.keys(partyOpinionCounter).sort().forEach(function(key){
        orderedPartyOpinionCounter[key] = partyOpinionCounter[key];
    });
}());

//To initialize the partyOpinionPerSubject Array. Fills the array with opinion of parties
function setupPartyOpinionArray(array){
    let sortedParties = [];
    //looping through object per subject
    for (subject= 0; subject < subjects.length; subject++) {

        //To sort subjects[subject].parties array in alphabetical order.
        sortedParties[subject] = subjects[subject].parties.sort((a, b) => (a.name > b.name) ? 1:-1);

        //To add multidimensional array properties to array.
        array.push([subject, subject]);

        //looping per subject's parties
        for (party = 0; party < subjects[subject]['parties'].length; party++) {
            array[subject][party] = sortedParties[subject][party]['position'];
        }
    }
}

// To reset the order of the parties array.
(function () {
    orderedParties = parties.sort((a, b) => (a.name > b.name) ? 1:-1);

    //BandAid - somehow when ordering the parties array, the Libertarische Partij gets doubled.
    orderedParties.splice(10,1);
}());

// ============================================================
// Initialization of elements
// ============================================================

//To render the start screen.
(function () {
    document.getElementById('nextArrow-box').style.display = 'none';
    document.getElementById('previousArrow-box').style.display = 'none';

    let startBtn = document.createElement('button');
    startBtn.innerHTML = "Start";
    startBtn.className = "w3-button w3-black";
    startBtn.onclick  = function(){
        removeFunc(buttonContainer, startBtn);
        start(subjectNr, numberOfSteps);
    };
    buttonContainer.appendChild(startBtn);
}());

//To remove elements from container.
//@param container - the container of the removable element.
//@param element - the element to be deleted.
function removeFunc(container, element){
    container.removeChild(element);
}

// Function to initialize setup.
// @param subject - the subject to start with
// @param step - the step for the progress-bar
function start(subject, step){

    //Initialize buttons
    document.getElementById('nextArrow-box').style.display = 'inline-block';
    let previousArrow = document.getElementById('previousArrow-box');
    previousArrow.style.display = 'inline-block';
    previousArrow.onclick = function(){
        if (subject > 0) {
            previousSubject(--subject);
            previousStep(step--);
            substractOpinion();
            userOpinion.pop();

        }
    };

    let agreeBtn = document.createElement('button');
    agreeBtn.innerHTML = "Eens";
    agreeBtn.className = "w3-button w3-black button";
    agreeBtn.onclick = function(){
        nextSubject(++subject);
        nextStep(++step);
        userOpinion.push("pro");
        addOpinions('pro');
    };

    let noneBtn = document.createElement('button');
    noneBtn.innerHTML = "Geen van beide";
    noneBtn.className = "w3-button w3-black button";
    noneBtn.onclick = function(){
        nextSubject(++subject);
        nextStep(++step);
        userOpinion.push("none");
        addOpinions('none');
    };

    let disagreeBtn = document.createElement('button');
    disagreeBtn.innerHTML = "Oneens";
    disagreeBtn.className = "w3-button w3-black button";
    disagreeBtn.onclick = function(){
        nextSubject(++subject);
        nextStep(++step);
        userOpinion.push("contra");
        addOpinions('contra');
    };

    buttonContainer.appendChild(agreeBtn);
    buttonContainer.appendChild(noneBtn);
    buttonContainer.appendChild(disagreeBtn);

    nextSubject(subject);
    nextStep(numberOfSteps);
}

// ============================================================
// Subjects
// ============================================================


//Function to go to next subject.
// @param subject - number of subject.
function nextSubject(subject){
    let obj = subjects[subject];

    // Next title
    titles[subject] = document.createElement('h2');
    titles[subject].innerHTML = (subject+1) + ". " + obj.title;
    title.appendChild(titles[subject]);

    // Next statement
    statements[subject] = document.createElement('p');
    statements[subject].innerHTML = obj.statement;
    description.appendChild(statements[subject]);

    if (subject !== 0){
        title.removeChild(titles[subject-1]);
        description.removeChild(statements[subject-1]);
    }
}

//Function to go to previous subject.
// @param subject - number of subject.
function previousSubject(subject){
    if (subject >= 0) {
        // TITLE
        title.appendChild(titles[subject]);

        //STATEMENT
        description.appendChild(statements[subject]);

        title.removeChild(titles[subject + 1]);
        description.removeChild(statements[subject + 1]);
    }
}

// Function to add opinion in the orderedPartyOpinionCounter.
// @param opinion - user input 'pro', 'none' or 'contra'.
function addOpinions(opinion){
    console.log(opinion);
     for (let subject = 0; subject < userOpinion.length; subject++){
        if (userOpinion[subject].includes(opinion)){
            // loops through the partyOpinionPerSubject array and uses the found index to filter the opinion.
            // indexOf function will only fetch 1 value if not looped.
            for (let loop = 0; loop < partyOpinionPerSubjectAdd[subject].length; loop++) {
                let indexOfOpinion = partyOpinionPerSubjectAdd[subject].indexOf(opinion);
                partyOpinionPerSubjectAdd[subject][indexOfOpinion] = "";

                //the filtered opinion is now used to add +1 value to the orderedPartyOpinionCounter
                if (indexOfOpinion !== -1) {
                    orderedPartyOpinionCounter[orderedParties[indexOfOpinion]['name']] += 1;
                }
                console.log(orderedPartyOpinionCounter);
            }
        }
     }
}

function substractOpinion(){
    for(let subject = 0; subject < userOpinion.length; subject++){
        for (let loop = 0; loop < partyOpinionPerSubjectAdd[subject].length; loop++) {
            let indexOfOpinion = partyOpinionPerSubjectSubtract[subject].indexOf(userOpinion[userOpinion.length-1]);
            partyOpinionPerSubjectSubtract[subject][indexOfOpinion] = "";

            if (indexOfOpinion !== -1) {
                orderedPartyOpinionCounter[orderedParties[indexOfOpinion]['name']] -= 1;
            }
        }
        console.log(orderedPartyOpinionCounter);
    }
    //console.log(orderedPartyOpinionCounter[orderedParties[orderedPartyOpinionCounter.length]['name']]);
}

// ============================================================
// Progress-bar
// ============================================================

for (let steps = numberOfSteps; steps < subjects.length; steps++){
    let step = document.createElement('div');
    step.style.height = '2rem';
    step.className = 'step';
    step.style.width = '3.333333%';
    step.style.display = 'inline-block';
    bar.appendChild(step);
}

//Function to enter the next step in progress-bar.
//@param stepCounter - the current step of te progress-bar
function nextStep(stepCounter){

    if (stepCounter <= subjects.length) {
        step = document.getElementsByClassName('step');
        step[stepCounter].style.backgroundColor = 'rgb(1,180,220)';
    }
}

//Function to enter the previous step in progress-bar.
//@param stepCounter - the current step of te progress-bar
function previousStep(stepCounter){
    if (stepCounter >= 1) {
        step = document.getElementsByClassName('step');
        step[stepCounter].style.backgroundColor = 'white';
    }
}


