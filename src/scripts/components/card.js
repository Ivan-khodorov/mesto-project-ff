// Импортируем функции API для работы с лайками
import { putLike, deleteLike } from './api.js';

// Функция: проверяет, лайкнул ли пользователь карточку
function isLiked(cardData, userId) {
    return cardData.likes.some(user => user._id === userId);
}

// Функция: обновляет счётчик и класс кнопки лайка
function updateLikeState(cardElement, likes, userId) {
    const likeCount = cardElement.querySelector('.card__like-count');
    const likeButton = cardElement.querySelector('.card__like-button');

    likeCount.textContent = likes.length;

    if (likes.some(user => user._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    }
}

// Функция: обработчик лайка
function handleLikeCard(cardElement, cardData, userId) {
    const likeButton = cardElement.querySelector('.card__like-button');

    const isActive = likeButton.classList.contains('card__like-button_is-active');
    const apiCall = isActive ? deleteLike : putLike;

    apiCall(cardData._id)
        .then((updatedCard) => {
            cardData.likes = updatedCard.likes;
            updateLikeState(cardElement, updatedCard.likes, userId);
        })
        .catch((err) => {
            console.error('Ошибка при обновлении лайка:', err);
        });
}

// Функция: удаляет карточку из DOM
function handleDeleteCard(cardElement) {
    cardElement.remove();
}

// Функция: создаёт карточку
function createCard(cardData, { onDeleteCard, onLikeCard, onOpenPreviewImage }, template, userId) {
    const cardElement = template.cloneNode(true);
    const img = cardElement.querySelector('.card__image');
    const title = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    // Создаём элемент счётчика лайков, если его нет
    let likeCount = cardElement.querySelector('.card__like-count');
    if (!likeCount) {
        likeCount = document.createElement('span');
        likeCount.classList.add('card__like-count');
        deleteButton.insertAdjacentElement('beforebegin', likeCount);
    }

    // Установка содержимого карточки
    title.textContent = cardData.name;
    img.src = cardData.link;
    img.alt = cardData.name;

    // Обработка лайков
    updateLikeState(cardElement, cardData.likes, userId);
    likeButton.addEventListener('click', () => onLikeCard(cardElement, cardData, userId));

    // Обработка удаления (только если карточка создана текущим пользователем)
    if (cardData.owner._id === userId) {
        deleteButton.addEventListener('click', () => onDeleteCard(cardElement, cardData));
    } else {
        deleteButton.remove();
    }

    // Обработка клика по изображению
    img.addEventListener('click', () => onOpenPreviewImage(cardData));

    return cardElement;
}

export {
    createCard,
    handleDeleteCard,
    handleLikeCard
};
