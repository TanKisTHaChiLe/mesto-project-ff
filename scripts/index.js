// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(item, removeCard) {
    const cardElemnet = cardTemplate.querySelector('.places__item').cloneNode(true);   
    cardElemnet.querySelector('.card__image').setAttribute('src', item.link);
    cardElemnet.querySelector('.card__image').setAttribute('alt', item.name);
    cardElemnet.querySelector('.card__title').textContent = item.name;
    cardElemnet.querySelector('.card__delete-button').addEventListener('click', () => {removeCard(cardElemnet)});
    return cardElemnet;
   
} 

// @todo: Функция удаления карточки

function removeCard(element) {
    element.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
    cardList.append(addCard(item, removeCard));
})

