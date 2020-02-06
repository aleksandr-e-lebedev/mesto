export class Popup {
    constructor(container, selector) {
        this._container = container;
        this._template = document.querySelector(selector).content.querySelector('.popup');
        this._element = this._template.cloneNode(true);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _addListeners() {
        this._element.querySelector('.popup__close').addEventListener('click', this.close);
        document.addEventListener('keydown', this._handleEscClose);
    }

    _removeListeners() {
        this._element.querySelector('.popup__close').removeEventListener('click', this.close);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose() {
        if (event.key === 'Escape') this.close();
    }

    open() {
        this._addListeners();
        this._element.classList.add('popup_is-opened');
        this._container.appendChild(this._element);
    }

    close() {
        this._removeListeners();
        this._element.classList.remove('popup_is-opened');
        this._element.remove();
    }
}