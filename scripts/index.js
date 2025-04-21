
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const addCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms['new-place'];
const placeInput = newCardForm.elements['place-name'];
const linkInput = newCardForm.elements['link'];

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

function deleteCard(cardElement) {
    cardElement.remove();
}

function createCard(cardData, onDelete) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const image = cardElement.querySelector('.card__image');
    const title = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    image.src = cardData.link;
    image.alt = cardData.name;
    title.textContent = cardData.name;

    deleteButton.addEventListener('click', () => onDelete(cardElement));

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    image.addEventListener('click', () => {
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;
        openPopup(imagePopup);
    });

    return cardElement;
}

function renderCard(cardData) {
    const cardElement = createCard(cardData, deleteCard);
    cardsContainer.prepend(cardElement);
}

newCardForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    const name = placeInput.value.trim();
    const link = linkInput.value.trim();

    if (!name || !link) return;

    renderCard({ name, link });

    newCardForm.reset();
    closePopup(newCardPopup);
});

addCardButton.addEventListener('click', () => {
    openPopup(newCardPopup);
});

function setupPopupEventListeners() {
    const closeButtons = document.querySelectorAll('.popup__close');
    closeButtons.forEach(button => {
        const popup = button.closest('.popup');
        button.addEventListener('click', () => closePopup(popup));
    });
}
setupPopupEventListeners();

if (window.initialCards && Array.isArray(window.initialCards)) {
    window.initialCards.forEach(cardData => renderCard(cardData));
}