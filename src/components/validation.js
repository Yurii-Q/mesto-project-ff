//import {getResourceHeadByUrl} from './api.js'

function showInputError(form, input, errMsg, inputErrorClass, errorClass) {
  const errElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputErrorClass);
  errElement.textContent = errMsg;
  errElement.classList.add(errorClass);
}

function hideInputError(form, input, inputErrorClass, errorClass) {
  const errElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errElement.classList.remove(errorClass);
  errElement.textContent = '';
}

function isValid(form, input, inputErrorClass, errorClass) {
  if(input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  }
  else {
    input.setCustomValidity('');
  }
/*
  if(input.classList.contains('popup__input_type_url-img')) {
    getResourceHeadByUrl(input.value)
      .then(res => {
        if(res.headers['Content-Type'].includes('image')) {
          input.setCustomValidity('');
        }
        else {
          input.setCustomValidity(input.dataset.errorMessage);
        }
      })
      .catch(err => {
        console.log(err);
        input.setCustomValidity(input.dataset.errorMessage);
      });
  }
*/
  if(!input.validity.valid) {
    showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
  }
  else {
    hideInputError(form, input, inputErrorClass, errorClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, button, inactiveButtonClass) {
  if(hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  }
  else {
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
  }
}

function setEventListiner(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonSubmit = form.querySelector(submitButtonSelector);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonSubmit, inactiveButtonClass);
    });
  });
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  
  formList.forEach(form => {
    setEventListiner(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}

function clearValidation(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const buttonSubmit = form.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(input => {
    isValid(form, input, validationConfig.inputErrorClass, validationConfig.errorClass)
  }); 
  toggleButtonState(inputList, buttonSubmit, validationConfig.inactiveButtonClass);
}

export {enableValidation, clearValidation};