const handleLikeCard = (cardId, likeButton, likesCounter) => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeRequest = isLiked ? deleteLike(cardId) : putLike(cardId);

    likeRequest
        .then(cardData => {
            likeButton.classList.toggle('card__like-button_is-active');
            likesCounter.textContent = cardData.likes.length;
        })
        .catch(err => console.error('Ошибка лайка:', err));
};

const handleDeleteCard = (cardElement, cardId) => {
    deleteCard(cardId)
        .then(() => cardElement.remove())
        .catch(err => console.error('Ошибка удаления карточки:', err));
};

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
    const likesCounter = card.querySelector('.card__like-counter');

    title.textContent = data.name;
    image.src = data.link;
    image.alt = data.name;
    likesCounter.textContent = data.likes.length;

    if (data.likes.some(user => user._id === myUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (data.owner && data.owner._id === myUserId) {
        deleteButton.addEventListener('click', () => {
            onDeleteCard(card, data._id);
        });
    } else {
        deleteButton.remove();
    }

    likeButton.addEventListener('click', () =>
        onLikeCard(data._id, likeButton, likesCounter)
    );

    image.addEventListener('click', () => onOpenPreviewImage(data));

    return card;
};

export { createCard, handleLikeCard, handleDeleteCard };