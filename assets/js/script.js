// ============================================================
// Initializer
// ============================================================

// Variables
let subjectNr = 0;
let titles = [];
let statements = [];
let numberOfSteps = 0;
let answers = [];                           //This array keeps tabs on answers given.
let opinionCounter = [];                    //This array keeps tabs on the score based on the answers given in alphabetical order.

// DOM elements
let title = document.getElementById("title");
let description = document.getElementById('description');
let buttonContainer = document.getElementById("buttons");
let bar = document.getElementById('progress-bar');

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
            answers.pop();
        }
    };

    let agreeBtn = document.createElement('button');
    agreeBtn.innerHTML = "Eens";
    agreeBtn.className = "w3-button w3-black button";
    agreeBtn.onclick = function(){
        nextSubject(++subject);
        nextStep(++step);
        answers.push("pro");
        calcOpinion();
    };

    let noneBtn = document.createElement('button');
    noneBtn.innerHTML = "Geen van beide";
    noneBtn.className = "w3-button w3-black button";
    noneBtn.onclick = function(){
        nextSubject(++subject);
        nextStep(++step);
        answers.push("none");
        calcOpinion();
    };

    let disagreeBtn = document.createElement('button');
    disagreeBtn.innerHTML = "Oneens";
    disagreeBtn.className = "w3-button w3-black button";
    disagreeBtn.onclick = function(){
        nextSubject(++subject);
        nextStep(++step);
        answers.push("contra");
        calcOpinion();
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

// Function to calculate/ add +1 to opinionCounter array per given answer by user.
function calcOpinion(){
    // To set (reset) values of opinionCounter to 0.
    for (let index = 0; index < parties.length; index++) {
        opinionCounter[parties[index]['name']] = 0;
    }

    // Loop through statements.
    for (let statementIndex = 0; statementIndex < answers.length; statementIndex++){
        // Per answer go to party opinion.
        for (let partyIndex = 0; partyIndex < subjects[statementIndex]['parties'].length; partyIndex++){
            // Add +1 per party by name if given answer equals to party opinion.
            if (answers[statementIndex] === subjects[statementIndex]['parties'][partyIndex]['position']){
                opinionCounter[subjects[statementIndex]['parties'][partyIndex]['name']] += 1;
                console.log(opinionCounter);
                console.log(answers);
            }
        }
    }

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


