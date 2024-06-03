let closeModal = () => {};

function openModal(popup) {

  function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.querySelector('.popup__form').reset();
    document.removeEventListener('keydown', handlerKeyEscape);
    document.removeEventListener('click', handlerClickOverlay);
  }

  closeModal = closePopup;
  
  function handlerKeyEscape(evt) {
    if(evt.key === 'Escape') {
      closePopup(popup);
      //console.log('escape');
    }
  }
  
  function handlerClickOverlay(evt) {
    if(evt.target.closest('.popup__content')){
      return;
    }
    closePopup(popup);
    //console.log('click');
  }

  const closePopupButton = popup.querySelector('.popup__close');

  closePopupButton.addEventListener('click', () => {
    closePopup(popup);
  });
  document.addEventListener('keydown', handlerKeyEscape);
  document.addEventListener('click', handlerClickOverlay);

  popup.classList.add('popup_is-opened');
}

export {openModal, closeModal};