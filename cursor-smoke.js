document.addEventListener('DOMContentLoaded', function() {
    // Only apply the effect on the home page
    if (!document.body.classList.contains('verne-home')) return;
    
    // Create container for smoke particles
    const smokeTrail = document.createElement('div');
    smokeTrail.className = 'cursor-smoke-trail';
    document.body.appendChild(smokeTrail);
    
    // Create main cursor smoke element
    const cursorSmoke = document.createElement('div');
    cursorSmoke.className = 'cursor-smoke';
    document.body.appendChild(cursorSmoke);
    
    // Variables for smoke effect
    let mouseX = 0;
    let mouseY = 0;
    let smokeX = 0;
    let smokeY = 0;
    let particles = [];
    let isMoving = false;
    let moveTimeout;
    let lastX = 0;
    let lastY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Check if mouse is actually moving significantly
        const distance = Math.sqrt(Math.pow(mouseX - lastX, 2) + Math.pow(mouseY - lastY, 2));
        if (distance > 5) {
            isMoving = true;
            clearTimeout(moveTimeout);
            
            // Create smoke particles while moving
            createSmokeParticle();
            
            // Update last position
            lastX = mouseX;
            lastY = mouseY;
            
            // Set timeout to detect when movement stops
            moveTimeout = setTimeout(() => {
                isMoving = false;
            }, 100);
        }
    });
    
    // Create smoke particles
    function createSmokeParticle() {
        // Only create particles if mouse is moving
        if (!isMoving) return;
        
        const particle = document.createElement('div');
        particle.className = 'smoke-particle';
        
        // Random size between 10px and 30px
        const size = Math.random() * 20 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position at current cursor position with slight randomness
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        particle.style.left = `${mouseX + offsetX}px`;
        particle.style.top = `${mouseY + offsetY}px`;
        
        // Add to DOM
        smokeTrail.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle && particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
    
    // Animation loop for smooth cursor smoke following
    function animateCursorSmoke() {
        // Smooth following effect
        smokeX += (mouseX - smokeX) * 0.1;
        smokeY += (mouseY - smokeY) * 0.1;
        
        // Update cursor smoke position
        cursorSmoke.style.left = `${smokeX}px`;
        cursorSmoke.style.top = `${smokeY}px`;
        
        // Update opacity based on movement
        cursorSmoke.style.opacity = isMoving ? '1' : '0';
        
        // Continue animation
        requestAnimationFrame(animateCursorSmoke);
    }
    
    // Start animation
    animateCursorSmoke();
    
    // Create particles at intervals when mouse is moving
    setInterval(createSmokeParticle, 50);
});