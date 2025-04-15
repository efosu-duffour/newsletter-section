export const input = document.querySelector("input[type='email']") as HTMLInputElement;
const error = document.querySelector('#error') as HTMLSpanElement;
export const formInfo = document.querySelector('#form-info') as HTMLSpanElement;
export const button = document.querySelector("button[type='submit']") as HTMLInputElement;



export default function updateError(): void {
    if (input.validity.valid) {
        hideError();
        setErrorMsg('');
        undisableButton();
        return;
    }

    if (input.validity.valueMissing) {
        setErrorMsg(''); // Accessibility reasons
        setErrorMsg('Email address is required');
        showError();
        disableButton();
        return;
    }

    if (input.validity.typeMismatch) {
        setErrorMsg(''); // Accessibility reasons
        setErrorMsg('Email address is invalid');
        showError();
        disableButton();
        return;
    }
}

function setErrorMsg(message: string): void {
    error.textContent = message;
}

function showError(): void {
    if (error.classList.contains('show'))
        return;
    error.classList.remove('hide');
    error.classList.add('show');
    input.setAttribute('aria-invalid', 'true');
}

function hideError(): void {
    if (error.classList.contains('hide'))
        return;
    error.classList.remove('show');
    error.classList.add('hide');
    input.setAttribute('aria-invalid', 'false');
}

export function disableButton(): void {
    if (!button.disabled) {
        button.disabled = true;
    }
}

export function undisableButton(): void {
    if (button.disabled) {
        button.disabled = false;
    }
}

export function showSubscriptionPending(): void {
    disableButton();
    button.classList.add('loading');
    
}

export function showSubscriptionComplete(): void {
    undisableButton();
    button.classList.remove('loading');
}