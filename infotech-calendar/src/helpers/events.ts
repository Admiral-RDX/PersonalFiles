import { app_data } from '../config.ts';
import { sortByLevenshtein } from './search.ts';

export async function renderEventsToDom() {
    const search_result_container = document.getElementById('search-result');

    if (!search_result_container)
        throw new Error('Search result container not found!');

    if (!search_result_container.firstChild)
        throw new Error('Search result container is empty!');

    while (search_result_container.children.length > 1) {
        // @ts-ignore
        search_result_container.removeChild(search_result_container.lastChild);
    }

    let search_result_first_child_clone = search_result_container.firstChild;

    app_data.events.forEach((event, idx) => {
        if (idx > app_data.search_limit) return;
        const event_div = search_result_first_child_clone.cloneNode(true);

        const event_duration = event.duration === 0 ? 'Whole day' : 'unknown';
        const event_date = `${event.date[2]}.${event.date[1]}${'.' + event.date[0]}`;

        event_div.childNodes[0].textContent = event.name;
        event_div.childNodes[1].textContent = event.metadata;
        event_div.childNodes[2].textContent = event_date;
        event_div.childNodes[3].textContent = event_duration;

        search_result_container.appendChild(event_div);
    });

    (
        document.getElementById('search-placeholder') as HTMLElement
    ).style.display = 'none';
}

export async function sortEventList(search_results: any) {
    sortByLevenshtein(app_data.events, search_results);
}
