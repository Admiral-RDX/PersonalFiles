export function scrollContainer() {
    const container = document.querySelector(
        '.onboarding-container'
    ) as HTMLElement;
    const viewportWidth = window.innerWidth;
    container.scrollBy({
        left: viewportWidth,
        behavior: 'smooth',
    });
}

export function scrollBackContainer() {
    const container = document.querySelector(
        '.onboarding-container'
    ) as HTMLElement;
    const viewportWidth = window.innerWidth;
    container.scrollBy({
        left: -viewportWidth,
        behavior: 'smooth',
    });
}
