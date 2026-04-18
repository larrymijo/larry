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