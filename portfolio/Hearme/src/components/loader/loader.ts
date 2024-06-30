import van from 'vanjs-core';
import './index.scss';

const { div } = van.tags;

export default function loaderAnimatedIcon() {
    return div(
        { class: 'loading-default' },
        div(),
        div(),
        div(),
        div(),

        div(),
        div(),
        div(),
        div()

        // div(),
        // div(),
        // div(),
        // div()
    );
}
