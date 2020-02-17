/* ============================================================
Initializer
 ============================================================*/

// Variables
let subjectNr = 0;
let titles = [];
let statements = [];
let numberOfSteps = 0;
let numberOfStatements = subjects.length;
let answers = [];                                   //This array keeps tabs on answers given.
let opinionCounter = [];                            //This array keeps tabs on the score based on the answers given in alphabetical order.
let secularParties = [];                            //This array contains only the secular parties based on the parties array
let bigParties = [];                                //This arrat contains only the big parties based on the parties array.

// Constants
const BIGPARTYSIZE = 15;

// DOM elements
const TITLE = document.getElementById("title");
const DESCRIPTION = document.getElementById('description');
const BUTTON_CONTAINER = document.getElementById("buttons");
const BAR = document.getElementById('progress-bar');
const FOREGROUND = document.getElementById('foreground');
const NEXT_ARROW = document.getElementById('nextArrow-box');
const PREVIOUS_ARROW = document.getElementById('previousArrow-box');
const CHECKBOX = document.getElementById('weightChkbx');
const CHECKBOX_BOX = document.getElementsByClassName('checkbox-box')[0];
const RADIO_BTNS = document.getElementsByClassName('radioButtons-box')[0];
const SECULAR_RADIOBTN = document.getElementById('secular');
const REGULAR_RADIOBTN = document.getElementById('regular');
const BIG_RADIOBTN = document.getElementById('big');

const PRO_BTN = document.createElement('button');
const NONE_BTN = document.createElement('button');
const CONTRA_BTN = document.createElement('button');

// Elements of result screen.
const TABLE = document.createElement('table');
const TABLE_CAPTION = document.createElement('caption');
const TABLE_HEADER = [];
const TABLE_ROW = [];

/*============================================================
Initialization of elements
============================================================ */

//To render the start screen.
(function () {
    NEXT_ARROW.style.display = 'none';
    PREVIOUS_ARROW.style.display = 'none';
    CHECKBOX_BOX.style.display = 'none';
    RADIO_BTNS.style.display = 'none';


    let startBtn = document.createElement('button');
    startBtn.innerHTML = "Start";
    startBtn.className = "w3-button w3-black";
    startBtn.onclick  = function(){
        removeFunc(BUTTON_CONTAINER, startBtn);
        start(subjectNr, numberOfSteps);
    };
    BUTTON_CONTAINER.appendChild(startBtn);
}());

/*To remove elements from container.
@param container - the container of the removable element.
@param element - the element to be deleted. */
function removeFunc(container, element){
   container.removeChild(element);
}

/*Function to initialize setup.
@param subject - the subject to start with
@param step - the step for the progress-bar*/
function start(subject, step){

   //Initialize buttons
   CHECKBOX_BOX.style.display = 'block';

   NEXT_ARROW.style.display = 'inline-block';
   NEXT_ARROW.onclick = function(){
       pushAnswer();
       calcOpinion();
       uncheck(CHECKBOX);
       if (subject < (numberOfStatements-1)) {
           nextSubject(++subject);
           nextStep(++step);
       }
   };

   PREVIOUS_ARROW.style.display = 'inline-block';
   PREVIOUS_ARROW.onclick = function(){
       if (subject > 0) {
           previousSubject(--subject);
           previousStep(step--);
           answers.pop();
       }
   };

   PRO_BTN.innerHTML = "Eens";
   PRO_BTN.className = "w3-button w3-black button";
   PRO_BTN.onclick = function(){
       pushAnswer('pro');
       calcOpinion();
       uncheck(CHECKBOX);
       if (subject < (numberOfStatements-1)) {
           nextSubject(++subject);
           nextStep(++step);
       }
   };

   NONE_BTN.innerHTML = "Geen van beide";
   NONE_BTN.className = "w3-button w3-black button";
   NONE_BTN.onclick = function(){
       pushAnswer('none');
       calcOpinion();
       uncheck(CHECKBOX);
       if (subject < (numberOfStatements-1)) {
           nextSubject(++subject);
           nextStep(++step);
       }
   };

   CONTRA_BTN.innerHTML = "Oneens";
   CONTRA_BTN.className = "w3-button w3-black button";
   CONTRA_BTN.onclick = function(){
       pushAnswer('contra');
       calcOpinion();
       uncheck(CHECKBOX);
       if (subject < (numberOfStatements-1)) {
           nextSubject(++subject);
           nextStep(++step);
       }
   };

   //To append and initialize buttons and first subject and step.
   BUTTON_CONTAINER.appendChild(PRO_BTN);
   BUTTON_CONTAINER.appendChild(NONE_BTN);
   BUTTON_CONTAINER.appendChild(CONTRA_BTN);

   nextSubject(subject);
   nextStep(numberOfSteps);
}

// Function to uncheck checkbox
function uncheck(element){
   element.checked = false;
}

function clearFields(){
   BUTTON_CONTAINER.innerHTML = "";
   TITLE.innerHTML = "";
   NEXT_ARROW.style.display = 'none';
   PREVIOUS_ARROW.style.display = 'none';
   CHECKBOX_BOX.style.display = 'none';
   DESCRIPTION.innerHTML = "";
   TABLE.innerHTML = "";
}

function createTable(){
   TABLE_CAPTION.innerHTML = "Resultaat StemWijzer";
   TABLE.className = 'resultTable';
   RADIO_BTNS.style.display = 'block';

   SECULAR_RADIOBTN.onclick = function(){
       showResults('secular');
   };

   REGULAR_RADIOBTN.onclick = function(){
       showResults();
   };

   BIG_RADIOBTN.onclick = function(){
     showResults('big');
   };

   //Append element to container.
   FOREGROUND.appendChild(TABLE);
   TABLE.appendChild(TABLE_CAPTION);
}

/* ============================================================
Subjects
============================================================ */

/*Function to push answers to answer-object.
@param - opinion = opinion given by user per statement. */
function pushAnswer(opinion = ""){
   if (CHECKBOX.checked){
      answers.push({opinion: opinion, checked: true});
   }
   else{
      answers.push({opinion: opinion, checked: false });
   }
}

/*Function to go to next subject.
@param subject - number of subject.*/
function nextSubject(subject){
   let obj = subjects[subject];

   // Next title
   titles[subject] = document.createElement('h2');
   titles[subject].innerHTML = (subject+1) + ". " + obj.title;
   TITLE.appendChild(titles[subject]);

   // Next statement
   statements[subject] = document.createElement('p');
   statements[subject].innerHTML = obj.statement;
   DESCRIPTION.appendChild(statements[subject]);

   if (subject !== 0){
       TITLE.removeChild(titles[subject-1]);
       DESCRIPTION.removeChild(statements[subject-1]);
   }
}

/*Function to go to previous subject.
@param subject - number of subject. */
function previousSubject(subject){
   if (subject >= 0) {
       // TITLE
       TITLE.appendChild(titles[subject]);

       //STATEMENT
       DESCRIPTION.appendChild(statements[subject]);

       TITLE.removeChild(titles[subject + 1]);
       DESCRIPTION.removeChild(statements[subject + 1]);
   }
}

/* ============================================================
Results
============================================================*/

// Function to calculate/ add score to opinionCounter array per given answer by user.
function calcOpinion(){
   reset();
   // Loop through statements.
   for (let statementIndex = 0; statementIndex < answers.length; statementIndex++){
       // Per answer go to party opinion.
       for (let partyIndex = 0; partyIndex < subjects[statementIndex]['parties'].length; partyIndex++){
           // If given answer equals to party opinion:
           if (answers[statementIndex]['opinion'] === subjects[statementIndex]['parties'][partyIndex]['position']){
               // Create an object named party and add +1 to party score if checkbox is unchecked, else +2 if checkbox is checked.
               let party = opinionCounter.find(function(element){
                   if (element.name === subjects[statementIndex]['parties'][partyIndex]['name'] )
                       return element;
                   return undefined;
               });
               if (answers[statementIndex]['checked'] === true){
                   party.score += 2;
               }
               else{
                   party.score += 1;
               }
           }
       }
   }
   if (answers.length >= numberOfStatements){
       addPropertiesToOpinionCounter();
       showResults();
   }
}

//Function to reset values of opinionCounter to 0 and create an object.
function reset(){
   opinionCounter = [];
   // To set (reset) values of opinionCounter to 0 and create an object.
   for (let index = 0; index < parties.length; index++) {
       opinionCounter.push({name: parties[index]['name'], score:0})
   }
}

/*Function to show the calculated results on screen.
* @param - option = the option to choose between secular, big and regular*/
function showResults(option = "regular"){
    clearFields();
    createTable();

    if (option === "regular"){
        let sortedOpinionCounter = sort(opinionCounter);
        //let test = sortedOpinionCounter.find(element => element.score === 0 && element.name === 'Libertarische Partij');
        //Libertarische Partij gets doubled when sorting.
        //sortedOpinionCounter.splice(22,1);
        displayTable(sortedOpinionCounter, opinionCounter.length);
    }

    else if (option === 'secular') {
        let secularOpinionCounter = opinionCounter.filter(element => element.secular === true);
        //Libertarische Partij gets doubled when sorting.
        let sortedSecularOpinionCounter = sort(secularOpinionCounter);
        displayTable(sortedSecularOpinionCounter, sortedSecularOpinionCounter.length);
    }

    else if (option === 'big'){
        let bigOpinionCounter = opinionCounter.filter(element => element.size >= BIGPARTYSIZE);
        let sortedBigOpinionCounter = sort(bigOpinionCounter);
        displayTable(sortedBigOpinionCounter, sortedBigOpinionCounter.length);
    }
}

/* Function to sort array-object by score - descending.
@param - oldArray = the array to be sorted.*/
function sort(oldArray){
   return oldArray.sort(function (a, b) {
           return b.score - a.score;
       }
   );
}

/*Function to remove duplicates in array-object
* @param - array = the array to be spliced*/
function removeDuplicates(array){
    for (let partyIndex = 0; partyIndex < array.length; partyIndex++){
        if (array[partyIndex] === array[partyIndex-1]){
            array.splice(partyIndex, 1);
        }
    }
    return array;
}

//Function to add the secular and size property to the opinionCounter array.
function addPropertiesToOpinionCounter(){
    let party = parties;
    for (let partyIndex = 0; partyIndex < party.length; partyIndex++) {
        secularParties[partyIndex] = party.find(element => element.secular === true);
        bigParties[partyIndex] = party.find(element => element.size >= BIGPARTYSIZE);
        party[partyIndex] = "";
    }

    // To filter the undefined values in filteredBigPartiesArr.
    let filteredBigPartiesArr = bigParties.filter(function(element){
        return element != null;
    });

    for (let partyIndex = 0; partyIndex < opinionCounter.length; partyIndex++) {
        if (secularParties[partyIndex]['name'] === opinionCounter[partyIndex]['name']){
            opinionCounter[partyIndex]['secular'] = true;
        }
    }

    for (let partyIndex = 0; partyIndex < filteredBigPartiesArr.length; partyIndex++) {
        if (filteredBigPartiesArr[partyIndex]['name'] === opinionCounter[partyIndex]['name']) {
            opinionCounter[partyIndex]['size'] = filteredBigPartiesArr[partyIndex]['size'];
        }
    }
}


/*Function to display the table
* @param - array = the array to be displayed in a table*/
function displayTable(array, length) {
    for (let partyIndex = 0; partyIndex < length; partyIndex++) {
        TABLE_ROW[partyIndex] = document.createElement('tr');
        TABLE.appendChild(TABLE_ROW[partyIndex]);

        TABLE_HEADER[partyIndex] = document.createElement('td');
        TABLE_HEADER[partyIndex].innerHTML = '<span class="progress">' + array[partyIndex]['name'] +
            '</span><progress id="file" value="' + array[partyIndex]['score'] + '" max="30"></progress>';
        TABLE_ROW[partyIndex].appendChild(TABLE_HEADER[partyIndex]);
    }
}

/*============================================================
Progress-bar
============================================================*/

for (let steps = numberOfSteps; steps < subjects.length; steps++){
   let step = document.createElement('div');
   step.style.height = '2rem';
   step.className = 'step';
   step.style.width = '3.333333%';
   step.style.display = 'inline-block';
   BAR.appendChild(step);
}

/*Function to enter the next step in progress-bar.
@param stepCounter - the current step of te progress-bar*/
function nextStep(stepCounter){

   if (stepCounter <= subjects.length) {
       step = document.getElementsByClassName('step');
       step[stepCounter].style.backgroundColor = 'rgb(1,180,220)';
   }
}

/*Function to enter the previous step in progress-bar.
@param stepCounter - the current step of te progress-bar*/
function previousStep(stepCounter){
   if (stepCounter >= 1) {
       step = document.getElementsByClassName('step');
       step[stepCounter].style.backgroundColor = 'white';
   }
}


