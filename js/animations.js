/* Scroll animations & parallax for all sections (excluding hero).
   Uses GSAP ScrollTrigger for smooth, consistent effects across devices. */
(function () {
  function fillSkillBars() {
    document.querySelectorAll(".skill-fill").forEach(function (fill) {
      var pct = fill.getAttribute("data-pct");
      if (pct) fill.style.setProperty("--pct", pct + "%");
    });
    document.querySelectorAll(".skill").forEach(function (el) {
      el.classList.add("animated");
    });
  }

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    var skillsGrid = document.querySelector(".skills-grid");
    if (skillsGrid && "IntersectionObserver" in window) {
      var obs = new IntersectionObserver(
        function (entries, o) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              fillSkillBars();
              o.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      obs.observe(skillsGrid);
    } else if (skillsGrid) {
      fillSkillBars();
    }
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var skillsGrid = document.querySelector(".skills-grid");
    if (skillsGrid && "IntersectionObserver" in window) {
      var obs = new IntersectionObserver(
        function (entries, o) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              fillSkillBars();
              o.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      obs.observe(skillsGrid);
    } else if (skillsGrid) {
      fillSkillBars();
    }
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const ease = "power3.out";
  const duration = 0.8;

  /* --- PARALLAX: elements move slower than scroll --- */
  document.querySelectorAll(".scroll-parallax").forEach(function (el) {
    gsap.fromTo(
      el,
      { y: 60 },
      {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      }
    );
  });

  /* Parallax for projects glow orb – subtle depth */
  var glowOrb = document.querySelector(".projects-glow-orb");
  if (glowOrb) {
    gsap.fromTo(
      glowOrb,
      { y: 0 },
      {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      }
    );
  }

  /* --- SECTION REVEALS: label + heading slide in --- */
  document.querySelectorAll(".reveal .section-label").forEach(function (el) {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  document.querySelectorAll(".reveal h2").forEach(function (el) {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  /* Lead paragraphs */
  document.querySelectorAll(".experience-lead, .education-lead, .skills-lead, .projects-lead, .contact-lead").forEach(function (el) {
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: duration * 0.9,
        ease,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  /* --- ABOUT: image from left, content from right (overflow feel) --- */
  var aboutImg = document.querySelector(".about-section .about-img-wrap");
  if (aboutImg) {
    gsap.fromTo(
      aboutImg,
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: aboutImg,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  var aboutContent = document.querySelector(".about-section .about-content");
  if (aboutContent) {
    gsap.fromTo(
      aboutContent,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: aboutContent,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  /* --- EXPERIENCE: timeline items stagger from left (overflow) --- */
  document.querySelectorAll(".experience-item").forEach(function (el, i) {
    gsap.fromTo(
      el,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration,
        ease,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  /* --- EDUCATION: items stagger from right (overflow) --- */
  document.querySelectorAll(".education-item").forEach(function (el, i) {
    gsap.fromTo(
      el,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration,
        ease,
        delay: i * 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  /* --- SKILLS: grid items stagger + fill bars --- */
  var skillsGrid = document.querySelector(".skills-grid");
  if (skillsGrid) {
    document.querySelectorAll(".skill").forEach(function (el, i) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          delay: i * 0.06,
          scrollTrigger: {
            trigger: skillsGrid,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              fillSkillBars();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(skillsGrid);
    } else {
      fillSkillBars();
    }
  }

  /* --- PROJECTS: cards stagger with overflow slide --- */
  document.querySelectorAll(".project-card").forEach(function (el, i) {
    var fromX = i % 2 === 0 ? -60 : 60;
    gsap.fromTo(
      el,
      { opacity: 0, x: fromX },
      {
        opacity: 1,
        x: 0,
        duration,
        ease,
        delay: i * 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  /* --- CONTACT: card slide up with overflow feel --- */
  var contactCard = document.querySelector(".contact-card");
  if (contactCard) {
    gsap.fromTo(
      contactCard,
      { opacity: 0, y: 70 },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: contactCard,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  var footer = document.querySelector("footer");
  if (footer) {
    gsap.fromTo(
      footer,
      { opacity: 0 },
      {
        opacity: 1,
        duration: duration * 0.7,
        ease,
        scrollTrigger: {
          trigger: footer,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
})();
