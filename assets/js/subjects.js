// VARIABLES


// Buttons
let buttonContainer = document.getElementById("buttons");


//To initialize the start screen.
(function () {
    let startBtn = document.createElement('button');
    startBtn.innerHTML = "Start";
    startBtn.className = "w3-button w3-black";
    addBtn(buttonContainer, startBtn);
    startBtn.onclick  = function(){
        removeBtn(buttonContainer, startBtn);
        start();
    };
}());

//Function to remove buttons.
//@param container - the parent of the button.
//@param element - the button to be deleted.
function removeBtn(container, element){
    container.removeChild(element);
}

//Function to add buttons.
//@param container - the parent of the button.
//@param element - the button to added.
function addBtn(container, element){
    container.appendChild(element);
}

function start(){
    let disagreeBtn = document.createElement('button');
    disagreeBtn.innerHTML = "Oneens";
    disagreeBtn.className = "w3-button w3-black button";

    let noneBtn = document.createElement('button');
    noneBtn.innerHTML = "Geen van beide";
    noneBtn.className = "w3-button w3-black button";

    let agreeBtn = document.createElement('button');
    agreeBtn.innerHTML = "Eens";
    agreeBtn.className = "w3-button w3-black button";

    addBtn(buttonContainer, disagreeBtn);
    addBtn(buttonContainer, noneBtn);
    addBtn(buttonContainer, agreeBtn);

}




