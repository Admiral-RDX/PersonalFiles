import './styles/global.scss';
import van from 'vanjs-core';
import Login from './routes/login/login.ts';
import { Route } from 'vanjs-router';
import Dashboard from './routes/dashboard/dashboard.ts';
import Calendar from './routes/calendar/calendar.ts';
import Authenticating from './routes/authenticating/auth.ts';

const { div } = van.tags as any;

export const Router = () => {
    return div(
        Route({ name: 'login' }, Login),
        Route({ name: 'dashboard' }, Dashboard),
        Route({ name: 'calendar' }, Calendar),
        Route({ name: 'auth' }, Authenticating),
        () => {
            handleProtectedRoutes();
        }
    );
};

function handleProtectedRoutes() {
    console.log(window.location.hash);
}
