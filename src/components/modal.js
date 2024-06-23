

function handlerKeyEscape(evt) {
  if(evt.key === 'Escape') {
    const openedPopup  = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
    //console.log('escape');
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handlerKeyEscape);
  // Удаление обработчика с кнопки соглашения
  if(popup.classList.contains('popup_type_confirm-delete-card')) {
    const buttonYes = popup.querySelector('.popup__button');
    const cloneButtonYes = buttonYes.cloneNode(true);
    buttonYes.parentNode.replaceChild(cloneButtonYes, buttonYes);
  }
}

function openPopup(popup) {
  document.addEventListener('keydown', handlerKeyEscape);
  popup.classList.add('popup_is-opened');
}

export {openPopup, closePopup};