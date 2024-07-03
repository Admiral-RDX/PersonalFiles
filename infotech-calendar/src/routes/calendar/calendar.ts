import van from 'vanjs-core';
import './calendar.scss';
import { renderCalendar } from '../../helpers/calendar.ts';

const { div, p, h6 } = van.tags as any;

function refreshPage() {
    window.location.reload();
}

export default function Calendar() {
    const fiftyMinutes = 50 * 60 * 1000;
    // const oneMinute = 60 * 1000;

    renderCalendar();

    // setInterval(refreshPage, fiftyMinutes);
    setInterval(refreshPage, fiftyMinutes);

    return div(
        { class: 'calendar' },
        div(
            { class: 'calendar--header' },
            p('Monday'),
            p('Tuesday'),
            p('Wednesday'),
            p('Thursday'),
            p('Friday'),
            p('Saturday'),
            p('Sunday')
        ),
        div(
            { class: 'calendar--body' },
            div(
                { class: 'calendar--body--week' },
                div(
                    { class: 'calendar--body--week--day' },
                    h6('1'),
                    p('Michal, Michaela')
                ),
                div(
                    { class: 'calendar--body--week--day' },
                    h6('1'),
                    p('Michal, Michaela')
                ),
                div(
                    { class: 'calendar--body--week--day' },
                    h6('1'),
                    p('Michal, Michaela')
                ),
                div(
                    { class: 'calendar--body--week--day' },
                    h6('1'),
                    p('Michal, Michaela')
                ),

                div(
                    { class: 'calendar--body--week--day' },
                    h6('1'),
                    p('Michal, Michaela')
                ),
                div(
                    { class: 'calendar--body--week--day' },
                    h6('1'),
                    p('Michal, Michaela')
                ),
                div(
                    { class: 'calendar--body--week--day' },
                    h6('1'),
                    p('Michal, Michaela')
                )
            )
        )
    );
}
