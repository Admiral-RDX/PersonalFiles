import van from 'vanjs-core';
import loading from './loading/loading.ts';
import './on-boarding.scss';
import letsYouIn from './let-u-in/let-u-in.ts';

const { div } = van.tags;

export default function onBoarding() {
    return div({ class: 'on-boarding' }, loading(), letsYouIn());
}
