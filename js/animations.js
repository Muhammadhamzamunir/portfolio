/* Lightweight scroll behaviour WITHOUT hiding any section content.
   We only handle skills bar fill when the skills grid scrolls into view. */
(function () {
  const skillsGrid = document.querySelector(".skills-grid");
  if (!skillsGrid) return;

  function fillSkillBars() {
    document.querySelectorAll(".skill-fill").forEach(function (fill) {
      var pct = fill.getAttribute("data-pct");
      if (pct) {
        fill.style.setProperty("--pct", pct + "%");
      }
    });
    document.querySelectorAll(".skill").forEach(function (el) {
      el.classList.add("animated");
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          fillSkillBars();
          obs.disconnect();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(skillsGrid);
  } else {
    // Fallback for very old browsers – just fill immediately
    fillSkillBars();
  }
})();
