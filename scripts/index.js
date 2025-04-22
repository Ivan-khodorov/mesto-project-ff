const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const popupNew = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImg = popupImage.querySelector('.popup__image');
const popupText = popupImage.querySelector('.popup__caption');
const form = document.forms['new-place'];
const nameInput = form['place-name'];
const linkInput = form['link'];
const closeBtns = document.querySelectorAll('.popup__close');

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

for (let button of closeBtns) {
    button.addEventListener('click', function () {
        let popup = button.closest('.popup');
        closePopup(popup);
    });
}

function deleteCard(card) {
    card.remove();
}

function createCard(data, onDelete) {
    let card = cardTemplate.querySelector('.card').cloneNode(true);
    let img = card.querySelector('.card__image');
    let title = card.querySelector('.card__title');
    let del = card.querySelector('.card__delete-button');
    let like = card.querySelector('.card__like-button');

    img.src = data.link;
    img.alt = data.name;
    title.textContent = data.name;

    del.addEventListener('click', function () {
        onDelete(card);
    });

    like.addEventListener('click', function () {
        like.classList.toggle('card__like-button_is-active');
    });

    img.addEventListener('click', function () {
        popupImg.src = data.link;
        popupImg.alt = data.name;
        popupText.textContent = data.name;
        openPopup(popupImage);
    });

    return card;
}

function showCard(data) {
    let card = createCard(data, deleteCard);
    placesList.prepend(card);
}

for (let i = 0; i < initialCards.length; i++) {
    showCard(initialCards[i]);
}

addButton.addEventListener('click', function () {
    openPopup(popupNew);
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = nameInput.value;
    let link = linkInput.value;

    if (name !== '' && link !== '') {
        showCard({ name: name, link: link });
        form.reset();
        closePopup(popupNew);
    }
});