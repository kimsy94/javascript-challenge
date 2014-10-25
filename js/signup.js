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

    var cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', onCancel);

    signup.addEventListener('submit', onSubmit);
}

function checkOccupation(occupation) {
    //console.log(occupation.value);

    var occupationOther = document.getElementById('occupationOther');
    if (occupation.value == 'other') {
        occupationOther.style.display = 'block';
    } else {
        occupationOther.style.display = 'none';
    }
}

function onCancel() {
    var location;
    var r = confirm("Do you really want to leave?");
    if (r) {
        window.location = 'http://google.com';
    }
}

function onSubmit(evt) {
    try {
        var valid = validateForm(this);

        /*
        if (!valid) {
            
            var errMsg = document.getElementById('error-message');
            errMsg.innerHTML = 'Please provide values for the required fields!';
            errMsg.style.display = 'block';

        }
        */

        if (!valid && evt.preventDefault) {
            evt.preventDefault();
        }

        evt.returnValue = valid;
        return valid;
    } catch (exception) {

    }
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var valid = true;

    for (idx = 0; idx < requiredFields.length; ++idx) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }

    return valid;
} 

function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var valid = value.length > 0;

    if (valid) {
        field.className = 'form-control';
    }
    else {
        field.className = 'form-control invalid-field';
    }
    return valid;
}

/* function zipCode() {
    var zipRegExp = new RegExp('^\\d{5}$');
    var patt = /w3schools/i;
    var patt = new RegExp("e");

    if (zipRegExp.test(input.value)) {
        evt.preventDefault();
        evt.returnValue = false;
    } 
    return ; 
} */



/* function {
    if (occupation.value == 'other') {
    occupationOther.style.display = 'block';
    } else {
    occupationOther.style.display = 'none';
    } 

}    


    var d = new Date(year, month, day);
    
    var birthdate = document.getElementById("birthdateMessage")
    birthdate.innerHTML = ""; */

document.addEventListener('DOMContentLoaded', onReady);