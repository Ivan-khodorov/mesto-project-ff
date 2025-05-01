// @todo Функция лайка
const handleLikeCard = btn => btn.classList.toggle('card__like-button_is-active');

// @todo Функция удаления карточки
const handleDeleteCard = card => card.remove();

// @todo Функция создания карточки
const createCard = (data, onDelete, onLike, onImageClick, template) => {
    const card = template.cloneNode(true);
    const img = card.querySelector('.card__image');
    card.querySelector('.card__title').textContent = data.name;
    img.src = data.link;
    img.alt = data.name;
    card.querySelector('.card__delete-button').onclick = () => onDelete(card);
    card.querySelector('.card__like-button').onclick = () => onLike(card.querySelector('.card__like-button'));
    img.onclick = () => onImageClick(data);
    return card;
};

export { createCard, handleLikeCard, handleDeleteCard };
