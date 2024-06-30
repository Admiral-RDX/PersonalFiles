import van from 'vanjs-core';
import { Route } from 'vanjs-router';
import onBoarding from './routes/on-boarding';

const { div } = van.tags;

export default function Router() {
    return div(Route({ name: '' }, onBoarding()));
}
