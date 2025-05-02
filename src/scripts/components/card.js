// @todo Функция лайка
const handleLikeCard = btn => btn.classList.toggle('card__like-button_is-active');

// @todo Функция удаления карточки
const handleDeleteCard = card => card.remove();

// @todo Функция создания карточки
const createCard = (data, { onDeleteCard, onLikeCard, onOpenPreviewImage } = {}, template) => {
    const card = template.cloneNode(true);
    const img = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');
    const deleteBtn = card.querySelector('.card__delete-button');
    const likeBtn = card.querySelector('.card__like-button');

    title.textContent = data.name;
    img.src = data.link;
    img.alt = data.name;

    deleteBtn.addEventListener('click', () => onDeleteCard(card));
    likeBtn.addEventListener('click', () => onLikeCard(likeBtn));
    img.addEventListener('click', () => onOpenPreviewImage(data));

    return card;
};

export { createCard, handleLikeCard, handleDeleteCard };
