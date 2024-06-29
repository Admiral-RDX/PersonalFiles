import van from 'vanjs-core';
import letsYouIn from './lets-you-in.ts';
import signUp from './sign-up.ts';
import loading from './loading.ts';

const { div } = van.tags as any;

export default function onBoarding() {
    return div(
        { class: 'onboarding-container' },
        loading(),
        // walkthrough(),
        letsYouIn(),
        signUp()
    );
}
