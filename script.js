const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id], footer[id]");
const revealElements = document.querySelectorAll(".reveal");

// Shrink navbar after scrolling.
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);

  // Highlight the navigation item for the section currently in view.
  let current = "home";

  sections.forEach(section => {
    const top = section.offsetTop - 130;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navItems.forEach(item => {
    item.classList.toggle(
      "active",
      item.getAttribute("href") === `#${current}`
    );
  });
});

// Mobile menu.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal elements as they enter the viewport.
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(element => observer.observe(element));

// Current year in footer.
document.getElementById("year").textContent = new Date().getFullYear();
