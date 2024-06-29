import van from 'vanjs-core';
import './index.scss';
import submitButton from '../../components/ui/button/submit.ts';

const { div, img, p } = van.tags as any;

export default function walkthrough() {
    return div(
        { class: 'walkthrough' },
        img({ src: '/images/women-listening.png' }),
        div(
            { class: 'walkthrough__content' },
            p(
                { class: 'heading__h2' },
                div('Listen to the best music everyday with'),
                div('Hearme'),
                div('now!')
            ),
            submitButton()
        )
    );
}
