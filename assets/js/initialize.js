// Variables
let subjectNr = 0;
let titles = [];
let statements = [];
let stepsNr = 0;

// DOM elements
let title = document.getElementById("title");
let description = document.getElementById('description');
let buttonContainer = document.getElementById("buttons");
let bar = document.getElementById('progress-bar');

//To initialize the start screen.
(function () {
    document.getElementById('nextArrow-box').style.display = 'none';
    document.getElementById('previousArrow-box').style.display = 'none';
    
    let startBtn = document.createElement('button');
    startBtn.innerHTML = "Start";
    startBtn.className = "w3-button w3-black";
    startBtn.onclick  = function(){
        removeFunc(buttonContainer, startBtn);
        start(subjectNr);
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
function start(subject){

    //Initialize buttons
    document.getElementById('nextArrow-box').style.display = 'inline-block';
    document.getElementById('previousArrow-box').style.display = 'inline-block';

    let agreeBtn = document.createElement('button');
    agreeBtn.innerHTML = "Eens";
    agreeBtn.className = "w3-button w3-black button";
    agreeBtn.onclick = function(){
        nextSubject(++subject);
        nextStep(stepsNr++)
    };

    let noneBtn = document.createElement('button');
    noneBtn.innerHTML = "Geen van beide";
    noneBtn.className = "w3-button w3-black button";
    noneBtn.onclick = function(){
        nextSubject(++subject);
        nextStep(stepsNr++)
    };

    let disagreeBtn = document.createElement('button');
    disagreeBtn.innerHTML = "Oneens";
    disagreeBtn.className = "w3-button w3-black button";
    disagreeBtn.onclick = function(){
        nextSubject(++subject);
        nextStep(stepsNr++)
    };

    buttonContainer.appendChild(agreeBtn);
    buttonContainer.appendChild(noneBtn);
    buttonContainer.appendChild(disagreeBtn);

    nextSubject(subject);
}




