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

        if (!valid && evt.preventDefault) {
            evt.preventDefault();
        }

        evt.returnValue = valid;
        return valid;
    } catch (exception) {

    }
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate', 'occupationOther'];
    var idx;
    var valid = true;

    for (idx = 0; idx < requiredFields.length; ++idx) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }
    var zipCodeField = form.elements['zip'];
    var zipRegExp = new RegExp('^\\d{5}$');
    if(!zipRegExp.test(zipCodeField.value)) {
        valid = false;
        zipCodeField.className = 'form-control invalid-form';
    }
    var birthday = form.elements['birthdate'];
    var birthdayError = document.getElementById('birthdateMessage');
    var age = calculateAge(birthday.value);
    if(age < 13) {
        valid = false;
        birthday.className = 'form-control invalid-form';
        birthdayError.style.display = 'block';
    }
    else {
        birthdayError.style.display = 'none';
    }
    return valid;
}

function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var valid = value.length > 0;
    var zipRegExp = new RegExp('^\\d{5}$');

    if (field.name == 'zip') {
        valid &= zipRegExp.test(value);
    }

    if (valid) {
        field.className = 'form-control';
    }
    else {
        field.className = 'form-control invalid-field';
    }
    return valid;
}

function calculateAge(birthDate) {
    birthDate = new Date(birthDate);
    var today = new Date();
    var yearsDiff = today.getFullYear() - birthDate.getUTCFullYear();
    var monthsDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();

    if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }
    return yearsDiff;
}

document.addEventListener('DOMContentLoaded', onReady);