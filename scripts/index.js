// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(cardTitle, cardLink, removeCard) {
    const cardElemnet = cardTemplate.querySelector('.places__item').cloneNode(true);   
    cardElemnet.querySelector('.card__image').setAttribute('src', cardLink);
    cardElemnet.querySelector('.card__title').textContent = cardTitle;
    cardElemnet.querySelector('.card__delete-button').addEventListener('click', () => {removeCard(cardElemnet)});
    cardList.append(cardElemnet);
} 

// @todo: Функция удаления карточки

function removeCard(element) {
    element.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
    addCard(item.name,item.link, removeCard);
})

