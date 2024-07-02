import van from 'vanjs-core';
import './dashboard.scss';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/init.ts';

const { div, input } = van.tags as any;

const fetchData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const docs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log('Data fetched: ', docs);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

export default function Dashboard() {
    fetchData().then();

    return div(
        { class: 'dashboard' },
        div(
            { class: 'dashboard--header' },
            div(
                { class: 'dashboard--header--search' },
                input({
                    type: 'text',
                    placeholder: 'Search...',
                })
            ),
            div({ class: 'dashboard--header--add' }, '+')
        ),
        div({ class: 'dashboard--body' }, 'Search results...')
    );
}
