import { AppData, FirebaseConfig, Paths } from './module';

export const firebaseConfig: FirebaseConfig = {
    apiKey: 'AIzaSyCsiHKSvj1BCXyQXCfTGbWaG6S54SoiYLE',
    authDomain: 'infotech-calendar-72a1b.firebaseapp.com',
    projectId: 'infotech-calendar-72a1b',
    storageBucket: 'infotech-calendar-72a1b.appspot.com',
    messagingSenderId: '148048902245',
    appId: '1:148048902245:web:bc9016c3f694cc7cd56e8c',
    measurementId: 'G-R40VWDZMGB',
};

export const ROUTES: Paths = {
    LOGIN: 'login',
    DASHBOARD: 'dashboard',
    CALENDAR: 'calendar',
};

export const app_data: AppData = {
    events: [],
    search_limit: 50,
};
