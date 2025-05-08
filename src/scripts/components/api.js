const checkStatus = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-37',
    headers: {
        authorization: 'e5803f2a-5435-492d-93f3-6ef58b10a9e5',
        'Content-Type': 'application/json'
    }
};


function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(handleResponse);
}

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(handleResponse);
}

export function patchUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about })
    }).then(handleResponse);
}

export function patchAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: avatarUrl })
    }).then(handleResponse);
}

export function postCard({ name, link }) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    }).then(handleResponse);
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(handleResponse);
}

export function putLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    }).then(handleResponse);
}

export function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(handleResponse);
}
