class DataSetupPopup extends Popup {
    constructor({ container, selector, handleOpenCallback, handleCloseCallback, handleInputCallback, handleSubmitCallback }) {
        super(container, selector);
        this._handleOpen = handleOpenCallback || function () {};
        this._handleClose = handleCloseCallback || function () {};
        this._handleInput = handleInputCallback || function () {};
        this._handleSubmit = handleSubmitCallback || function () {};
    }

    _addListeners() {
        super._addListeners();
        this._element.querySelector('.popup__form').addEventListener('input', this._handleInput);
        this._element.querySelector('.popup__form').addEventListener('submit', this._handleSubmit);
    }

    _removeListeners() {
        super._removeListeners();
        this._element.querySelector('.popup__form').removeEventListener('input', this._handleInput);
        this._element.querySelector('.popup__form').removeEventListener('submit', this._handleSubmit);
    }

    activateButton() {
        const button = this._element.querySelector('.button');

        button.classList.remove('button_disabled');
        button.removeAttribute('disabled', true);
    }

    deactivateButton() {
        const button = this._element.querySelector('.button');

        button.classList.add('button_disabled');
        button.setAttribute('disabled', true);
    }

    open() {
        super.open();
        this._handleOpen();
    }

    close() {
        this._handleClose();
        super.close();
    }
}