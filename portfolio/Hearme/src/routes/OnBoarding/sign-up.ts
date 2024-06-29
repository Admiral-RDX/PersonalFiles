import van from 'vanjs-core';
import './index.scss';
import backArrow from '../../components/ui/navigation/back-arrow.ts';
import contentSpacer from '../../components/ui/spacer/spacer.ts';
import submitButton from '../../components/ui/button/submit.ts';
import inputEmail, {
    inputPassword,
} from '../../components/ui/form/input/input.ts';

const { div, img, p, input, label, span } = van.tags as any;

export default function signUp() {
    return div(
        { class: 'sign-up' },
        backArrow(true),
        img({ src: '/images/logo.svg' }),
        p({ class: 'heading__h3' }, 'Create Your Account'),
        div(
            { class: 'form' },
            inputEmail(),
            inputPassword(),
            div(
                { class: 'checkbox-form' },
                input({ type: 'checkbox', id: 'checkbox' }),
                span({ class: 'checkmark' }),
                label(
                    { for: 'checkbox', class: 'body--m-semibold' },
                    'Remember me'
                )
            ),
            submitButton()
        ),
        div(
            { class: 'flex flex-col gap-125' },
            contentSpacer('or continue with'),
            div(
                { class: 'walk-in-ways--next' },
                div(img({ src: '/images/facebook.svg' })),
                div(img({ src: '/images/google.svg' })),
                div(img({ src: '/images/apple.svg' }))
            )
        ),
        div(
            { class: 'footer body--m-semibold' },
            p('Don’t have an account?'),
            p('Sign up')
        )
    );
}
