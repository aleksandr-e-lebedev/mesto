class ImagePopup extends Popup {
    open(src) {
        this._element.querySelector('.popup__image').setAttribute('src', src);
        super.open();
    }
}