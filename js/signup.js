/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

function onReady() {
	var signup = document.getElementById('signup');
    var stateSelect = signup.elements['state'];
    var idx;
    var option;
    var state;

    for (idx = 0; idx < usStates.length; ++idx) {
    	option = document.createElement('option');
        state = usStates[idx];
        option.value = state.code;
        option.innerHTML = state.name;
        stateSelect.appendChild(option);
	}

	var occupationField = signup.elements['occupation'];
	occupationField.addEventListener('change', function() {
		checkOccupation(occupationField);
	});
}

function checkOccupation(occupation) {
	console.log(occupation.value);

	var occupationOther = document.getElementById('occupationOther');
	if(occupation.value == 'other') {
		occupationOther.style.display = 'block';
	} else {
		occupationOther.style.display = 'none';
	}
}

function onSubmit() {
	
}

document.addEventListener('DOMContentLoaded', onReady);