import { resizeController } from "../helpers/resizeController";

export const faqAccordion = () => {
    const items = document.querySelectorAll(".faq__item-button");

    if (!items.length) return;

    resizeController(639, () => {
        items.forEach((item) => {
            item.removeAttribute("localization-modal-target");
            const desc = item.closest(".faq__item-head").nextElementSibling;
            desc.style.setProperty("--initialHeight", `${desc.scrollHeight}px`);
            item.addEventListener("click", function () {
                item.classList.toggle("active");
                desc.classList.toggle("opened");
            });
        });
    }, () => {})
}