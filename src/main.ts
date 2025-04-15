import './styles.css';
import updateError from './email-check.service';
import {input, formInfo, button, showSubscriptionPending, showSubscriptionComplete} from './email-check.service';
import popover from './popover.service';
import postEmail from './server';


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp)
} else {
    initApp();
}

function initApp() {
    input.addEventListener('input', updateError); // Registering to check and update email address error
    button.addEventListener('click', () => {onSubmit()}); //  Registering to submit the form
}


function onSubmit(): void {
    const email = input.value;
    showSubscriptionPending();
    formInfo.textContent = 'Form is submitting'; // Accessibility reasons
    postEmail(email)
    .then(() => {
        popover('sucess');
        showSubscriptionComplete();
        formInfo.textContent = 'Subscription successful! Please check your email to confirm'; // Accessibilty reasons
    })
    .catch(() => {
        popover('error');
        showSubscriptionComplete();
        formInfo.textContent = 'Failed to subscribe. Please ensure your email is correct or try again letter'; // Accessibilty reasons
    })
}
