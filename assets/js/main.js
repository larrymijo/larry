console.log("Portfolio website loaded successfully.");

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