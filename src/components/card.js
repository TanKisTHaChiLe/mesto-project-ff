import {cardTemplate}  from "../scripts/index.js"
export function addCard(item, removeCard, toggleIsActive, hadlerClickImage) {
  //создание карточки
  const cardElemnet = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElemnet.querySelector(".card__image").setAttribute("src", item.link);
  cardElemnet.querySelector(".card__image").setAttribute("alt", item.name);
  cardElemnet.querySelector(".card__title").textContent = item.name;
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
  hadlerClickImage(
    cardElemnet.querySelector(".card__image"),
    item.link,
    item.name
  );

  return cardElemnet;
}

export function removeCard(element) {
  element.remove();
}

export function toggleIsActive(like) {
  like.classList.toggle("card__like-button_is-active");
}
