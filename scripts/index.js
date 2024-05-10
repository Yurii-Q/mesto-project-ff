// Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function createCard (cardData, deleteCard) {
  const newCard = cardTmp.querySelector('.card').cloneNode('true');
  const imgCard = newCard.querySelector('.card__image');
  const titleCard = newCard.querySelector('.card__title');
  const buttonDeleteCard = newCard.querySelector('.card__delete-button');

  imgCard.src = cardData.link;
  imgCard.alt = cardData.name;
  titleCard.textContent = cardData.name;
  buttonDeleteCard.addEventListener('click', () => deleteCard(newCard));

  return newCard;
}

// Функция удаления карточки
function deleteCard (card) {
  card.remove();
}

// Вывести карточки на страницу
initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  placesList.append(card);
});