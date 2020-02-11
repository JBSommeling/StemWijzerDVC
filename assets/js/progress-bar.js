for (steps = stepsNr; steps < subjects.length; steps++){
    let step = document.createElement('div');
    step.style.height = '2rem';
    step.className = 'step';
    step.style.width = '3.333333%';
    step.style.display = 'inline-block';
    bar.appendChild(step);
}

function nextStep(stepCounter){
    if (stepsNr <= subjects.length) {
        step = document.getElementsByClassName('step');
        step[stepCounter].style.backgroundColor = 'rgb(1,180,220)';
    }
}

function previousStep(stepCounter){
    step = document.getElementsByClassName('step');
    step[stepCounter].style.backgroundColor = 'white';
}