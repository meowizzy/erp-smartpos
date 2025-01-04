import { removeAllClasses } from "../helpers/removeAllClasses";

export const tabs = () => {
    const tabsItems = document.querySelectorAll(".tabs__item a");
    const tabsContents = document.querySelectorAll(".tabs__content");
    const currentContentClassName = "tabs__content--active";
    const currentTabClassName = "tabs__item--active";

    const tabHash = document.querySelector(`.tabs__item a[href="${window.location.hash}"]`);

    if (!tabsItems.length || !tabsContents.length) {
        return;
    }

    const onClickTabSelect = (e) => {
        e.preventDefault();

        const target = e.target;
        const href = target.getAttribute("href");
        const list = target.closest(".tabs__list");

        let tabContent;

        if (href) {
            tabContent = document.getElementById(href.substring(1));
        }

        if (tabContent) {
            removeAllClasses(Array.from(tabsItems).map((tab) => tab.parentElement), currentTabClassName);
            removeAllClasses(tabsContents, currentContentClassName);
            tabContent.classList.add(currentContentClassName);
            target.parentElement.classList.add(currentTabClassName);

            list.style.setProperty("--x", `${target.offsetLeft}px`);
            list.style.setProperty("--width", `${target.offsetWidth}px`);
            list.scrollLeft = target.offsetLeft;

            // tabsContentsTrack.style.setProperty("--x", `-${tabContent.id === "tab_0" ? 0 : tabContent.offsetLeft}px`);
        }
    };

    tabsItems.forEach((item) => item.addEventListener("click", onClickTabSelect));

    setTimeout(() => {
        if (tabHash) {
            tabHash.click();
        } else {
            tabsItems[0].click();
        }
    }, 100);
};