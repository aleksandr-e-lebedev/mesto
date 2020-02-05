class CardList {
    constructor(selector) {
        this.container = document.querySelector(selector);
    }

    render(container, cards, createCard) {
        cards.forEach((card) => {
            container.appendChild(createCard(card));
        });
    }

    addCard(container, card, createCard) {
        container.appendChild(createCard(card));
    }
}