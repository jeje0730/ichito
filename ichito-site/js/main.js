document.addEventListener("DOMContentLoaded", () => {
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const menuOverlay = document.querySelector(".menu-overlay");
const navigationLinks =
    document.querySelectorAll(".navigation a");
const backToTop =
    document.querySelector(".back-to-top");

/* ホームの写真を約3秒ごとに切り替える */
const heroSlides = document.querySelectorAll(".hero-slide");
const slideshowToggle = document.querySelector(".hero-slideshow-toggle");
if (heroSlides.length > 1 && slideshowToggle) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentSlide = 0;
    let paused = reducedMotion.matches;
    let slideTimer;

    const updateSlideshow = () => {
        window.clearInterval(slideTimer);
        slideshowToggle.textContent = paused
            ? "スライドを再生"
            : "スライドを一時停止";
        if (paused || document.hidden) return;

        slideTimer = window.setInterval(() => {
            const nextSlide = (currentSlide + 1) % heroSlides.length;
            const nextImage = heroSlides[nextSlide];
            if (!nextImage.complete || nextImage.naturalWidth === 0) return;
            heroSlides[currentSlide].classList.remove("is-active");
            nextImage.classList.add("is-active");
            currentSlide = nextSlide;
        }, 3000);
    };

    slideshowToggle.hidden = false;
    slideshowToggle.addEventListener("click", () => {
        paused = !paused;
        updateSlideshow();
    });
    reducedMotion.addEventListener("change", () => {
        paused = reducedMotion.matches;
        updateSlideshow();
    });
    document.addEventListener("visibilitychange", updateSlideshow);
    updateSlideshow();
}

/* ハンバーガーメニュー */
if (menuToggle && navigation && menuOverlay) {
    const openMenu = () => {
    menuToggle.classList.add("is-active");
    navigation.classList.add("is-active");
    menuOverlay.classList.add("is-active");
    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute(
        "aria-label",
        "メニューを閉じる"
    );
    };

    const closeMenu = () => {
    menuToggle.classList.remove("is-active");
    navigation.classList.remove("is-active");
    menuOverlay.classList.remove("is-active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
        "aria-label",
        "メニューを開く"
    );
    };

    menuToggle.addEventListener("click", () => {
    const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
    });

    menuOverlay.addEventListener("click", closeMenu);

    navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
    });

    window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
        closeMenu();
    }
    });
}

/* ページ上部へ戻るボタン */
if (backToTop) {
    const updateBackToTop = () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("is-visible");
    } else {
        backToTop.classList.remove("is-visible");
    }
    };

    window.addEventListener("scroll", updateBackToTop, {
    passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    });
}
});
