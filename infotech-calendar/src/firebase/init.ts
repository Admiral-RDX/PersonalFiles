import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../config.ts';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const google_auth_provider = new firebase.auth.GoogleAuthProvider();

export { db };
