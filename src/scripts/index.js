import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "../components/modal.js";
import { addCard, removeCard, toggleIsActive } from "../components/card.js";
export const cardTemplate = document.querySelector("#card-template").content;

const cardList = document.querySelector(".places__list");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const editProfileForm = document.forms["edit-profile"];
const editProfileNameInput = editProfileForm.elements.name;
const editProfileJobInput = editProfileForm.elements.description;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

const popupNewCardContent = document.querySelector(".popup_type_new-card");
const newPlaceForm = popupNewCardContent.querySelector(".popup__form");
const newPlaceNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const newPlaceJobInput = newPlaceForm.querySelector(".popup__input_type_url");

function hadlerClickImage(image, itemLink, itemName) {
  image.addEventListener("click", () => {
    popupImage.setAttribute("src", itemLink);
    popupImage.setAttribute("alt", itemName);
    caption.textContent = itemName;
  });
  image.addEventListener("click",() => openModal(imagePopup));
  closeModal(imagePopup);
}

initialCards.forEach((item) => {
  cardList.append(addCard(item, removeCard, toggleIsActive, hadlerClickImage));
});

function openPopupProfile() {
  editProfileNameInput.value = profileTitle.textContent;
  editProfileJobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
}

function closePopupProfile(popup) {
  const form = popup.querySelector("form");
  if (form) {
    form.reset();
  }
  closeModal(popup);
}

profileEditButton.addEventListener("click", openPopupProfile);
closePopupProfile(popupTypeEdit);

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
  const form = popupTypeNewCard.querySelector(".popup__form");
  if (form) {
    form.reset();
  }
});
closeModal(popupTypeNewCard);

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
