

function handlerKeyEscape(evt) {
  const openedPopup  = document.querySelector('.popup_is-opened');
  if(evt.key === 'Escape') {
    closePopup(openedPopup);
    //console.log('escape');
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handlerKeyEscape);
}

function openPopup(popup) {
  document.addEventListener('keydown', handlerKeyEscape);
  popup.classList.add('popup_is-opened');
}

export {openPopup, closePopup};