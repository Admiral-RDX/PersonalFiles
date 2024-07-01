import van from 'vanjs-core';
import './auth.scss';

const { div, p } = van.tags as any;

export default function Authenticating() {
    return div(
        { class: 'authenticating fixed-center' },
        p('Authenticating'),
        div({ class: 'loader' })
    );
}
