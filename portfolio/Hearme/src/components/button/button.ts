import van from 'vanjs-core';
import './index.scss';

const { button, p } = van.tags;

export default function buttonBase(display_text: string) {
    return button(
        { class: 'submit-button' },
        p({ class: 'body--l' }, display_text)
    );
}
