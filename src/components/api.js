import { request } from "./utils/handlers-fetch";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-37",
  headers: {
    authorization: "1c232a31-54d5-43ae-9588-801fe13f3c1a",
    "Content-Type": "application/json",
  },
};

export const APIUpdateAvatar = (avatar) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  });
};

export const APILikeCard = (method, obj) => {
  return request(`${config.baseUrl}/cards/likes/${obj._id}`, {
    method: method,
    headers: config.headers,
  });
};

export const APIRemoveCard = (obj) => {
  return request(`${config.baseUrl}/cards/${obj._id}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const APIAddNewCard = (obj) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(obj),
  });
};

const downloadProfile = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
};

const donwloadCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
};

export const APIDonwloadData = () => {
  return Promise.all([downloadProfile(), donwloadCards()]).catch((error) =>
    console.error(error)
  );
};

export const APIEditingProfile = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};
