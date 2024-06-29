import van from 'vanjs-core';
import './back-arrow.scss';
import { scrollBackContainer } from '../../../helpers/scroll.ts';

const { div, img } = van.tags as any;

export default function backArrow(should_scroll: boolean = false) {
    return div(
        {
            class: 'back-arrow',
            onclick: () => should_scroll && scrollBackContainer(),
        },
        img({
            src: '/icons/light-outline/iconly_light-outline--arrow-----left.svg',
        })
    );
}
