// Trigger nav menu
import van from 'vanjs-core';

export let nav_state = van.state('visible nav');

export default function triggerNavMenu() {
    nav_state.val =
        nav_state.val === 'visible nav' ? 'hidden nav' : 'visible nav';
}

// Append default event listeners
document.body.addEventListener('keypress', (e: KeyboardEvent) => {
    e.preventDefault();

    if (e.code === 'KeyQ') {
        triggerNavMenu();
    }

    // TODO: Add more event listeners and actions
});
