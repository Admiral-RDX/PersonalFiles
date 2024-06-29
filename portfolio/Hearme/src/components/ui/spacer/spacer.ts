import van from 'vanjs-core';
import './index.scss';

const { div, p } = van.tags as any;

export default function contentSpacer(name: string) {
    return div(
        { class: 'or-spacer' },
        div({ class: 'line' }),
        p({ class: 'body--xl-semibold' }, name),
        div({ class: 'line' })
    );
}
