import "../../pages/index.css";
import { openModal, closeModal } from "../modal.js";
import { addCard , likeCard, handlerRemoveCard} from "../card.js";
import {clearValidation, enableValidation} from "../validation.js"
import {APIUpdateAvatar, APILikeCard, APIRemoveCard, APIAddNewCard, APIDonwloadData, APIEditingProfile} from "../api.js"
export const cardTemplate = document.querySelector("#card-template").content;

const popupConfirmation = document.querySelector(".popup-confirmation");
const buttonConfirmationDeleteCard = popupConfirmation.querySelector(".popup__button")

const cardList = document.querySelector(".places__list");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const editProfileForm = document.forms["edit-profile"];
const editProfileFormSaveButton = editProfileForm.querySelector('.edit-profile-button')
const editProfileNameInput = editProfileForm.elements.name;
const editProfileJobInput = editProfileForm.elements.description;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileAddButton = document.querySelector(".profile__add-button");

const popupNewCardContent = document.querySelector(".popup_type_new-card");
const newPlaceForm = popupNewCardContent.querySelector(".popup__form");
const newPlaceFormPopupCreateButton = newPlaceForm.querySelector('.popup__button');
const newPlaceNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const newPlaceJobInput = newPlaceForm.querySelector(".popup__input_type_url");

const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const profileImage = document.querySelector('.profile__image');

const FormButtonTextUnLoader = "Сохранить";
const FormButtonTextLoader = "Сохранение...";

const FormNewPlaceButtonTextUnLoader = "Создать";
const FormNewPlaceButtonTextLoader = "Создание...";

const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
const ButtonNewAvatar = popupTypeNewAvatar.querySelector('.popup__button');
const inputPopupTypeNewAvatar = popupTypeNewAvatar.querySelector('.popup__input');
const FormTypeNewAvatar = popupTypeNewAvatar.querySelector('.popup__form');

let userId;

downloadData();

setupPopupCloseHandlers(popupConfirmation);

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

function openPopupProfile() {
  editProfileNameInput.value = profileTitle.textContent;
  editProfileJobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm,validConfig)
  openModal(popupTypeEdit);
}

profileEditButton.addEventListener("click", openPopupProfile);
setupPopupCloseHandlers(popupTypeEdit);

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  editingProfile(editProfileNameInput.value,editProfileJobInput.value)
}
editProfileForm.addEventListener("submit", handleFormSubmitProfile);

profileAddButton.addEventListener("click", () => {
  openModal(popupNewCardContent);
    if (newPlaceForm) {
    clearValidation(newPlaceForm,validConfig)
    newPlaceForm.reset();
  }
});
setupPopupCloseHandlers(popupNewCardContent);

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const obj = {
    name: "",
    link: "",
  };
  obj.name = newPlaceNameInput.value;
  obj.link = newPlaceJobInput.value;
  addNewCard(obj);
}
newPlaceForm.addEventListener("submit", handleFormSubmitCard);

enableValidation(validConfig); 

setupPopupCloseHandlers(popupTypeNewAvatar);

profileImage.addEventListener('click', () => {
  inputPopupTypeNewAvatar.value = "";
  clearValidation(FormTypeNewAvatar,validConfig);
  openModal(popupTypeNewAvatar);
  FormTypeNewAvatar.addEventListener('submit', () => {
    Loading(true,ButtonNewAvatar,FormButtonTextUnLoader,FormButtonTextLoader);
    const avatar = inputPopupTypeNewAvatar.value;
    APIUpdateAvatar(avatar)   
    .then(res => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(popupTypeNewAvatar);
    })
    .finally(() => Loading(false,ButtonNewAvatar,FormButtonTextUnLoader,FormButtonTextLoader))
  })
})

function downloadData(){
  APIDonwloadData()
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    userId = userData._id;
    console.log(userId)
    cards.forEach((item) => {
      cardList.append(addCard(item, handlerRemoveCard, likeCard, hadlerClickImage, userId));
    });
  })
 
}

function editingProfile(name, about){
  Loading(true,editProfileFormSaveButton,FormButtonTextUnLoader,FormButtonTextLoader)
  APIEditingProfile(name, about)
  .then(res => {
    console.log(res.name,res.about)
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    closeModal(popupTypeEdit);
    
    editProfileForm.reset();
  })
  .finally(() => Loading(false,editProfileFormSaveButton,FormButtonTextUnLoader,FormButtonTextLoader))
}

function addNewCard(obj){
  Loading(true,newPlaceFormPopupCreateButton,FormNewPlaceButtonTextUnLoader,FormNewPlaceButtonTextLoader)
  APIAddNewCard(obj)
  .then(res => {
    newPlaceForm.reset();
    closeModal(popupNewCardContent);
    cardList.append(addCard(res, handlerRemoveCard, likeCard, hadlerClickImage));   
  })
  .finally(() => Loading(false,newPlaceFormPopupCreateButton,FormNewPlaceButtonTextUnLoader,FormNewPlaceButtonTextLoader))
}

function Loading(isLoading,buttonElement, ButtonTextUnLoader,ButtonTextLoader){
  if(isLoading){
    buttonElement.textContent = ButtonTextLoader
  }else{
    buttonElement.textContent = ButtonTextUnLoader
  }
}