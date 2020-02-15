// ============================================================
// Initializer
// ============================================================

// Variables
let subjectNr = 0;
let titles = [];
let statements = [];
let numberOfSteps = 0;
let numberOfStatements = subjects.length;
let answers = [];                                   //This array keeps tabs on answers given.
let opinionCounter = [];                            //This array keeps tabs on the score based on the answers given in alphabetical order.


// DOM elements
let title = document.getElementById("title");
let description = document.getElementById('description');
let buttonContainer = document.getElementById("buttons");
let bar = document.getElementById('progress-bar');
let foreground = document.getElementById('foreground');

let nextArrow = document.getElementById('nextArrow-box');
let previousArrow = document.getElementById('previousArrow-box');
let agreeBtn = document.createElement('button');
let noneBtn = document.createElement('button');
let disagreeBtn = document.createElement('button');
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
    nextArrow.style.display = 'inline-block';
    nextArrow.onclick = function(){
        if (subject < (numberOfStatements-1)) {
            nextSubject(++subject);
            nextStep(++step);
        }
        answers.push("");
        calcOpinion();
    };

    previousArrow.style.display = 'inline-block';
    previousArrow.onclick = function(){
        if (subject > 0) {
            previousSubject(--subject);
            previousStep(step--);
            answers.pop();
        }
    };

    agreeBtn.innerHTML = "Eens";
    agreeBtn.className = "w3-button w3-black button";
    agreeBtn.onclick = function(){
        if (subject < (numberOfStatements-1)) {
            nextSubject(++subject);
            nextStep(++step);
        }
        answers.push("pro");
        calcOpinion();
    };

    noneBtn.innerHTML = "Geen van beide";
    noneBtn.className = "w3-button w3-black button";
    noneBtn.onclick = function(){
        if (subject < (numberOfStatements-1)) {
            nextSubject(++subject);
            nextStep(++step);
        }
        answers.push("none");
        calcOpinion();
    };

    disagreeBtn.innerHTML = "Oneens";
    disagreeBtn.className = "w3-button w3-black button";
    disagreeBtn.onclick = function(){
        if (subject < (numberOfStatements-1)) {
            nextSubject(++subject);
            nextStep(++step);
        }
        answers.push("contra");
        calcOpinion();
    };

    //To append and initialize buttons and first subject and step.
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

// ============================================================
// Results
// ============================================================

// Function to calculate/ add +1 to opinionCounter array per given answer by user.
function calcOpinion(){
    opinionCounter = [];
    // To set (reset) values of opinionCounter to 0 and create an object.
    for (let index = 0; index < parties.length; index++) {
        opinionCounter.push({name: parties[index]['name'], score:0})
    }

    // Loop through statements.
    for (let statementIndex = 0; statementIndex < answers.length; statementIndex++){
        // Per answer go to party opinion.
        for (let partyIndex = 0; partyIndex < subjects[statementIndex]['parties'].length; partyIndex++){
            // If given answer equals to party opinion:
            if (answers[statementIndex] === subjects[statementIndex]['parties'][partyIndex]['position']){
                // Create an object named party and add +1 to party score.
                let party = opinionCounter.find(function(element){
                    if (element.name === subjects[statementIndex]['parties'][partyIndex]['name'] )
                        return element;
                    return undefined;
                });
                party.score += 1;
            }
        }
    }
    if (answers.length >= numberOfStatements){
       showResults();
    }
}

// Function to show the calculated results on screen.
function showResults(){
    // Clear fields.
    buttonContainer.innerHTML = "";
    title.innerHTML = "";
    nextArrow.style.display = 'none';
    previousArrow.style.display = 'none';
    description.innerHTML = "";

    //Create variables and arrays.
    let table = document.createElement('table');
    let tableCaption = document.createElement('caption');
    tableCaption.innerHTML = "Resultaat StemWijzer";
    table.className = 'resultTable';
    let tableHeader = [];
    let tableRow = [];

    //Append element to container.
    foreground.appendChild(table);
    table.appendChild(tableCaption);

    // Function to sort the opinionCounter array-object by score - descending.
    let sortedOpinionCounter = opinionCounter.sort(function (a,b) {
            return b.score - a.score;
        }
    );

    for (let partyIndex = 0; partyIndex < parties.length; partyIndex++){
        tableRow[partyIndex] =  document.createElement('tr');
        table.appendChild(tableRow[partyIndex]);

        tableHeader[partyIndex] = document.createElement('td');
        tableHeader[partyIndex].innerHTML = '<span class="progress">'+ sortedOpinionCounter[partyIndex]['name'] +
            '</span><progress id="file" value="'+ sortedOpinionCounter[partyIndex]['score'] + '" max="30"></progress>';
        tableRow[partyIndex].appendChild(tableHeader[partyIndex]);
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


