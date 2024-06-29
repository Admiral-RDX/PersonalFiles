import van from 'vanjs-core';
import { ViewportRender } from '../components/viewport/viewport.ts';
import { HeaderMenu } from '../components/header/header.ts';
import './pages.scss';

const { div } = van.tags;

export const Home = function Header() {
    return div({ class: 'page' }, HeaderMenu(), ViewportRender());
};
