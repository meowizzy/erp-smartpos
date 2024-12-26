import { resizeController } from "../helpers/resizeController";

export const breakpoints = () => {
    const $faqVendors = document.querySelector(".faq__vendors");
    const $faqVendorsNewDest = document.querySelector(".faq__right");
    const $faqVendorsPrevDest = document.querySelector(".faq__left");

    resizeController(1024, () => {
        $faqVendorsNewDest.insertAdjacentElement("beforeend", $faqVendors);
    }, () => {
        $faqVendorsPrevDest.insertAdjacentElement("beforeend", $faqVendors);
    });
};