const root = document.querySelector('.root');

const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userPhoto = document.querySelector('.user-info__photo');

const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit-button');

const api = new Api({
    address: 'http://95.216.175.5',
    cohortId: 'cohort6',
    token: '4992ddad-a97c-4c49-867a-edb2fabc348b'
});

const handleAppData = function ([ userData, cardsData ]) {
    /* Функции */

    const renderUserNameJob = function (name, about) {
        userName.textContent = name;
        userJob.textContent = about;
    }

    const renderUserAvatar = function (avatar) {
        userPhoto.style.backgroundImage = `url(${avatar})`;
    }

    const renderProfile = function ({ name, about, avatar }) {
        renderUserNameJob(name, about);
        renderUserAvatar(avatar);
    }

    const createCard = function (cardData) {
        const card = new Card({
            ...cardData,
            userId: userData._id,
            selector: '#place-card-template',
            handleRemoveCallback: function (event) {
                event.stopPropagation();

                if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
                    api.removeCard(cardData._id)
                        .then(() => {
                            card.remove();
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                }
            },
            handleLikeCallback: function () {
                api.toggleCardLike(cardData._id, !card.isLiked())
                    .then((cardData) => {
                        card.likes = cardData.likes;
                        card.toggleLike();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            handleOpenPopupCallback: function () {
                imagePopup.open(cardData.link);
            }
        });

        return card.render();
    }

    /* Инстансы классов */

    const cardList = new CardList('.places-list');

    const validation = new Validation(words);

    const newPlacePopup = new DataSetupPopup({
        container: root,
        selector: '#new-place-popup-template',
        handleCloseCallback: function () {
            document.forms.newPlace.reset();
            validation.resetError(document.querySelectorAll('.popup__error-message'));
            newPlacePopup.deactivateButton();
        },
        handleInputCallback: function (event) {
            validation.isValid(event) ? newPlacePopup.activateButton() : newPlacePopup.deactivateButton();
        },
        handleSubmitCallback: function (event) {
            event.preventDefault();

            const {
                placeName,
                placeLink,
                newPlace: button
            } = event.currentTarget.elements;

            button.textContent = 'Загрузка...';
            button.classList.add('popup__button_type_is-loading');

            api.addCard({
                name: placeName.value,
                link: placeLink.value
            })
                .then((card) => {
                    cardList.addCard(cardList.container, card, createCard);
                    newPlacePopup.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    button.textContent = '+';
                    button.classList.remove('popup__button_type_is-loading');
                });
        }
    });

    const profilePopup = new DataSetupPopup({
        container: root,
        selector: '#profile-popup-template',
        handleOpenCallback: function () {
            document.querySelector('#username').value = userName.textContent;
            document.querySelector('#aboutUser').value = userJob.textContent;
            validation.isValidForm(document.forms.editProfile) ? profilePopup.activateButton() : profilePopup.deactivateButton();
        },
        handleCloseCallback: function () {
            document.forms.editProfile.reset();
            validation.resetError(document.querySelectorAll('.popup__error-message'));
        },
        handleInputCallback: function (event) {
            validation.isValid(event) ? profilePopup.activateButton() : profilePopup.deactivateButton();
        },
        handleSubmitCallback: function (event) {
            event.preventDefault();

            const {
                username,
                aboutUser,
                editProfile: button
            } = event.currentTarget.elements;

            button.textContent = 'Загрузка...';

            api.setUserData({
                name: username.value,
                about: aboutUser.value
            })
                .then(({ name, about }) => {
                    renderUserNameJob(name, about);
                    profilePopup.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    button.textContent = 'Сохранить';
                });
        }
    });

    const imagePopup = new ImagePopup(root, '#image-popup-template');

    const avatarPopup = new DataSetupPopup({
        container: root,
        selector: '#user-avatar-template',
        handleCloseCallback: function () {
            document.forms.setAvatar.reset();
            validation.resetError(document.querySelectorAll('.popup__error-message'));
            avatarPopup.deactivateButton();
        },
        handleInputCallback: function (event) {
            validation.isValidInput(event.target) ? avatarPopup.activateButton() : avatarPopup.deactivateButton();
        },
        handleSubmitCallback: function (event) {
            event.preventDefault();

            const {
                avatarLink,
                setAvatar: button
            } = event.currentTarget.elements;

            button.textContent = 'Загрузка...';

            api.setUserAvatar(avatarLink.value)
                .then(({ avatar }) => {
                    renderUserAvatar(avatar);
                    avatarPopup.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    button.textContent = 'Сохранить';
                });
        }
    });

    /* Слушатели событий */
    addButton.addEventListener('click', newPlacePopup.open);
    editButton.addEventListener('click', profilePopup.open);
    userPhoto.addEventListener('click', avatarPopup.open);

    /* Вызовы функций */
    renderProfile(userData);
    cardList.render(cardList.container, cardsData, createCard);
};

api.getAppData()
    .then(handleAppData)
    .catch(err => console.log(err));