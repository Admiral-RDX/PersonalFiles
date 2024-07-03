import {
    addDays,
    eachDayOfInterval,
    endOfWeek,
    endOfYear,
    format,
    getMonth,
    startOfWeek,
    startOfYear,
} from 'date-fns';
import { differenceInCalendarWeeks } from 'date-fns/differenceInCalendarWeeks';

export function renderCalendar() {
    setTimeout(() => {
        const current_date = new Date();
        const start_of_year = startOfYear(current_date);
        const end_of_year = endOfYear(current_date);

        const weeks_of_year = differenceInCalendarWeeks(
            end_of_year,
            start_of_year
        );

        renderWeeks(weeks_of_year, start_of_year);
    }, 5);
}

function renderWeeks(number_of_weeks: number, start_date: Date): void {
    const week_sample = document.querySelector('.calendar--body--week');

    const calendar_body = document.querySelector('.calendar--body');

    if (!week_sample) throw new Error('Week container not found!');

    if (!calendar_body) throw new Error('Calendar body not found!');

    if (!calendar_body.lastChild) throw new Error('Week container is empty!');

    while (calendar_body.children.length > 1) {
        calendar_body.removeChild(calendar_body.lastChild);
    }

    let current_date = start_date;

    for (let i = 0; i < number_of_weeks; i++) {
        const week_div = week_sample.cloneNode(true);
        const days_nodes = week_div.querySelectorAll('h6');

        const start_of_week = startOfWeek(current_date);
        const end_of_week = endOfWeek(current_date);

        const days = eachDayOfInterval({
            start: start_of_week,
            end: end_of_week,
        });

        days.forEach((day, index) => {
            days_nodes[index].innerText = format(day, 'd');
            if (getMonth(day) !== getMonth(current_date)) {
                days_nodes[index].classList.add('different-month');
            } else {
                days_nodes[index].classList.remove('different-month');
            }
        });

        current_date = addDays(end_of_week, 1);

        calendar_body.appendChild(week_div);
    }
}
