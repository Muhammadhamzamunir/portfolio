/* HERO – Torch intro: torch in → sound → beam → text reveal. On scroll down: torch off, beam and text gone. */
(function () {
  const heroWrapper = document.getElementById("heroWrapper");
  const heroTorch = document.getElementById("heroTorch");
  const heroTorchIcon = document.querySelector(".hero-torch-icon");
  const heroExpertise = document.getElementById("heroExpertise");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const heroCta = document.querySelector(".hero-cta");
  const heroSocials = document.getElementById("heroSocials");
  const heroParallax = document.getElementById("heroParallax");

  if (!heroWrapper || !heroTorch || !heroTitle) return;
  if (typeof gsap === "undefined") return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* Text pieces for “beam touches words” reveal (stagger) */
  const contentElements = [heroExpertise, heroTitle, heroSubtitle, heroCta, heroSocials].filter(Boolean);

  /* Torch sound – play when torch appears; preload so it’s ready on every reload */
  const torchSound = new Audio("assets/torch-sound.mp3");
  torchSound.preload = "auto";
  let torchSoundPlayed = false;

  function playTorchSound() {
    if (torchSoundPlayed) return;
    torchSoundPlayed = true;
    torchSound.currentTime = 0;
    torchSound.play().catch(function () {});
  }

  /* Ensure initial state: beam collapsed at torch point */
  gsap.set(heroTorch, {
    opacity: 1,
    clipPath: "polygon(100% 0%, 100% 0%, 100% 0%)",
  });
  gsap.set(heroTorchIcon, { opacity: 0, x: 60 });
  gsap.set(contentElements, { opacity: 0, y: 8 });

  /* On mobile: more sequential timing so torch → sound → glow → text feels clear */
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const beamTextOverlap = isMobile ? "-=0.25" : "-=0.65"; /* mobile: text starts later, after beam has visibly reached */
  const beamStartOverlap = isMobile ? "-=0.1" : "-=0.2";

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  /* 1) Torch icon comes in from the right */
  tl.to(heroTorchIcon, {
    opacity: 1,
    x: 0,
    duration: 0.5,
  });

  /* 2) Play torch sound as torch appears (on every reload) */
  tl.add(function () {
    playTorchSound();
  }, 0.2);

  /* 3) Beam expands from torch toward the text (cone grows) */
  tl.to(
    heroTorch,
    {
      clipPath: "polygon(100% 0%, 0% 40%, 52% 100%)",
      duration: 1,
      ease: "power2.out",
    },
    beamStartOverlap
  );

  /* 4) As beam “touches” the words, reveal them in order */
  tl.to(
    contentElements,
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: isMobile ? 0.15 : 0.12,
      ease: "power2.out",
    },
    beamTextOverlap
  );

  /* On scroll down: torch off, beam collapse, text fade out. On scroll back up: show again. */
  var heroHidden = false;

  function heroScrollExit() {
    if (heroHidden) return;
    heroHidden = true;
    torchSoundPlayed = false; /* allow sound again when scrolling back */
    gsap.to(heroTorchIcon, { opacity: 0, x: 60, duration: 0.35, ease: "power2.in" });
    gsap.to(heroTorch, {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 0%)",
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });
    gsap.to(contentElements, { opacity: 0, y: 8, duration: 0.35, stagger: 0.06, ease: "power2.in" });
  }

  function heroScrollEnter() {
    if (!heroHidden) return;
    heroHidden = false;
    /* Same sequence as on load: torch → sound → beam → text */
    var enterTl = gsap.timeline({ defaults: { ease: "power2.out" } });
    enterTl.to(heroTorchIcon, { opacity: 1, x: 0, duration: 0.5 });
    enterTl.add(function () { playTorchSound(); }, 0.2);
    enterTl.to(heroTorch, {
      clipPath: "polygon(100% 0%, 0% 40%, 52% 100%)",
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    }, beamStartOverlap);
    enterTl.to(contentElements, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: isMobile ? 0.15 : 0.12,
      ease: "power2.out",
    }, beamTextOverlap);
  }

  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.create({
      trigger: heroWrapper,
      start: "top top",
      end: "top+=1 top",
      onUpdate: function (self) {
        if (self.direction === 1 && self.scroll() > 20) {
          heroScrollExit();
        } else if (self.direction === -1 && self.scroll() <= 10) {
          heroScrollEnter();
        }
      },
    });
  }
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (y > 80) heroScrollExit();
    else if (y <= 50) heroScrollEnter();
  }, { passive: true });

  /* 3D parallax on mouse move (after intro) */
  if (heroParallax) {
    document.addEventListener("mousemove", function (e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(heroParallax, {
        rotateY: x * 12,
        rotateX: -y * 10,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  }
})();
