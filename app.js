const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const positionEl = document.querySelector('#position');
const typeEl = document.querySelector('#type');

const form = document.querySelector('#form');

form.addEventListener('submit', e => {
    // prevents form from submitting
    e.preventDefault();
}
);

const checkUsername = () => {

    let valid = false;

    const min = 6,
        max = 10;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const checkPosition = () => {
    let valid = false;
    const position = positionEl.value.trim();
    var positions = document.getElementById("position");
    if(positions.value != "noselection") {
        showSuccess(positionEl);
        valid = true;
    } else {
        showError(positionEl, 'You must select a position');
    }
    return valid;
};

const checkType = () => {
    let valid = false;
    let selectedVal = document.querySelector('input[name="type"]:checked');
    console.log(selectedVal);
    if (selectedVal == null) {
        showError(typeEl.firstChild, 'You must select a type');
    } else {
        showSuccess(typeEl.firstChild);
        valid = true;
    }
    return valid;
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const validationText = formField.querySelector('small');
    validationText.textContent = "\u2713";
    //validationText.innerHtml = "";

}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPositionValid = checkPosition(),
        isTypeValid = checkType();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPositionValid &&
        isTypeValid;

    switch (e.target.id) {
           case 'username':
               checkUsername();
               break;
           case 'email':
               checkEmail();
               break;
           case 'position':
               checkPosition();
               break;
           case 'type':
               checkType();
               break;
       }

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});
