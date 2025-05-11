export function enableValidation(mapClassesForm) {
  const forms = Array.from(
    document.querySelectorAll(mapClassesForm.formSelector)
  );
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, mapClassesForm);
  });
}

function setEventListeners(formElement, mapClassesForm) {
  const inputs = Array.from(
    formElement.querySelectorAll(mapClassesForm.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    mapClassesForm.submitButtonSelector
  );
  toggleButtonState(inputs, buttonElement, mapClassesForm);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, mapClassesForm);
      toggleButtonState(inputs, buttonElement, mapClassesForm);
    });
  });
}

function checkInputValidity(formElement, inputElement, mapClassesForm) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.getAttribute("data-error"));
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      mapClassesForm,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, mapClassesForm);
  }
}

function showInputError(
  formElement,
  inputElement,
  mapClassesForm,
  errorMessage
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(mapClassesForm.errorClass);
  inputElement.classList.add(mapClassesForm.inputErrorClass);
}

function hideInputError(formElement, inputElement, mapClassesForm) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  inputElement.setCustomValidity("");
  errorElement.classList.remove(mapClassesForm.errorClass);
  inputElement.classList.remove(mapClassesForm.inputErrorClass);
}

function hasInvalidInput(inputs) {
  return inputs.every((item) => item.validity.valid);
}

function toggleButtonState(inputs, buttonElement, mapClassesForm) {
  if (!hasInvalidInput(inputs)) {
    buttonElement.setAttribute("disabled", "true");
    buttonElement.classList.add(mapClassesForm.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(mapClassesForm.inactiveButtonClass);
  }
}

export function clearValidation(formElement, validationConfig) {
  const inputs = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputs, buttonElement, validationConfig);
  inputs.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
}
