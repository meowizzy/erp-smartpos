import { callbackForm } from "./modules/callbackForm";
import { inputMaskInit } from "./modules/inputMaskInit";
import { modal } from "./modules/modal";
import { getCookie } from "./helpers/cookie";
import { COOKIE_REQUEST_BLOCK } from "./app/constants";
import { languageSwitcher } from "./modules/languageSwitcher";
import { breakpoints } from "./modules/breakpoints";
import "../localization/index";
import "./libs/input-mask.min";
import "swiper/css";
import { tabs } from "./modules/tabs";
import {mainSlider} from "./modules/mainSlider";

const onDocumentLoaded = () => {
    const _requestBlock = getCookie(COOKIE_REQUEST_BLOCK);

    if (_requestBlock) {
        window.fetch = undefined;
        window.XMLHttpRequest = undefined;
    }

    inputMaskInit();
    callbackForm();
    modal();
    languageSwitcher();
    breakpoints();
    tabs();
    mainSlider();
};

document.addEventListener("DOMContentLoaded", onDocumentLoaded);

