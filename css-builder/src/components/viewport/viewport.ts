import van from 'vanjs-core';
import './viewport.scss';

const { div, p, img } = van.tags;

export const ViewportRender = function Header() {
    return div(
        { class: 'viewport' },
        div(
            { class: 'left-side side-preset' },
            div(
                { class: 'object-list' },
                div(
                    p(img({ src: '/icons/files.svg' }), 'First'),
                    p(img({ src: '/icons/files.svg' }), 'First'),
                    div(
                        p(img({ src: '/icons/files.svg' }), 'First'),
                        p(img({ src: '/icons/files.svg' }), 'First')
                    )
                )
            )
        ),
        div({ class: 'viewport-render' }, 'viewport'),
        div({ class: 'right-side side-preset' })
    );
};
