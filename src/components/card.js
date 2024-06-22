import { closePopup, openPopup } from "./modal";

// Функция создания карточки
function createCard (dataProfile, cardData, cardTmp, deleteCard, openPopupImg, toggleLikeCard, popupDeleteCard) {
  const newCard = cardTmp.querySelector('.card').cloneNode('true');
  const imgCard = newCard.querySelector('.card__image');
  const titleCard = newCard.querySelector('.card__title');
  const buttonDeleteCard = newCard.querySelector('.card__delete-button');
  const likeButton = newCard.querySelector('.card__like-button');
  const likeCount = newCard.querySelector('.card__like-count');

  titleCard.textContent = cardData.name;
  imgCard.src = cardData.link;
  imgCard.alt = cardData.name;
  imgCard.addEventListener('click', (evt) => openPopupImg(imgCard, 
    titleCard.textContent, evt));

  if(dataProfile._id === cardData.owner._id) {
    buttonDeleteCard.addEventListener('click', () => {
      const buttonYes = popupDeleteCard.querySelector('.popup__button');
      buttonYes.addEventListener('click', () => {
        deleteCard(cardData)
          .then(res => newCard.remove())
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            closePopup(popupDeleteCard);
          });
      });
      openPopup(popupDeleteCard);
    });
  }
  else {
    buttonDeleteCard.classList.add('card__delete-button_none');
  }

  // Handle likes
  const isLiked = cardData.likes.find((owner, index, array) => {
    return owner._id === dataProfile._id;
  });

  if(isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeCount.textContent = cardData.likes.length;

  likeButton.addEventListener('click', () => {
    toggleLikeCard(cardData, dataProfile, likeButton, likeCount);
  });

  return newCard;
}

export {createCard};

