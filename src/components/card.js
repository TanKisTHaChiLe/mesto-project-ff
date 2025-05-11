import { cardTemplate } from "./scripts/index.js";
import { APILikeCard, APIRemoveCard } from "./api.js";
import { openModal, closeModal } from "./modal.js";
import {
  popupConfirmation,
  buttonConfirmationDeleteCard,
} from "./scripts/index.js";
export function addCard(item, removeCard, likeCard, hadlerClickImage, userId) {
  const cardElemnet = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElemnet.querySelector(".card__image");
  const cardTitle = cardElemnet.querySelector(".card__title");
  const cardLikes = cardElemnet.querySelector(".count_likes-span");
  const cardDeleteButton = cardElemnet.querySelector(".card__delete-button");
  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;
  cardLikes.textContent = item.likes.length;

  if (userId && item.owner._id !== userId) {
    cardDeleteButton.style.display = "none";
  }

  removeCard(cardElemnet, item);

  likeCard(cardElemnet, item, userId);

  hadlerClickImage(cardImage, item.link, item.name);
  return cardElemnet;
}
let deleteHandler = null;
export function handlerRemoveCard(card, obj) {
  const buttonDeleteCard = card.querySelector(".card__delete-button");
  buttonDeleteCard.addEventListener("click", () => {
    if (deleteHandler) {
      buttonConfirmationDeleteCard.removeEventListener("click", deleteHandler);
    }
    openModal(popupConfirmation);
    deleteHandler = () => {
      APIRemoveCard(obj)
        .then((evt) => {
          closeModal(popupConfirmation);
          card.remove();
        })
        .catch((error) => console.error(error));
    };
    buttonConfirmationDeleteCard.addEventListener("click", deleteHandler);
  });
}

export function likeCard(card, obj, userId) {
  const likeButton = card.querySelector(".card__like-button");
  const cardLikes = card.querySelector(".count_likes-span");
  setInitialLikes(likeButton, obj, userId);
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    const method = isLiked ? "DELETE" : "PUT";
    APILikeCard(method, obj)
      .then((res) => {
        cardLikes.textContent = res.likes.length;
        setInitialLikes(likeButton, res, userId);
      })
      .catch((error) => console.error(error));
  });
}

function setInitialLikes(likeButton, obj, userId) {
  if (obj.likes.some((item) => item._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}
