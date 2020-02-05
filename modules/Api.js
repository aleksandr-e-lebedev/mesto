class Api {
    constructor({ address, cohortId, token }) {
        this.address = address;
        this.cohortId = cohortId;
        this.token = token;
    }

    getAppData() {
        return Promise.all([this.getUserData(), this.getInitialCards()]);
    }
    
    getUserData() {
        return fetch(`${this.address}/${this.cohortId}/users/me`, {
            headers: {
                authorization: this.token
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
    
    getInitialCards() {
        return fetch(`${this.address}/${this.cohortId}/cards`, {
            headers: {
                authorization: this.token
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
    
    setUserData({ name, about }) {
        return fetch(`${this.address}/${this.cohortId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
    
    addCard({ name, link }) {
        return fetch(`${this.address}/${this.cohortId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
    
    removeCard(cardId) {
        return fetch(`${this.address}/${this.cohortId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token
            }

        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
    
    toggleCardLike(cardId, like) {
        return fetch(`${this.address}/${this.cohortId}/cards/like/${cardId}`, {
            method: like ? 'PUT' : 'DELETE',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
    
    setUserAvatar(avatar) {
        return fetch(`${this.address}/${this.cohortId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
}