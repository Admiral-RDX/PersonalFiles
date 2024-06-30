import van from 'vanjs-core';
import './index.scss';

const { div, p } = van.tags as any;

export default function visualSpacer(text_content: string) {
    return div(
        { class: 'visual-spacer' },
        div({ class: 'visual-spacer--line' }),
        p({ class: 'body--xl-semibold' }, text_content),
        div({ class: 'visual-spacer--line' })
    );
}
