class Card {
    constructor({ name, link, likes, _id, owner, userId, selector, handleRemoveCallback, handleLikeCallback, handleOpenPopupCallback }) {
        this._name = name;
        this._link = link;
        this.likes = likes;
        this._id = _id;
        this._owner = owner;
        this._userId = userId;
        this._template = document.querySelector(selector).content.querySelector('.place-card');
        this._element = this._template.cloneNode(true);

        this._handleRemove = handleRemoveCallback || function () {};
        this._handleLike = handleLikeCallback || function () {};
        this._handleOpenPopup = handleOpenPopupCallback || function () {};
    }

    _setData() {
        this._element.querySelector('.place-card__image').style.backgroundImage = `url(${this._link})`;
        this._element.querySelector('.place-card__name').textContent = this._name;
    }

    _addListeners() {
        this._element.querySelector('.place-card__delete-icon').addEventListener('click', this._handleRemove);
        this._element.querySelector('.place-card__like-icon').addEventListener('click', this._handleLike);
        this._element.querySelector('.place-card__image').addEventListener('click', this._handleOpenPopup);
    }

    _removeListeners() {
        this._element.querySelector('.place-card__delete-icon').removeEventListener('click', this._handleRemove);
        this._element.querySelector('.place-card__like-icon').removeEventListener('click', this._handleLike);
        this._element.querySelector('.place-card__image').removeEventListener('click', this._handleOpenPopup);
    }

    isLiked() {
        return this.likes.some(like => like._id === this._userId);
    }

    _setTrashCan() {
        this._element.querySelector('.place-card__delete-icon').style.display = this._owner._id === this._userId ? 'block' : 'none';
    }

    _setLikeIcon() {
        this.isLiked() ?
            this._element.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked') :
            this._element.querySelector('.place-card__like-icon').classList.remove('place-card__like-icon_liked');
    }

    _setLikeCount() {
        this._element.querySelector('.place-card__like-count').textContent = this.likes.length;
    }

    render() {
        this._setData();
        this._addListeners();
        this._setTrashCan();
        this._setLikeIcon();
        this._setLikeCount();

        return this._element;
    }

    remove() {
        this._removeListeners();
        this._element.remove();
    }

    toggleLike() {
        this._setLikeIcon();
        this._setLikeCount();
    }
}