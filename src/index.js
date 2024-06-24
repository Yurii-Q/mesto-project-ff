import './pages/index.css';
import {createCard} from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {getProfileData, getInitialCards, setProfileData, addNewCard, deleteCard, likeCard, deleteLikeCard, setAvatar} from './components/api.js'

// Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDesciption = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

// Popups
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupEditAvatar = document.querySelector('.popup_type_new-avatar');
const popupShowImg = document.querySelector('.popup_type_image');
const popupImage = popupShowImg.querySelector('.popup__image');
const popupImageCaption = popupShowImg.querySelector('.popup__caption');
const popupDeleteCard = document.querySelector('.popup_type_confirm-delete-card');

// Forms
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements['name'];
const jobInput = formEditProfile.elements['description'];

const formAddCard = document.forms['new-place'];
const placeNameInput = formAddCard.elements['place-name'];
const imgLinkInput = formAddCard.elements['link'];

const formEditAvatar = document.forms['new-avatar'];
const avatarLink = formEditAvatar.elements['link'];

const buttonProcessText = {
  state: 'Сохранить',
  proces: 'Сохранение...'
}

const buttonDeleteText = {
  state: 'Да',
  proces: 'Удаление...'
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Добавление валидации
const inputTextList = document.querySelectorAll('.popup__input[type="text"]');
const inputImgList = document.querySelectorAll('.popup__input_type_url-img');
inputTextList.forEach(input => {
  input.pattern = "[a-zA-Zа-яА-ЯёЁ\\s\\-]*";
  input.setAttribute('data-error-message', "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
});
inputImgList.forEach(input => {
  input.setAttribute('data-error-message', "Адрес должен ссылаться на картинку");
});

enableValidation(validationConfig);

function toggleLikeCard (cardData, dataProfile, likeButton, likeCount) {
  
  const imLiked = cardData.likes.find((owner, index, array) => {
    return owner._id === dataProfile._id;
  });

  function updateDataOfLikes(cardData, res) {
    Object.assign(cardData, res);
    likeCount.textContent = cardData.likes.length;
  }

  if(imLiked) {
    deleteLikeCard(cardData)
      .then(res => {
        updateDataOfLikes(cardData, res);
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch(err => {
        console.log(err);
      });
  }
  else {
    likeCard(cardData)
      .then(res => {
        updateDataOfLikes(cardData, res);
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

function removeCard(cardData, cardElement) {
  const buttonYes = popupDeleteCard.querySelector('.popup__button');
  const removalCard = () => {
    buttonYes.textContent = buttonDeleteText.proces;
    deleteCard(cardData)
      .then(res => {
        cardElement.remove();
        closePopup(popupDeleteCard);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        buttonYes.textContent = buttonDeleteText.state;
      });
      buttonYes.removeEventListener('click', removalCard);
  }
  buttonYes.addEventListener('click', removalCard);
  
  openPopup(popupDeleteCard);
}

function openPopupImg(image, title, evt) {
  popupImageCaption.textContent = title;
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  evt.stopPropagation();
  openPopup(popupShowImg);
}

// Первончальная загрузка данных профиля
const promiseGetProfile = getProfileData()
  .then(data => {
    profileTitle.textContent = data.name;
    profileDesciption.textContent = data.about;
    profileAvatar.style['background-image'] = `url(${data.avatar})`;
    return data;
  })
  .catch(err => {
    console.log(err);
  });

// Первоначальная загрузка карточек
const promiseGetCards = getInitialCards()
  .then(cardList => {
    return cardList;
  })
  .catch(err => {
    console.log(err);
  });

Promise.all([promiseGetProfile, promiseGetCards])
  .then(([dataProfile, cardList]) => {
    cardList.forEach(cardData => {
      const card = createCard(dataProfile, cardData, cardTmp, removeCard, openPopupImg, toggleLikeCard);
      placesList.append(card);
    });
  });

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

// Вешаем слушателей на кнопки
profileEditButton.addEventListener('click', (evt) => {
  evt.stopPropagation();

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesciption.textContent;
  openPopup(popupEditProfile);
  clearValidation(formEditProfile, validationConfig);
});

profileAddButton.addEventListener('click', (evt) => {
  evt.stopPropagation();

  formAddCard.reset();
  openPopup(popupAddCard);
  clearValidation(formAddCard, validationConfig);
});

profileAvatar.addEventListener('click', (evt) => {
  evt.stopPropagation();

  formEditAvatar.reset();
  openPopup(popupEditAvatar);
  clearValidation(formEditAvatar, validationConfig);
})

// Обработка форм
function handleFormEditSubmit(evt) {
  evt.preventDefault();

  const buttonSave = formEditProfile.querySelector('.popup__button');

  buttonSave.textContent = buttonProcessText.proces;

  const name = nameInput.value;
  const job = jobInput.value;

  setProfileData(name, job)
    .then(newData => {
      profileTitle.textContent = newData.name;
      profileDesciption.textContent = newData.about;
      closePopup(popupEditProfile);
      formEditProfile.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      buttonSave.textContent = buttonProcessText.state;
    });
}

formEditProfile.addEventListener('submit', (evt) => {
  handleFormEditSubmit(evt);
});

function handleFormAddImgSubmit(evt) {
  evt.preventDefault();

  const buttonSave = formAddCard.querySelector('.popup__button');

  buttonSave.textContent = buttonProcessText.proces;

  const placeName = placeNameInput.value;
  const imgLink = imgLinkInput.value;

  addNewCard(placeName, imgLink)
    .then(newCard => {
      const card = createCard(newCard.owner, newCard, cardTmp, removeCard, openPopupImg, toggleLikeCard);
      placesList.prepend(card);
      closePopup(popupAddCard);
      formAddCard.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      buttonSave.textContent = buttonProcessText.state;
    });
}

formAddCard.addEventListener('submit', (evt) => {
  handleFormAddImgSubmit(evt);
});

function handleFormEditAvatar(evt) {
  evt.preventDefault();

  const buttonSave = formEditAvatar.querySelector('.popup__button');

  buttonSave.textContent = buttonProcessText.proces;

  setAvatar(avatarLink.value)
    .then(res => {
      profileAvatar.style['background-image'] = `url(${res.avatar})`;
      closePopup(popupEditAvatar);
      formEditAvatar.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      buttonSave.textContent = buttonProcessText.state;
    });
}

formEditAvatar.addEventListener('submit', (evt) => {
  handleFormEditAvatar(evt);
})

