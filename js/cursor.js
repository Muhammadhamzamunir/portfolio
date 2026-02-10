/* CUSTOM CURSOR */
(function () {
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  document.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      xPercent: -50,
      yPercent: -50,
      duration: 0.12,
      ease: "power2.out",
    });
  });
})();
