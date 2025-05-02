// @todo: Импорт
import { createCard, handleDeleteCard, handleLikeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { initialCards } from './components/cards.js';
import '../pages/index.css';
import avatar from '../images/avatar.jpg';

const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard['place-name'];
const linkInput = formNewCard['link'];
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

const profileImage = document.querySelector('.profile__image');
if (profileImage) {
    profileImage.style.backgroundImage = `url(${avatar})`;
}

const handleImageClick = data => {
    popupImageElement.src = data.link;
    popupImageElement.alt = data.name;
    popupCaptionElement.textContent = data.name;
    openPopup(popupImage);
};

formEditProfile.addEventListener('submit', e => {
    e.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEditProfile);
});

formNewCard.addEventListener('submit', e => {
    e.preventDefault();
    const card = createCard(
        { name: placeNameInput.value, link: linkInput.value },
        {
            onDeleteCard: handleDeleteCard,
            onLikeCard: handleLikeCard,
            onOpenPreviewImage: handleImageClick
        },
        cardTemplate
    );
    placesList.prepend(card);
    formNewCard.reset();
    closePopup(popupAddCard);
});

initialCards.forEach(data => {
    const card = createCard(
        data,
        {
            onDeleteCard: handleDeleteCard,
            onLikeCard: handleLikeCard,
            onOpenPreviewImage: handleImageClick
        },
        cardTemplate
    );
    placesList.append(card);
});

editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => {
    formNewCard.reset();
    openPopup(popupAddCard);
});

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', e => {
        const target = e.target;
        if (target instanceof HTMLElement && (target.classList.contains('popup__close') || target === popup)) {
            closePopup(popup);
        }
    });
});
