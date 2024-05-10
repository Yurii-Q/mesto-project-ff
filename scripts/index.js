// Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// DOM узлы
const mainPage = document.querySelector('.places__list');

// Функция создания карточки
function createCard (cardData, deleteCard) {
  const newCard = cardTmp.querySelector('.card').cloneNode('true');
  const imgCard = newCard.querySelector('.card__image');
  const titleCard = newCard.querySelector('.card__title');
  const buttonDeleteCard = newCard.querySelector('.card__delete-button');

  imgCard.src = cardData.link;
  imgCard.alt = cardData.name;
  titleCard.textContent = cardData.name;
  buttonDeleteCard.addEventListener('click', deleteCard);

  return newCard;
}

// Функция удаления карточки
function deleteCard (evt) {
  const itemList = evt.target.closest('.places__item');
  itemList.remove();
}

// Вывести карточки на страницу
initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  mainPage.append(card);
});