import van from 'vanjs-core';
import './button.scss';
import { scrollContainer } from '../../../helpers/scroll.ts';

const { button } = van.tags as any;

export default function submitButton(should_scroll: boolean = false) {
    return button(
        {
            class: 'submit-button body--l',
            onclick: () => should_scroll && scrollContainer(),
        },
        'Get Started'
    );
}
