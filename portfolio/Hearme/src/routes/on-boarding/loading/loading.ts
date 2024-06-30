import van from 'vanjs-core';
import './loading.scss';
import loaderAnimatedIcon from '../../../components/loader/loader.ts';

// TODO: Remove casting
const { div } = van.tags as any;

export default function loading() {
    return div(
        { class: 'loading on-boarding--child' },
        div({ class: 'loading--hearme' }),
        loaderAnimatedIcon()
    );
}
