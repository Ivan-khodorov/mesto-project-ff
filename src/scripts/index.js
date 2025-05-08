import { createCard, handleDeleteCard, handleLikeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
    getUserInfo,
    getInitialCards,
    patchUserInfo,
    patchAvatar,
    postCard,
    deleteCard,
    putLike,
    deleteLike
} from './components/api.js';
import '../pages/index.css';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

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
const avatarPopup = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms['avatar-form'];
const avatarInput = formAvatar['avatar'];
const avatarSubmitButton = formAvatar.querySelector('.popup__button');
const avatarOpenButton = document.querySelector('.profile__image');

let myUserId = null;

const handleImageClick = data => {
    popupImageElement.src = data.link;
    popupImageElement.alt = data.name;
    popupCaptionElement.textContent = data.name;
    openPopup(popupImage);
};

// Обработчик формы редактирования профиля
formEditProfile.addEventListener('submit', (e) => {
    e.preventDefault();
    patchUserInfo(nameInput.value, jobInput.value)
        .then((userData) => {
            profileTitle.textContent = userData.name;
            profileDescription.textContent = userData.about;
            closePopup(popupEditProfile);
        })
        .catch((err) => console.error('Ошибка сохранения профиля:', err));
});

// Обработчик формы добавления карточки
formNewCard.addEventListener('submit', (e) => {
    e.preventDefault();
    postCard({
        name: placeNameInput.value,
        link: linkInput.value
    })
        .then((cardData) => {
            const card = createCard(
                cardData,
                {
                    onDeleteCard: handleDeleteCard,
                    onLikeCard: handleLikeCard,
                    onOpenPreviewImage: handleImageClick
                },
                cardTemplate,
                myUserId
            );
            placesList.prepend(card);
            formNewCard.reset();
            closePopup(popupAddCard);
        })
        .catch((err) => console.error('Ошибка добавления карточки:', err));
});

 formAvatar.addEventListener('submit', (e) => {
     e.preventDefault();
     const originalText = avatarSubmitButton.textContent;
     avatarSubmitButton.textContent = 'Сохранение...';

     patchAvatar(avatarInput.value)
         .then((userData) => {
             profileImage.style.backgroundImage = `url(${userData.avatar})`;
             formAvatar.reset();
             closePopup(avatarPopup);
         })
         .catch((err) => console.error('Ошибка обновления аватара:', err))
         .finally(() => {
             avatarSubmitButton.textContent = originalText;
         });
 });



Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
        myUserId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;

        cards.reverse().forEach((data) => {
            const card = createCard(
                data,
                {
                    onDeleteCard: handleDeleteCard,
                    onLikeCard: handleLikeCard,
                    onOpenPreviewImage: handleImageClick
                },
                cardTemplate,
                myUserId
            );
            placesList.append(card);
        });
    })
    .catch((err) => console.error('Ошибка при инициализации:', err));

// Открытие попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formEditProfile, validationConfig);
    openPopup(popupEditProfile);
});

// Открытие попапа новой карточки
addCardButton.addEventListener('click', () => {
    formNewCard.reset();
    clearValidation(formNewCard, validationConfig);
    openPopup(popupAddCard);
});
avatarOpenButton.addEventListener('click', () => {
    formAvatar.reset();
    clearValidation(formAvatar, validationConfig);
    openPopup(avatarPopup);
});


// Закрытие попапов по кнопке и оверлею
document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('mousedown', (e) => {
        const target = e.target;
        if (
            target instanceof HTMLElement &&
            (target.classList.contains('popup__close') || target === popup)
        ) {
            closePopup(popup);
        }
    });
});

// Включение валидации
enableValidation(validationConfig);
