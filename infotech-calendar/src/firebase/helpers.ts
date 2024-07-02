import firebase from 'firebase/compat/app';
import { google_auth_provider } from './init.ts';
import { navigate } from 'vanjs-routing';

export function googleSignInPopup() {
    firebase
        .auth()
        .signInWithPopup(google_auth_provider)
        .then(() => {
            navigate('/dashboard');
        })
        .catch((error) => {
            console.log(error);
        });
}

export function isUserAuthorized(): Promise<boolean> {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}
