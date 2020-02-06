export class Validation {
    constructor(words) {
        this._words = words;
    }

    _isValueMissing(input) {
        const errorElement = document.querySelector(`#error-${input.id}`);

        if (input.validity.valueMissing) {
            errorElement.textContent = this._words.ru.valueMissing;

            return true;
        } else {
            errorElement.textContent = '';

            return false;
        }
    }

    _isTooShort(input) {
        const errorElement = document.querySelector(`#error-${input.id}`);

        if (input.validity.tooShort) {
            errorElement.textContent = this._words.ru.tooShort;

            return true;
        } else {
            errorElement.textContent = '';

            return false;
        }
    }

    _isPatternMismatch(input) {
        const errorElement = document.querySelector(`#error-${input.id}`);

        if (input.validity.patternMismatch) {
            errorElement.textContent = this._words.ru.patternMismatch;

            return true;
        } else {
            errorElement.textContent = '';

            return false;
        }
    }

    isValidInput(input) {
        let isValidInput = true;

        if (this._isValueMissing(input)) {
            isValidInput = false;
        } else if (this._isTooShort(input)) {
            isValidInput = false;
        } else if (this._isPatternMismatch(input)) {
            isValidInput = false;
        }

        return isValidInput ? true : false;
    }

    isValidForm(form) {
        let isValidForm = true;

        [...form.elements].forEach((elem) => {
            if (!elem.classList.contains('button')) {
                if (!elem.checkValidity()) isValidForm = false;
            }
        });

        return isValidForm ? true : false;
    }

    isValid(event) {
        let isValid = true;

        if (!this.isValidInput(event.target)) isValid = false;
        if (!this.isValidForm(event.currentTarget)) isValid = false;

        return isValid ? true : false;
    }

    resetError(errors) {
        errors.forEach(error => error.textContent = '');
    }
}