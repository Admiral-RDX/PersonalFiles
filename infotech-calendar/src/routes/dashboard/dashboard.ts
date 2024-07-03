import van from 'vanjs-core';
import './dashboard.scss';
import { fetchEventData } from '../../firebase/helpers.ts';
import { renderEventsToDom, sortEventList } from '../../helpers/events.ts';

const { div, input, p } = van.tags as any;

export default function Dashboard() {
    fetchEventData().then(() => {
        renderEventsToDom().then();
    });

    function searchBasedOnInput(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            console.log('Call');
            const search_input = (e.target as HTMLInputElement).value;
            sortEventList(search_input).then();
            renderEventsToDom().then();
        }
    }

    return div(
        { class: 'dashboard' },
        div(
            { class: 'dashboard--header' },
            div(
                { class: 'dashboard--header--search' },
                input({
                    type: 'text',
                    placeholder: 'Search...',
                    onkeydown: (e: KeyboardEvent) => searchBasedOnInput(e),
                })
            ),
            div({ class: 'dashboard--header--add' }, '+')
        ),
        div({ id: 'search-placeholder' }, 'Search results...'),
        div(
            { class: 'dashboard--body--results', id: 'search-result' },
            div(p('name'), p('metadata'), p('date'), p('duration'))
        )
    );
}
