import './global.scss';
import 'firebase/compat/auth';
import { navigate, Router } from 'vanjs-routing';
import Login from './routes/login/login.ts';
import Dashboard from './routes/dashboard/dashboard.ts';
import Calendar from './routes/calendar/calendar.ts';
import { isUserAuthorized } from './firebase/helpers.ts';

export const App = () => {
    return Router({
        basename: '',
        routes: [
            // Guard is executed for every route
            { path: '/', component: authGuard(Login) },
            { path: '/dashboard', component: authGuard(Dashboard) },
            { path: '/calendar', component: Calendar },
        ],
    });
};

function authGuard(child: any) {
    const destination = window.location.pathname;

    isUserAuthorized().then((isAuthorized) => {
        if (!isAuthorized) {
            if (destination !== '/dashboard') {
                navigate(destination);
            } else {
                navigate('/');
            }
        } else {
            if (destination === '/') {
                navigate('/dashboard');
            }
        }
    });

    return child;
}
