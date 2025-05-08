export function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    if (inputElement && errorElement) {
        inputElement.classList.add(config.inputErrorClass);
        errorElement.textContent = inputElement.dataset.errorMessage && inputElement.validity.patternMismatch
            ? inputElement.dataset.errorMessage
            : inputElement.validationMessage;
        errorElement.classList.add(config.errorClass);
    }
}

export function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
    if (inputElement && errorElement) {
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.classList.remove(config.errorClass);
        errorElement.textContent = '';
    }
}


function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
}

export function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => evt.preventDefault());
        setEventListeners(formElement, config);
    });
}

export function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config);
    });

    toggleButtonState(inputList, buttonElement, config);
}
