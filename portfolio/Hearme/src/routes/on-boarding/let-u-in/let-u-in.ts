import van from 'vanjs-core';
import './index.scss';
import signUpFooter from '../../../components/welcome-footer/sigup-up/sign-up-footer.ts';
import buttonBase from '../../../components/button/button.ts';
import visualSpacer from '../../../components/visual-spacer/spacer.ts';

const { div, p } = van.tags as any;

export default function letsYouIn() {
    return div(
        { class: 'lets-you-in on-boarding--child' },
        div({ class: 'lets-you-in--icon' }),
        p({ class: 'heading__h1' }, 'Let’s you in'),
        div(
            { class: 'lets-you-in--options' },
            div(
                { class: 'lets-you-in--variant' },
                div({ class: 'lets-you-in--facebook-img' }),
                p({ class: 'body--l-semibold' }, 'Continue with Facebook')
            ),
            div(
                { class: 'lets-you-in--variant' },
                div({ class: 'lets-you-in--google-img' }),
                p({ class: 'body--l-semibold' }, 'Continue with Google')
            ),
            div(
                { class: 'lets-you-in--variant' },
                div({ class: 'lets-you-in--apple-img' }),
                p({ class: 'body--l-semibold' }, 'Continue with Apple')
            )
        ),
        visualSpacer('or'),
        buttonBase('Sign in with password'),
        signUpFooter()
    );
}
