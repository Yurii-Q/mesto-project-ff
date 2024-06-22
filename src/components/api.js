
export {getProfileData, getInitialCards, setProfileData, addNewCard, deleteCard, likeCard, deleteLikeCard, setAvatar};

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '9d4cfcf4-784d-4782-b35d-0f5d3b58a6e8',
    'Content-Type': 'application/json'
  }
}

function thenHandler(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

/*
const getResourceHeadByUrl = (url) => {
  return fetch(`${url}`, {
    method: 'HEAD',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => thenHandler(res))
  .catch(err => err);
}*/

const setAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(res => thenHandler(res));
}

const likeCard = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => thenHandler(res));
}

const deleteLikeCard = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => thenHandler(res));
}

const deleteCard = (card) => {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => thenHandler(res));
}

const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => thenHandler(res));
}

const setProfileData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => thenHandler(res)); 
}

const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => thenHandler(res));
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => thenHandler(res));
}
