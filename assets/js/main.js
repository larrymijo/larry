console.log("Portfolio website loaded successfully.");

/* =========================
   1. HIDE/SHOW HEADER ON SCROLL
========================= */
const header = document.querySelector(".header");
let lastScrollY = window.scrollY;
const scrollThreshold = 10;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const scrollDifference = currentScrollY - lastScrollY;

  if (currentScrollY <= 50) {
    header.classList.remove("header-hidden");
  } else if (scrollDifference > scrollThreshold) {
    header.classList.add("header-hidden");
    lastScrollY = currentScrollY;
  } else if (scrollDifference < -scrollThreshold) {
    header.classList.remove("header-hidden");
    lastScrollY = currentScrollY;
  }
});

/* =========================
   2. HERO TYPING EFFECT
========================= */
const heroTitle = document.querySelector(".hero h1");
const textToType = "Hello World! I’m Lawrence";
heroTitle.textContent = ""; // Clear the HTML text
heroTitle.classList.add("cursor"); // Add the blinking cursor

let charIndex = 0;
function typeWriter() {
  if (charIndex < textToType.length) {
    heroTitle.textContent += textToType.charAt(charIndex);
    charIndex++;
    // Randomize typing speed slightly for a human feel
    const typingSpeed = Math.floor(Math.random() * (100 - 50 + 1)) + 50; 
    setTimeout(typeWriter, typingSpeed);
  } else {
    // Optional: remove cursor after typing finishes
    setTimeout(() => heroTitle.classList.remove("cursor"), 3000); 
  }
}

// Start typing 0.5 seconds after page loads
setTimeout(typeWriter, 500);


/* =========================
   3. SCROLL REVEAL ANIMATIONS
========================= */
// Select all elements we want to animate
const elementsToReveal = document.querySelectorAll(".section h2, .section p, .project-card, .skills-list span");

// Add the base CSS class to them via JS so you don't have to edit your HTML
elementsToReveal.forEach(el => el.classList.add("reveal"));

// Create the observer
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      // Stop observing once it has animated in (so it doesn't repeat every time you scroll up and down)
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.1, // Trigger when 10% of the element is visible
  rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the very bottom of the screen
});

// Start observing
elementsToReveal.forEach(el => revealObserver.observe(el));

/* =========================
   4. SPACE CONSTELLATION CANVAS
========================= */
const canvas = document.getElementById("space-canvas");
const ctx = canvas.getContext("2d");

// Set canvas to full window size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Particle (Star) Object
const particlesArray = [];
const numberOfParticles = 80; // Adjust for more/fewer stars
const connectionDistance = 120; // How close they need to be to connect

// Mouse position object
const mouse = {
  x: null,
  y: null
};

// Track mouse movement (Makes the stars react to you!)
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Clear mouse position when it leaves the screen
window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5; // Star size
    this.speedX = (Math.random() - 0.5) * 0.5; // Slow horizontal drift
    this.speedY = (Math.random() - 0.5) * 0.5; // Slow vertical drift
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off edges smoothly
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "rgba(142, 197, 255, 0.8)"; // Matches your primary color
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Create the stars
function initParticles() {
  particlesArray.length = 0;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Draw the constellation lines
function connectParticles() {
  let opacityValue = 1;
  
  // Check every particle against every other particle
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      // If they are close, draw a line between them
      if (distance < connectionDistance) {
        // Line fades out the further apart they get
        opacityValue = 1 - (distance / connectionDistance);
        ctx.strokeStyle = `rgba(142, 197, 255, ${opacityValue * 0.2})`; // Very subtle line
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }

    // Connect to Mouse if mouse is active
    if (mouse.x != null && mouse.y != null) {
      let dxMouse = particlesArray[a].x - mouse.x;
      let dyMouse = particlesArray[a].y - mouse.y;
      let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      
      if (distanceMouse < connectionDistance) {
        opacityValue = 1 - (distanceMouse / connectionDistance);
        ctx.strokeStyle = `rgba(142, 197, 255, ${opacityValue * 0.4})`; // Slightly brighter line for mouse
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

// Animation Loop
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen every frame
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  connectParticles();
  
  requestAnimationFrame(animateParticles); // Loops smoothly
}

initParticles();
animateParticles();

/* =========================
   5. SPACE DINO SCROLL TRIGGER
========================= */
const aboutSection = document.getElementById("about");
const spaceDino = document.getElementById("space-dino");

const dinoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // If the About section is on screen, show the dino
      spaceDino.classList.add("show-dino");
    } else {
      // If we scroll away, hide the dino
      spaceDino.classList.remove("show-dino");
    }
  });
}, {
  threshold: 0.4 // Triggers when 40% of the About section is visible
});

if (aboutSection && spaceDino) {
  dinoObserver.observe(aboutSection);
}

/* =========================
   6. ROCKET LAUNCH SCROLL TRIGGER
========================= */
const heroSection = document.querySelector(".hero");
const spaceRocket = document.getElementById("space-rocket");

const rocketObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // If we are at the top of the page, the rocket lands/docks
      spaceRocket.classList.remove("launched");
      spaceRocket.classList.add("docked");
    } else {
      // As soon as we scroll down, blast off!
      spaceRocket.classList.remove("docked");
      spaceRocket.classList.add("launched");
    }
  });
}, {
  threshold: 0.3 // Triggers when 30% of the hero section is visible
});

if (heroSection && spaceRocket) {
  rocketObserver.observe(heroSection);
}