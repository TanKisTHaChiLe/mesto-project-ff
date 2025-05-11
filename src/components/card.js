import { cardTemplate } from "./scripts/index.js";
import { APIUpdateAvatar, APILikeCard, APIRemoveCard } from "./api.js";
export function addCard(item, removeCard, likeCard, hadlerClickImage, userId) {
  const cardElemnet = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const card_image = cardElemnet.querySelector(".card__image");
  const card__title = cardElemnet.querySelector(".card__title");
  const card_likes = cardElemnet.querySelector(".count_likes-span");
  const cardDeleteButton = cardElemnet.querySelector(".card__delete-button");
  card_image.setAttribute("src", item.link);
  card_image.setAttribute("alt", item.name);
  card__title.textContent = item.name;
  card_likes.textContent = item.likes.length;

  if (userId && item.owner._id !== userId) {
    cardDeleteButton.style.display = "none";
  }

  removeCard(cardElemnet, item);

  likeCard(cardElemnet, item, userId);

  hadlerClickImage(card_image, item.link, item.name);
  return cardElemnet;
}

export function handlerRemoveCard(card, obj) {
  const buttonDeleteCard = card.querySelector(".card__delete-button");
  buttonDeleteCard.addEventListener("click", () => {
    openModal(popupConfirmation);
    buttonConfirmationDeleteCard.addEventListener("click", () => {
      APIRemoveCard(obj);
      closeModal(popupConfirmation);
      card.remove();
    });
  });
}

export function likeCard(card, obj, userId) {
  const likeButton = card.querySelector(".card__like-button");
  const card_likes = card.querySelector(".count_likes-span");
  setInitialLikes(likeButton, obj, userId);
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    const method = isLiked ? "DELETE" : "PUT";
    APILikeCard(method, obj).then((res) => {
      card_likes.textContent = res.likes.length;
      setInitialLikes(likeButton, res, userId);
    });
  });
}

function setInitialLikes(likeButton, obj, userId) {
  if (obj.likes.some((item) => item._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}
