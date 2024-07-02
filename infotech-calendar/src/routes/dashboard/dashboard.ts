import van from 'vanjs-core';

const { div, input } = van.tags as any;

export default function Dashboard() {
    return div(
        { class: 'dashboard' },
        div(
            { class: 'dashboard-header' },
            div(
                input({
                    class: 'dashboard-header--input',
                    type: 'text',
                    placeholder: 'Search...',
                })
            ),
            div({ class: 'dashboard-header--add' })
        ),
        div({ class: 'search-results' })
    );
}
