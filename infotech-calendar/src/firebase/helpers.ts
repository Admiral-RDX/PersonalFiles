import firebase from 'firebase/compat/app';
import { db, google_auth_provider } from './init.ts';
import { navigate } from 'vanjs-routing';
import { collection, getDocs } from 'firebase/firestore';
import { app_data } from '../config.ts';

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

export async function fetchEventData(): Promise<void> {
    try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        app_data.events = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}
