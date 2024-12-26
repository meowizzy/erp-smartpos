import { isMobile } from "../helpers/isMobile";

export const rippleEffectInit = () => {
    const initialOptions = () => {
        const ripples = document.querySelectorAll(".ripple");

        if (!ripples.length) return;

        ripples.forEach((ripple) => {
            const size = `${ripple.offsetWidth*4}px`;

            ripple.style.setProperty("--size", size);
        });
    };

    if (!isMobile()) {
        initialOptions();
    }
    const handleMouseOver = (e) => {
        const $target = e.target;
        if ($target.closest(".ripple")) {
            if ($target.classList.contains("ripple")) {
                $target.style.setProperty("--x", `${e.offsetX}px`);
                $target.style.setProperty("--y", `${e.offsetY}px`);
            } else {
                const parent = $target.closest(".ripple");
                parent.style.setProperty("--x", `${e.offsetX}px`);
                parent.style.setProperty("--y", `${e.offsetY}px`);
            }
        }
    };

    const handleMouseLeave = (e) => {
        const $target = e.target;
        if ($target.closest(".ripple")) {
            if ($target.classList.contains("ripple")) {
                $target.style.setProperty("--x", `${e.offsetX}px`);
                $target.style.setProperty("--y", `${e.offsetY}px`);
            } else {
                const parent = $target?.closest(".ripple");
                parent.style.setProperty("--x", `${e.offsetX}px`);
                parent.style.setProperty("--y", `${e.offsetY}px`);
            }
        }
    }
    if (!isMobile()) {
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseLeave);
    }
};