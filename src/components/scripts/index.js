import "../../pages/index.css";
import { openModal, closeModal, setupPopupCloseHandlers } from "../modal.js";
import { addCard, likeCard, handlerRemoveCard } from "../card.js";
import { clearValidation, enableValidation } from "../validation.js";
import {
  APIUpdateAvatar,
  APIAddNewCard,
  APIDonwloadData,
  APIEditingProfile,
} from "../api.js";
import {
  formButtonTextUnLoader,
  formButtonTextLoader,
  formNewPlaceButtonTextUnLoader,
  formNewPlaceButtonTextLoader,
  validConfig,
} from "../utils/constants.js";

export const cardTemplate = document.querySelector("#card-template").content;

export const popupConfirmation = document.querySelector(".popup-confirmation");
export const buttonConfirmationDeleteCard =
  popupConfirmation.querySelector(".popup__button");

const cardList = document.querySelector(".places__list");

const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const editProfileForm = document.forms["edit-profile"];
const editProfileFormSaveButton = editProfileForm.querySelector(
  ".edit-profile-button"
);
const editProfileNameInput = editProfileForm.elements.name;
const editProfileJobInput = editProfileForm.elements.description;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileAddButton = document.querySelector(".profile__add-button");

const popupNewCardContent = document.querySelector(".popup_type_new-card");
const newPlaceForm = document.forms["new-place"];
const newPlaceFormPopupCreateButton =
  newPlaceForm.querySelector(".popup__button");
const newPlaceNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const newPlaceJobInput = newPlaceForm.querySelector(".popup__input_type_url");

const profileImage = document.querySelector(".profile__image");

const popupTypeNewAvatar = document.querySelector(".popup_type_new-avatar");
const buttonNewAvatar = popupTypeNewAvatar.querySelector(".popup__button");
const inputPopupTypeNewAvatar =
  popupTypeNewAvatar.querySelector(".popup__input");
const formTypeNewAvatar = document.forms["new-avatar"];

let userId;

const popups = document.querySelectorAll(".popup");

popups.forEach(setupPopupCloseHandlers);

downloadData();

function hadlerClickImage(image, itemLink, itemName) {
  image.addEventListener("click", () => {
    popupImage.setAttribute("src", itemLink);
    popupImage.setAttribute("alt", itemName);
    popupCaption.textContent = itemName;
    openModal(imagePopup);
  });
}

function openPopupProfile() {
  editProfileNameInput.value = profileTitle.textContent;
  editProfileJobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validConfig);
  openModal(popupTypeEdit);
}

profileEditButton.addEventListener("click", openPopupProfile);

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  editingProfile(editProfileNameInput.value, editProfileJobInput.value);
}
editProfileForm.addEventListener("submit", handleFormSubmitProfile);

profileAddButton.addEventListener("click", () => {
  openModal(popupNewCardContent);
  if (newPlaceForm) {
    clearValidation(newPlaceForm, validConfig);
    newPlaceForm.reset();
  }
});

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

formTypeNewAvatar.addEventListener("submit", () => {
  Loading(true, buttonNewAvatar, formButtonTextUnLoader, formButtonTextLoader);
  const avatar = inputPopupTypeNewAvatar.value;
  APIUpdateAvatar(avatar)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(popupTypeNewAvatar);
    })
    .catch((error) => console.error(error))
    .finally(() =>
      Loading(
        false,
        buttonNewAvatar,
        formButtonTextUnLoader,
        formButtonTextLoader
      )
    );
});

profileImage.addEventListener("click", () => {
  inputPopupTypeNewAvatar.value = "";
  clearValidation(formTypeNewAvatar, validConfig);
  openModal(popupTypeNewAvatar);
});

function downloadData() {
  APIDonwloadData()
    .then(([userData, cards]) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      userId = userData._id;
      cards.forEach((item) => {
        cardList.append(
          addCard(item, handlerRemoveCard, likeCard, hadlerClickImage, userId)
        );
      });
    })
    .catch((error) => console.error(error));
}

function editingProfile(name, about) {
  Loading(
    true,
    editProfileFormSaveButton,
    formButtonTextUnLoader,
    formButtonTextLoader
  );
  APIEditingProfile(name, about)
    .then((res) => {
      console.log(res.name, res.about);
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupTypeEdit);

      editProfileForm.reset();
    })
    .catch((error) => console.error(error))
    .finally(() =>
      Loading(
        false,
        editProfileFormSaveButton,
        formButtonTextUnLoader,
        formButtonTextLoader
      )
    );
}

function addNewCard(obj) {
  Loading(
    true,
    newPlaceFormPopupCreateButton,
    formNewPlaceButtonTextUnLoader,
    formNewPlaceButtonTextLoader
  );
  APIAddNewCard(obj)
    .then((res) => {
      newPlaceForm.reset();
      closeModal(popupNewCardContent);
      cardList.prepend(
        addCard(res, handlerRemoveCard, likeCard, hadlerClickImage, userId)
      );
    })
    .catch((error) => console.error(error))
    .finally(() =>
      Loading(
        false,
        newPlaceFormPopupCreateButton,
        formNewPlaceButtonTextUnLoader,
        formNewPlaceButtonTextLoader
      )
    );
}

function Loading(
  isLoading,
  buttonElement,
  ButtonTextUnLoader,
  ButtonTextLoader
) {
  if (isLoading) {
    buttonElement.textContent = ButtonTextLoader;
  } else {
    buttonElement.textContent = ButtonTextUnLoader;
  }
}
