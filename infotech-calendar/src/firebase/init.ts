import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../config.ts';
import 'firebase/compat/auth';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const google_auth_provider = new firebase.auth.GoogleAuthProvider();
