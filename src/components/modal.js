

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
}

function openPopup(popup) {
  document.addEventListener('keydown', handlerKeyEscape);
  popup.classList.add('popup_is-opened');
}

export {openPopup, closePopup};