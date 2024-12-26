import Swiper from 'swiper';
import { Pagination, Autoplay } from "swiper/modules";
import { resizeController } from "../helpers/resizeController";

export const faqSectionSlider = () => {
    const rebuildProductsList = () => {
        const list = document.querySelector(".faq__items");
        if (!list) return null;

        for (let i = 0; i < list.children.length; i++) {
            list.children[i].classList.add("swiper-slide");
        }

        const listHTML = list.innerHTML;

        list.outerHTML = `
            <div class="faq__items swiper">
                <div class="swiper-wrapper">
                    ${listHTML}
                </div>
                <div class="faq__items-pagination slider-pagination slider-pagination--dark"></div>
            </div>
        `;

        return list;
    };

    if (window.matchMedia("all and (max-width: 1179px)").matches) {
        rebuildProductsList();
    }

    resizeController(1179, () => {
        if (!Swiper) return;
        Swiper.use([Pagination, Autoplay]);

        new Swiper(".faq__items", {
            hashNavigation: {
                watchState: true,
            },
            spaceBetween: 10,
            pagination: {
                el: ".faq__items-pagination",
                clickable: true,
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    let out = ''
                    for (let i = 1; i < total+1; i++) {
                        if (i === current) {
                            out = out + '<span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex='+i+' role="button" aria-label="Go to slide '+i+1+'"></span>';
                        }
                        else {
                            out = out + '<span class="swiper-pagination-bullet" tabindex='+i+' role="button" aria-label="Go to slide '+i+1+'"></span>';
                        }
                    }
                    return out;
                },
            },
            speed: 800,
            autoplay: {
                delay: 10000,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                961: {
                    slidesPerView: 2
                },
            }
        });
    }, () => {});
};