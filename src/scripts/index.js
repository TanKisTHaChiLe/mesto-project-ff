import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "../components/modal.js";
import { addCard, removeCard, toggleIsActive } from "../components/card.js";
export const cardTemplate = document.querySelector("#card-template").content;

const cardList = document.querySelector(".places__list");

//popup image

const imagePopup = document.querySelector(".popup_type_image");

//обработичк клика по изображению

function hadlerClickImage(image, itemLink, itemName) {
  image.addEventListener("click", () => {
    imagePopup.querySelector(".popup__image").setAttribute("src", itemLink);
    imagePopup.querySelector(".popup__image").setAttribute("alt", itemName);
    imagePopup.querySelector(".popup__caption").textContent = itemName;
  });
  handlerForm(image, imagePopup);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  cardList.append(addCard(item, removeCard, toggleIsActive, hadlerClickImage));
});

//обработчики закрытия и открытия попапов

function closePopup(popup) {
  const popupContent = popup.querySelector(".popup__content");
  const buttonClose = popup.querySelector(".popup__close");
  buttonClose.addEventListener("click", () => {
    closeModal(popup);
    document.removeEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        closeModal(popup);
      }
    });
  });
  popup.addEventListener("click", (evt) => {
    if (!popupContent.contains(evt.target)) {
      closeModal(popup);
    }
  });
}

function openPopap(buttonOpen, popup) {
    buttonOpen.addEventListener("click", () => {
    openModal(popup);
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        closeModal(popup);
      }
    });
  });
}

//обработчик формы

function handlerForm(buttonOpen, popup) {
  openPopap(buttonOpen, popup);
  closePopup(popup);
}

//edit-popup

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

handlerForm(profileEditButton, popupTypeEdit);

const editProfileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

editProfileForm.elements.name.value =
  document.querySelector(".profile__title").textContent;
  editProfileForm.elements.description.value = document.querySelector(
  ".profile__description"
).textContent;
const editProfileNameInput = editProfileForm.elements.name;
const editProfileJobInput = editProfileForm.elements.description;

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileJobInput.value;
  closeModal(popupTypeEdit);
  editProfileForm.reset();
  editProfileForm.elements.name.value =
    document.querySelector(".profile__title").textContent;
    editProfileForm.elements.description.value = document.querySelector(
    ".profile__description"
  ).textContent;
}
editProfileForm.addEventListener("submit", handleFormSubmitProfile);

//new card popup
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

handlerForm(profileAddButton, popupTypeNewCard);

const popupNewCardContent = document.querySelector(".popup_type_new-card");
const newPlaceForm = popupNewCardContent.querySelector(".popup__form");
const newPlaceNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const newPlaceJobInput = newPlaceForm.querySelector(
  ".popup__input_type_url"
);

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const obj = {
    name: "",
    link: "",
  };
  obj.name = newPlaceNameInput.value;
  obj.link = newPlaceJobInput.value;
  cardList.prepend(addCard(obj, removeCard, toggleIsActive, hadlerClickImage));
  closeModal(popupTypeNewCard);
}
newPlaceForm.addEventListener("submit", handleFormSubmitCard);
