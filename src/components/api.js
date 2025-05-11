const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-37",
  headers: {
    authorization: "1c232a31-54d5-43ae-9588-801fe13f3c1a",
    "Content-Type": "application/json",
  },
};

export const APIUpdateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then((evt) => {
      if (!evt.ok) {
        return Promise.reject(`Ошибка: ${evt.status}`);
      }
      return evt.json();
    })
    .catch((error) => console.error(error));
};

export const APILikeCard = (method, obj) => {
  return fetch(`${config.baseUrl}/cards/likes/${obj._id}`, {
    method: method,
    headers: config.headers,
  })
    .then((evt) => {
      if (!evt.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return evt.json();
    })
    .catch((error) => console.error(error));
};

export const APIRemoveCard = (obj) => {
  return fetch(`${config.baseUrl}/cards/${obj._id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((evt) => {
      if (!evt.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((error) => console.error(error));
};

export const APIAddNewCard = (obj) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(obj),
  })
    .then((evt) => {
      if (evt.ok) {
        return evt.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => console.error(error));
};

const downloadProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((evt) => {
      if (evt.ok) {
        return evt.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => console.error(error));
};

const donwloadCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((evt) => {
      if (evt.ok) {
        return evt.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => console.error(error));
};

export const APIDonwloadData = () => {
  return Promise.all([downloadProfile(), donwloadCards()]).catch((error) =>
    console.error(error)
  );
};

export const APIEditingProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((evt) => {
      if (evt.ok) {
        return evt.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((error) => console.error(error));
};
