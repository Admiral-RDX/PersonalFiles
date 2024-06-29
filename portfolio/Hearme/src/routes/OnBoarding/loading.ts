import van from 'vanjs-core';
import './index.scss';
import { scrollContainer } from '../../helpers/scroll.ts';

// TODO: Fix transition till load

const { div, img } = van.tags as any;

// TODO: Fix transition till load

export default function loading() {
    const timeoutDuration = 1000;

    const handleTimeout = () => {
        scrollContainer();
    };

    setTimeout(handleTimeout, timeoutDuration);

    return div(
        { class: 'loading-page' },
        img({ src: '/icons/global/hearme.svg' }),
        img({ src: '/icons/animated/loading.svg' })
    );
}
