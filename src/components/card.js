import { cardTemplate } from "./scripts/index.js";
export function addCard(item, removeCard, toggleIsActive, hadlerClickImage) {
  //создание карточки
  const cardElemnet = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const card_image = cardElemnet.querySelector(".card__image");
  const card__title = cardElemnet.querySelector(".card__title");
  card_image.setAttribute("src", item.link);
  card_image.setAttribute("alt", item.name);
  card__title.textContent = item.name;
  //удаление карточки
  cardElemnet
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      removeCard(cardElemnet);
    });
  //обработка лайка
  const likeButton = cardElemnet.querySelector(".card__like-button");
  likeButton.onclick = () => toggleIsActive(likeButton);
  //обработка клика по изображению
  hadlerClickImage(card_image, item.link, item.name);
  return cardElemnet;
}

export function removeCard(element) {
  element.remove();
}

export function toggleIsActive(like) {
  like.classList.toggle("card__like-button_is-active");
}
