document.addEventListener("DOMContentLoaded", function() {
    // Fade-in animation for elements
    const elements = document.querySelectorAll('.fade-in, .beat-item, .fancy-text, .image-container, .link-button');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.transitionDelay = `${index * 0.15}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Add sci-fi particle effect to music page
    if (document.body.classList.contains('scifi-music')) {
        createParticles();
    }
});

function createParticles() {
    const container = document.querySelector('.container');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    document.body.insertBefore(particlesContainer, document.body.firstChild);
    
    // Create particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    
    // Set particle styles
    particle.style.position = 'absolute';
    particle.style.width = `${Math.random() * 3 + 1}px`;
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = getRandomColor();
    particle.style.borderRadius = '50%';
    particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
    particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${particle.style.backgroundColor}`;
    
    // Set initial position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    // Add animation
    const duration = Math.random() * 50 + 30;
    const delay = Math.random() * 5;
    particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
    
    // Add to container
    container.appendChild(particle);
    
    // Add keyframes for floating animation
    if (!document.querySelector('#particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(90deg);
                }
                50% {
                    transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(180deg);
                }
                75% {
                    transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(270deg);
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function getRandomColor() {
    const colors = [
        'rgba(255, 111, 145, 0.8)',  // Pink
        'rgba(61, 26, 115, 0.8)',    // Purple
        'rgba(0, 174, 239, 0.8)',    // Blue
        'rgba(130, 70, 190, 0.8)'    // Violet
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}
