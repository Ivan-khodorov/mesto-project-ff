// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');



// @todo: Функция создания карточки
function createCard(cardData, handleDelete) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const image = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');

    image.src = cardData.link;
    image.alt = cardData.name;
    title.textContent = cardData.name;

    deleteButton.addEventListener('click', function () {
        handleDelete(card);
    });

    return card;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    const card = createCard(initialCards[i], deleteCard);
    placesList.append(card);
}