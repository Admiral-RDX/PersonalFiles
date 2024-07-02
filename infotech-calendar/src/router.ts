import './styles/global.scss';
import 'firebase/compat/auth';
import { Router } from 'vanjs-routing';
import Login from './routes/login/login.ts';
import Authenticating from './routes/authenticating/auth.ts';
import Dashboard from './routes/dashboard/dashboard.ts';
import Calendar from './routes/calendar/calendar.ts';
import { authGuard } from './firebase/helpers.ts';

export const App = () => {
    return Router({
        basename: '',
        routes: [
            // Guard is executed for every route
            { path: '/', component: authGuard(Login) },
            { path: '/auth', component: authGuard(Authenticating) },
            { path: '/dashboard', component: authGuard(Dashboard) },
            { path: '/calendar', component: authGuard(Calendar) },
        ],
    });
};
