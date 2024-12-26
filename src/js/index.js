import { callbackForm } from "./modules/callbackForm";
import { inputMaskInit } from "./modules/inputMaskInit";
import { menuListDropDown } from "./modules/menuListDropDown";
import { rippleEffectInit } from "./modules/rippleEffect";
import { modal } from "./modules/modal";
import { productAdvantagesSlider } from "./modules/productAdvantagesSlider";
import { infoSectionSlider } from "./modules/infoSectionSlider";
import { breakpoints } from "./modules/breakpoints";
import { faqAccordion } from "./modules/faqAccordion";
import "./modules/templates";
import "./libs/input-mask.min";
import "swiper/css";
import { getCookie } from "./helpers/cookie";
import { COOKIE_REQUEST_BLOCK } from "./app/constants";

const onDocumentLoaded = () => {
    const _requestBlock = getCookie(COOKIE_REQUEST_BLOCK);

    if (_requestBlock) {
        window.fetch = undefined;
        window.XMLHttpRequest = undefined;
    }

    const element = document.getElementById("curYear");

    if (element) {
        element.innerHTML = new Date().getFullYear();
    }

    productAdvantagesSlider();
    rippleEffectInit();
    inputMaskInit();
    callbackForm();
    menuListDropDown();
    modal();
    infoSectionSlider();
    breakpoints();
    faqAccordion();
};

document.addEventListener("DOMContentLoaded", onDocumentLoaded);

