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

function getUserAuth() {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
            resolve(user);
            return user;
        });
    });
}

export function authGuard(Component: () => HTMLElement): () => HTMLElement {
    return (): HTMLElement => {
        const endPath = window.location.pathname;

        getUserAuth().then((user) => {
            if (endPath === '/auth') {
                handleAuthRoute(user);
            } else {
                handleOtherRoutes(user, endPath);
            }
        });

        return Component();
    };
}

function handleAuthRoute(user: any): void {
    user ? navigate('/dashboard') : navigate('/');
}

function handleOtherRoutes(user: any, endPath: string): void {
    user
        ? navigate(endPath === '/' ? '/dashboard' : endPath)
        : navigate(endPath === '/calendar' ? '/calendar' : '/');
}
