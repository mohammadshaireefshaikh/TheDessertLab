/* ==========================================================================
   THE DESSERT LAB — interactions
   Nav state, mobile menu, scroll reveals, hero parallax, year stamp.
   No dependencies. View-only prototype.
   ========================================================================== */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ----- sticky nav state ----- */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- mobile menu ----- */
  const toggle = document.querySelector(".nav__toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    mobileMenu.classList.toggle("is-open", !open);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      mobileMenu.classList.remove("is-open");
    });
  });

  /* ----- scroll reveals ----- */
  const revealables = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealables.forEach((el) => observer.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-visible"));
  }

  /* ----- hero parallax (fine pointers only) ----- */
  const heroVisual = document.querySelector(".hero__visual");
  const layers = document.querySelectorAll(".parallax");
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (heroVisual && finePointer && !prefersReducedMotion) {
    let raf = null;

    heroVisual.addEventListener("mousemove", (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        layers.forEach((layer) => {
          const depth = Number(layer.dataset.depth) || 10;
          layer.style.transform =
            `translate(${x * depth}px, ${y * depth}px) ` +
            `rotateY(${x * 4}deg) rotateX(${y * -4}deg)`;
        });
      });
    });

    heroVisual.addEventListener("mouseleave", () => {
      if (raf) cancelAnimationFrame(raf);
      layers.forEach((layer) => {
        layer.style.transform = "";
      });
    });
  }

  /* ----- 3D tilt cards (fine pointers only) ----- */
  if (finePointer && !prefersReducedMotion) {
    const tiltTargets = document.querySelectorAll(
      ".feature, .offer, .review, .hours, .map-card, .gallery__item, .story__photo"
    );

    tiltTargets.forEach((el) => {
      el.classList.add("tilt");
      let tiltRaf = null;

      el.addEventListener("mousemove", (event) => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        if (tiltRaf) cancelAnimationFrame(tiltRaf);
        tiltRaf = requestAnimationFrame(() => {
          const max = el.classList.contains("gallery__item") ? 7 : 4.5;
          el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
          el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
          el.style.setProperty("--gx", `${px * 100}%`);
          el.style.setProperty("--gy", `${py * 100}%`);
        });
      });

      el.addEventListener("mouseleave", () => {
        if (tiltRaf) cancelAnimationFrame(tiltRaf);
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ----- footer year ----- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
