
// Функция создания карточки
function createCard (cardData, cardTmp, deleteCard, openPopup, likeCard) {
  const newCard = cardTmp.querySelector('.card').cloneNode('true');
  const imgCard = newCard.querySelector('.card__image');
  const titleCard = newCard.querySelector('.card__title');
  const buttonDeleteCard = newCard.querySelector('.card__delete-button');
  const likeButton = newCard.querySelector('.card__like-button');

  titleCard.textContent = cardData.name;
  imgCard.src = cardData.link;
  imgCard.alt = cardData.name;
  imgCard.addEventListener('click', (evt) => openPopup(imgCard, 
    titleCard.textContent, evt));
  likeButton.addEventListener('click', () => likeCard(likeButton));
  buttonDeleteCard.addEventListener('click', () => deleteCard(newCard));

  return newCard;
}

export {createCard};

