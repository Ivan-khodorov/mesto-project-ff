// @todo: Функция открытия попапа
const openPopup = popup => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
};

// @todo: Функция закрытия попапа
const closePopup = popup => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
};

// @todo: Функция закрытия попапа по Esc
const handleEscClose = e => {
    if (e.key === 'Escape') {
        const openPopupEl = document.querySelector('.popup_is-opened');
        if (openPopupEl) closePopup(openPopupEl);
    }
};

export { openPopup, closePopup, handleEscClose };
