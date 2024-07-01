import firebase from 'firebase/compat/app';
import { google_auth_provider } from './init.ts';
import { ROUTES } from '../config.ts';

export function googleSignInPopup() {
    firebase
        .auth()
        .signInWithPopup(google_auth_provider)
        .then(() => {
            window.location.pathname = ROUTES.DASHBOARD;
        })
        .catch((error) => {
            console.log(error);
        });
}
