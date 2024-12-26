import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";

export const productAdvantagesSlider = () => {
    if (!Swiper) return;
    Swiper.use([Pagination, Autoplay]);

    new Swiper(".product__advantages", {
        speed: 800,
        slidesPerView: 4,
        spaceBetween: 10,
        pagination: {
            el: ".product__advantages-pagination",
            clickable: true,
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                let out = ''
                if (Number(swiper.currentBreakpoint) <= 1024) {
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
            640: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            },
            1281: {
                slidesPerView: 4
            },
        }
    });
};