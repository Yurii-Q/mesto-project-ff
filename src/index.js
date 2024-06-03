import './pages/index.css';
import {initialCards} from './cards.js';
import {createCard} from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

// Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDesciption = document.querySelector('.profile__description');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupShowImg = document.querySelector('.popup_type_image');
const popupImage = popupShowImg.querySelector('.popup__image');
const popupImageCaption = popupShowImg.querySelector('.popup__caption');

const popups = document.querySelectorAll('.popup');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements['name'];
const jobInput = formEditProfile.elements['description'];
const formAddCard = document.forms['new-place'];
const placeNameInput = formAddCard.elements['place-name'];
const imgLinkInput = formAddCard.elements['link'];

function deleteCard(card) {
  card.remove();
}

function openPopupImg(image, title, evt) {
  popupImageCaption.textContent = title;
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  evt.stopPropagation();
  openPopup(popupShowImg);
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, cardTmp, deleteCard, openPopupImg, likeCard);
  placesList.append(card);
});

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

profileEditButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesciption.textContent;
  openPopup(popupEditProfile);
});

profilAddButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  formAddCard.reset();
  openPopup(popupAddCard);
});

// Формы

function handleFormEditSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;
  
  profileTitle.textContent = name;
  profileDesciption.textContent = job;

  formEditProfile.reset();
}

formEditProfile.addEventListener('submit', (evt) => {
  handleFormEditSubmit(evt);
  closePopup(popupEditProfile);
});

function handleFormAddImgSubmit(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value;
  const imgLink = imgLinkInput.value;

  const cardData = {name:placeName, link:imgLink};

  const card = createCard(cardData, cardTmp, deleteCard, openPopupImg, likeCard);
  placesList.prepend(card);

  formAddCard.reset();
}

formAddCard.addEventListener('submit', (evt) => {
  handleFormAddImgSubmit(evt);
  closePopup(popupAddCard);
});
