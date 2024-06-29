import van from 'vanjs-core';
import './header.scss';
import triggerNavMenu, { nav_state } from '../../events/events.ts';

const { div, p } = van.tags;

export const Header = function Header() {
    return div(
        { class: 'header' },
        div({ onclick: () => triggerNavMenu() }, p('Menu'), p('[shift + q]'))
    );
};

export const HeaderMenu = function Header() {
    return div(
        { class: nav_state },
        p('Home'),
        p('Home'),
        p('Home'),
        p('Home'),
        p('Home')
    );
};
