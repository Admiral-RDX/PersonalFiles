import van from 'vanjs-core';
import './index.scss';
import { isValidEmail, isValidPassword } from '../../../../helpers/zod.ts';

const { input, div, img } = van.tags as any;

export default function inputEmail() {
    return div(
        {
            class: 'input-base',
        },
        img({ src: '/icons/bold/iconly_bold--message.svg' }),
        input({
            oninput: (e: any) =>
                isValidEmail(e.target.value)
                    ? e.target.parentElement.classList.add('input-correct')
                    : e.target.parentElement.classList.remove('input-correct'),
            name: '',
            type: 'email',
            placeholder: 'Enter your name',
            class: 'body--m-semibold',
        })
    );
}

export function inputPassword() {
    return div(
        { class: 'input-base' },
        img({ src: '/icons/bold/iconly_bold--lock.svg' }),
        input({
            oninput: (e: any) =>
                isValidPassword(e.target.value)
                    ? e.target.parentElement.classList.add('input-correct')
                    : e.target.parentElement.classList.remove('input-correct'),
            name: '',
            type: 'password',
            placeholder: 'Enter your name',
            class: 'body--m-semibold',
        })
    );
}
