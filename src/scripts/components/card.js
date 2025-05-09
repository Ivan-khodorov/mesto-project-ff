// Функция обработки лайка — интерфейсная, для простого переключения класса
const handleLikeCard = (likeButton) => {
    likeButton.classList.toggle('card__like-button_is-active');
};

// Функция удаления карточки из DOM
const handleDeleteCard = (cardElement) => {
    cardElement.remove();
};

// Функция создания карточки
const createCard = (
    data,
    { onDeleteCard, onLikeCard, onOpenPreviewImage } = {},
    templateElement,
    myUserId
) => {
    const card = templateElement.cloneNode(true);
    const image = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');

    // Установка содержимого карточки
    title.textContent = data.name;
    image.src = data.link;
    image.alt = data.name;

    // Удаление карточки (доступно только владельцу)
    if (data.owner && data.owner._id === myUserId) {
        deleteButton.addEventListener('click', () => onDeleteCard(card, data._id));
    } else {
        deleteButton.remove();
    }

    // Отображение количества лайков (счётчик рядом с кнопкой)
    const likesCounter = document.createElement('span');
    likesCounter.classList.add('card__like-count');
    likesCounter.textContent = data.likes.length;
    likeButton.after(likesCounter); // Ставим после кнопки

    // Подсветка кнопки лайка, если пользователь уже лайкал
    if (data.likes.some(user => user._id === myUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    // Обработка клика по лайку
    likeButton.addEventListener('click', () =>
        onLikeCard(data._id, likeButton, likesCounter)
    );

    // Обработка клика по изображению
    image.addEventListener('click', () => onOpenPreviewImage(data));

    return card;
};

export { createCard, handleLikeCard, handleDeleteCard };
