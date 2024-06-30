import van from 'vanjs-core';
import './index.scss';

const { div, p } = van.tags as any;

export default function signUpFooter() {
    return div(
        { class: 'sign-up-footer' },
        p({ class: 'body--m-regular' }, 'Don’t have an account?'),
        p({ class: 'body--m-semibold' }, 'Sign up')
    );
}
