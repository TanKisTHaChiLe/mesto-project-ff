import "../../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "../modal.js";
import { addCard, removeCard, toggleIsActive } from "../card.js";
import {clearValidation, enableValidation} from "../validation.js"
export const cardTemplate = document.querySelector("#card-template").content;

const cardList = document.querySelector(".places__list");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const editProfileForm = document.forms["edit-profile"];
const editProfileNameInput = editProfileForm.elements.name;
const editProfileJobInput = editProfileForm.elements.description;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

const form = popupTypeNewCard.querySelector(".popup__form");

const popupNewCardContent = document.querySelector(".popup_type_new-card");
const newPlaceForm = popupNewCardContent.querySelector(".popup__form");
const newPlaceNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const newPlaceJobInput = newPlaceForm.querySelector(".popup__input_type_url");

function setupPopupCloseHandlers(popup) {
  const popupContent = popup.querySelector(".popup__content");
  const buttonClose = popup.querySelector(".popup__close");
  buttonClose.addEventListener("click", () => {
    closeModal(popup);
  });
  popup.addEventListener("click", (evt) => {
    if (!popupContent.contains(evt.target)) {
      closeModal(popup);
    }
  });
}

function hadlerClickImage(image, itemLink, itemName) {
  image.addEventListener("click", () => {
    popupImage.setAttribute("src", itemLink);
    popupImage.setAttribute("alt", itemName);
    popupCaption.textContent = itemName;
    openModal(imagePopup);
  });
}
setupPopupCloseHandlers(imagePopup);

initialCards.forEach((item) => {
  cardList.append(addCard(item, removeCard, toggleIsActive, hadlerClickImage));
});

function openPopupProfile() {
  editProfileNameInput.value = profileTitle.textContent;
  console.log(editProfileNameInput.value)
  editProfileJobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm,validConfig)
  openModal(popupTypeEdit);
}

profileEditButton.addEventListener("click", openPopupProfile);
setupPopupCloseHandlers(popupTypeEdit);

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileJobInput.value;
  closeModal(popupTypeEdit);
  editProfileForm.reset();
}
editProfileForm.addEventListener("submit", handleFormSubmitProfile);

profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
    if (form) {
    clearValidation(newPlaceForm,validConfig)
    form.reset();
  }
});
setupPopupCloseHandlers(popupTypeNewCard);

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const obj = {
    name: "",
    link: "",
  };
  obj.name = newPlaceNameInput.value;
  obj.link = newPlaceJobInput.value;
  cardList.prepend(addCard(obj, removeCard, toggleIsActive, hadlerClickImage));
  newPlaceForm.reset();
  closeModal(popupTypeNewCard);
}
newPlaceForm.addEventListener("submit", handleFormSubmitCard);

const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validConfig); 
