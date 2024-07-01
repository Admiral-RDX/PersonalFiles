import van from 'vanjs-core';
import './login.scss';
import { googleSignInPopup } from '../../firebase/helpers.ts';
import { routeTo } from 'vanjs-router';

const { div, p } = van.tags as any;

export default function Login() {
    return div(
        { class: 'login-menu fixed-center' },
        div(
            {
                class: 'login-menu--path',
                onclick: googleSignInPopup,
            },
            div({ class: 'login-menu--path--google' }),
            p('Continue with Google')
        ),
        div(
            {
                class: 'login-menu--path',
                onclick: () => {
                    routeTo('calendar');
                },
            },
            p('Go to Calendar')
        )
    );
}
