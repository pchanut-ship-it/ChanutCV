const header = document.querySelector("[data-header]");
const navLinks = [...document.querySelectorAll(".nav a")];
const revealItems = [...document.querySelectorAll(".reveal")];

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const syncActiveNav = () => {
  const anchorLine = window.innerHeight * 0.45;
  let activeId = null;

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= anchorLine) {
      activeId = section.id;
    }
  });

  const isAtPageEnd =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (isAtPageEnd && sections.length) {
    activeId = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
  });
};

window.addEventListener("scroll", syncHeader, { passive: true });
window.addEventListener("scroll", syncActiveNav, { passive: true });
window.addEventListener("hashchange", syncActiveNav);
syncHeader();
syncActiveNav();
