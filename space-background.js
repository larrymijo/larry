document.addEventListener('DOMContentLoaded', function() {
    // Only run on the music page
    if (!document.body.classList.contains('scifi-music')) return;
    
    const spaceBackground = document.querySelector('.space-background');
    if (!spaceBackground) return;
    
    // Create stars
    createStars(spaceBackground, 200);
    
    // Create planets
    createPlanets(spaceBackground, 4);
    
    // Create shooting stars periodically
    setInterval(() => {
        createShootingStar(spaceBackground);
    }, 4000);
});

function createStars(container, count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        
        // Random star properties
        const size = Math.random() * 2 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        
        // Set star styles
        star.style.position = 'absolute';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.borderRadius = '50%';
        star.style.backgroundColor = getStarColor();
        star.style.boxShadow = `0 0 ${size * 2}px ${getStarColor()}`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.opacity = Math.random() * 0.5 + 0.5;
        star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite`;
        
        container.appendChild(star);
    }
}

function createPlanets(container, count) {
    const planetColors = [
        { main: '#ff6b6b', shadow: '#c92a2a', highlight: '#ffa8a8' }, // Red planet
        { main: '#4dabf7', shadow: '#1864ab', highlight: '#a5d8ff' }, // Blue planet
        { main: '#82c91e', shadow: '#2b8a3e', highlight: '#b2f2bb' }, // Green planet
        { main: '#cc5de8', shadow: '#862e9c', highlight: '#e599f7' }, // Purple planet
        { main: '#fcc419', shadow: '#e67700', highlight: '#ffec99' }  // Yellow planet
    ];
    
    for (let i = 0; i < count; i++) {
        const planet = document.createElement('div');
        planet.className = 'planet';
        
        // Random planet properties
        const size = Math.random() * 80 + 40; // Size between 40-120px
        const x = Math.random() * 90 + 5; // Position between 5-95%
        const y = Math.random() * 90 + 5;
        const colorIndex = Math.floor(Math.random() * planetColors.length);
        const colors = planetColors[colorIndex];
        const rotationDuration = Math.random() * 200 + 100; // Slow rotation
        
        // Set planet styles
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;
        planet.style.left = `${x}%`;
        planet.style.top = `${y}%`;
        planet.style.backgroundColor = colors.main;
        planet.style.boxShadow = `inset -${size/4}px -${size/4}px ${size/3}px ${colors.shadow}, 
                                 inset ${size/5}px ${size/5}px ${size/4}px ${colors.highlight},
                                 0 0 ${size/2}px rgba(0,0,0,0.5)`;
        planet.style.opacity = '0.8';
        planet.style.animation = `rotate ${rotationDuration}s linear infinite`;
        
        // Add craters for some planets
        if (Math.random() > 0.5) {
            addCraters(planet, size, colors);
        }
        
        // Add rings for some planets
        if (Math.random() > 0.7) {
            addRings(planet, size, colors);
        }
        
        container.appendChild(planet);
    }
    
    // Add keyframes for planet rotation
    if (!document.querySelector('#planet-keyframes')) {
        const style = document.createElement('style');
        style.id = 'planet-keyframes';
        style.textContent = `
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function addCraters(planet, planetSize, colors) {
    const craterCount = Math.floor(Math.random() * 5) + 2;
    
    for (let i = 0; i < craterCount; i++) {
        const crater = document.createElement('div');
        const size = planetSize * (Math.random() * 0.2 + 0.05);
        const x = Math.random() * (planetSize - size);
        const y = Math.random() * (planetSize - size);
        
        crater.style.position = 'absolute';
        crater.style.width = `${size}px`;
        crater.style.height = `${size}px`;
        crater.style.borderRadius = '50%';
        crater.style.backgroundColor = colors.shadow;
        crater.style.boxShadow = `inset 1px 1px 3px rgba(0,0,0,0.5)`;
        crater.style.left = `${x}px`;
        crater.style.top = `${y}px`;
        
        planet.appendChild(crater);
    }
}

function addRings(planet, planetSize, colors) {
    const ring = document.createElement('div');
    const ringWidth = planetSize * 1.8;
    const ringHeight = planetSize * 0.2;
    
    ring.style.position = 'absolute';
    ring.style.width = `${ringWidth}px`;
    ring.style.height = `${ringHeight}px`;
    ring.style.borderRadius = '50%';
    ring.style.backgroundColor = 'transparent';
    ring.style.border = `2px solid ${colors.highlight}`;
    ring.style.left = `${(planetSize - ringWidth) / 2}px`;
    ring.style.top = `${(planetSize - ringHeight) / 2}px`;
    ring.style.transform = 'rotate(30deg)';
    ring.style.boxShadow = `0 0 10px ${colors.highlight}`;
    
    planet.appendChild(ring);
}

function createShootingStar(container) {
    const shootingStar = document.createElement('div');
    
    // Random shooting star properties
    const size = Math.random() * 3 + 2;
    const startX = Math.random() * 100 + 50; // Start from right side
    const startY = Math.random() * 50;       // Start from top half
    const duration = Math.random() * 2 + 1;
    
    // Set shooting star styles
    shootingStar.style.position = 'absolute';
    shootingStar.style.width = `${size * 3}px`;
    shootingStar.style.height = `${size}px`;
    shootingStar.style.borderRadius = '50%';
    shootingStar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    shootingStar.style.boxShadow = `0 0 ${size * 4}px rgba(255, 255, 255, 0.8), 
                                   0 0 ${size * 8}px rgba(255, 255, 255, 0.5)`;
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = `${startY}%`;
    shootingStar.style.animation = `shooting ${duration}s linear forwards`;
    
    // Create trail effect
    shootingStar.style.transform = 'rotate(-45deg)';
    
    container.appendChild(shootingStar);
    
    // Remove shooting star after animation completes
    setTimeout(() => {
        shootingStar.remove();
    }, duration * 1000);
}

function getStarColor() {
    const colors = [
        'rgba(255, 255, 255, 0.9)',  // White
        'rgba(173, 216, 230, 0.9)',  // Light blue
        'rgba(255, 223, 186, 0.9)',  // Light orange
        'rgba(186, 218, 255, 0.9)'   // Light blue-ish
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}