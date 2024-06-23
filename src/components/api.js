
export {getProfileData, getInitialCards, setProfileData, addNewCard, deleteCard, likeCard, deleteLikeCard, setAvatar};

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '9d4cfcf4-784d-4782-b35d-0f5d3b58a6e8',
    'Content-Type': 'application/json'
  }
}

function request(url, options) {
  return fetch(url, options)
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const setAvatar = (avatar) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  });
}

const likeCard = (card) => {
  return request(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: config.headers
  });
}

const deleteLikeCard = (card) => {
  return request(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

const deleteCard = (card) => {
  return request(`${config.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

const addNewCard = (name, link) => {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  });
}

const setProfileData = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}

const getProfileData = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  });
}

const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  });
}
