import van from 'vanjs-core';
import './index.scss';
import submitButton from '../../components/ui/button/submit.ts';
import contentSpacer from '../../components/ui/spacer/spacer.ts';

const { div, img, p } = van.tags as any;

export default function letsYouIn() {
    return div(
        { class: 'lets-you-in' },
        img({ src: '/images/lets-you-in.svg', class: 'main-image' }),
        p({ class: 'heading__h1' }, 'Lets you in'),
        div(
            { class: 'walk-in-ways' },
            div(
                img({ src: '/images/facebook.svg' }),
                p({ class: 'body--l-semibold' }, 'Continue with Facebook')
            ),
            div(
                img({ src: '/images/google.svg' }),
                p({ class: 'body--l-semibold' }, 'Continue with Google')
            ),
            div(
                img({ src: '/images/apple.svg' }),
                p({ class: 'body--l-semibold' }, 'Continue with Apple')
            )
        ),
        contentSpacer('or'),
        submitButton(true),
        div(
            { class: 'footer body--m-semibold' },
            p('Don’t have an account?'),
            p('Sign up')
        )
    );
}
