class ScrollReveal {
  constructor() {
    this.sections = document.querySelectorAll(".section");
    this.initObserver();
  }

  initObserver() {
    const options = {
      root: null, // viewport
      threshold: 0.2, // 20% visible
    };

    const observer = new IntersectionObserver(this.revealSection, options);

    this.sections.forEach((section) => {
      observer.observe(section);
    });
  }

  revealSection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entries[0]) {
          entries[0].target.classList.add("dfjs");
        } else {
          entry.target.classList.add("visible");
        }
        observer.unobserve(entry.target); // Once revealed, stop observing
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ScrollReveal();
});
