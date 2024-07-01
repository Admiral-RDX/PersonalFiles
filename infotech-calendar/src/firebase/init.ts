import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../config.ts';
import 'firebase/compat/auth';
import { routeTo } from 'vanjs-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const google_auth_provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged((user) => {
    routeTo('auth');
    if (user) {
        routeTo('dashboard');
    } else {
        routeTo('login');
    }
});
