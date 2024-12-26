import Swiper from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { isMobile } from "../helpers/isMobile";

export const infoSectionSlider = () => {
    if (!Swiper) return;
    Swiper.use([Pagination, Autoplay, Navigation]);

    new Swiper(".info-section__blocks", {
        speed: 800,
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: ".info-section__arrow-next",
            prevEl: ".info-section__arrow-prev"
        },
        pagination: {
            el: ".info-section__blocks-pagination",
            clickable: true,
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                let out = '';

                if (Number(swiper.currentBreakpoint) <= 850 && isMobile()) {
                    for (let i = 1; i < total+1; i++) {
                        if (i === current) {
                            out = out + '<span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex='+i+' role="button" aria-label="Go to slide '+i+1+'"></span>';
                        }
                        else {
                            out = out + '<span class="swiper-pagination-bullet" tabindex='+i+' role="button" aria-label="Go to slide '+i+1+'"></span>';
                        }
                    }
                }
                return out;
            },
        },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            850: {
                slidesPerView: 1.35
            },
        }
    });
};