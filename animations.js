document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in, .beat-item');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('fade-in');
    });
});
