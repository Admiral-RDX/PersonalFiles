import van from 'vanjs-core';
import { Route } from 'vanjs-router';
import accountSetup from './routes/AccoutSetup/account-setup.ts';
import onBoarding from './routes/OnBoarding/onboarding.ts';

const { div } = van.tags;

export default function Router() {
    return div(
        Route({ name: '' }, onBoarding()),
        Route({ name: 'account-setup' }, accountSetup())
    );
}
