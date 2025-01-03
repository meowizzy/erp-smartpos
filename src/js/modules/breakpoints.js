import { resizeController } from "../helpers/resizeController";
import { languageSwitcher as languageSwitcherInit } from "./languageSwitcher";

export const breakpoints = () => {
    const burgerDrawerContent = document.querySelector('[data-modal-id="burgerDrawer"]');

    const headerNavigationPrevDestination = document.querySelector('.header__middle');
    const languageSwitcherPrevDestination = document.querySelector('.header__right');

    const languageSwitcher = document.querySelector(".languageSwitcher");
    const headerNavigation = document.querySelector(".header__navigation");

    if (!burgerDrawerContent) return;

    resizeController(959, () => {
        if (languageSwitcher) {
            burgerDrawerContent.insertAdjacentElement("afterbegin", languageSwitcher);
        }

        if (headerNavigation) {
            burgerDrawerContent.insertAdjacentElement("afterbegin", headerNavigation);
        }
    }, () => {
        if (languageSwitcherPrevDestination && languageSwitcher) {
            languageSwitcherPrevDestination.insertAdjacentElement("afterbegin", languageSwitcher);
        }

        if (headerNavigationPrevDestination && headerNavigation) {
            headerNavigationPrevDestination.insertAdjacentElement("afterbegin", headerNavigation);
        }
    });
};