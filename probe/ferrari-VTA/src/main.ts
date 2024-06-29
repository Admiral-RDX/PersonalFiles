import './style.scss';

document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.container');

    containers.forEach(container => {
        container.addEventListener('click', function() {
            // Remove active class from all containers
            containers.forEach(c => c.classList.remove('active'));

            // Add active class to clicked container
            this.classList.add('active');

            // Calculate transform distance
            const offset = this.offsetLeft;
            const scrollContainer: any = document.querySelector('.router-link');

            // Apply transform to slide containers
            scrollContainer.style.transform = `translateX(-${offset}px)`;
        });
    });
});
