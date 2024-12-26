import { isMobile } from "../helpers/isMobile";
import { templatesData } from "./templates";

export const servicesListDropDown = () => {
    const lists = document.querySelectorAll(".services-list--with-dropdown");
    const lang = document.documentElement.lang;

    if (!lists.length) {
        return;
    }

    const setListStyles = (list) => {
        const initialHeight = Array.from(list.children).reduce((acc, item, currentIndex) => {
            if (currentIndex < 0) {
                return acc + item.offsetHeight + (isMobile() ? 10 : 14);
            }
            return acc;
        }, 0);

        list.style.cssText = `
            max-height: ${initialHeight}px;
        `;
    };

    lists.forEach((list) => {
        const children = list.children;

        if (isMobile()) {
            setListStyles(list);

            list.insertAdjacentHTML("afterend", `           
                <button class="dropdown-trigger">
                    <span class="services-list__title">
                        ${lang === "ru" ? templatesData.ru.scanner_section.dropDownButton : templatesData.uz.scanner_section.dropDownButton}
                    </span>
                    <span class="dropdown-trigger__arrow">
                        <svg>
                            <use xlink:href="#arrowDownIcon"/>
                        </svg>
                    </span>
                </button>
            `);
        }
    });

    const handleClick = (e) => {
        const target = e.target;
        const list = target.previousElementSibling;

        if (target.closest(".dropdown-trigger")) {
            if (target.classList.contains("active")) {
                target.classList.remove("active");
                setListStyles(list);
            } else {
                target.classList.add("active");
                list.style.maxHeight = `${list.scrollHeight}px`;
            }
        }
    };

    document.addEventListener("click", handleClick);
};