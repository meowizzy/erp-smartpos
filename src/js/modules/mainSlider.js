import Swiper from 'swiper';
import { Pagination, Navigation } from "swiper/modules";

export const mainSlider = () => {
    Swiper.use([Pagination, Navigation]);

    new Swiper('.main-slider__wrapper .swiper', {
        spaceBetween: 20,
        hashNavigation: {
            watchState: true,
        },
        navigation: {
            prevEl: ".main-slider__arrow-prev",
            nextEl: ".main-slider__arrow-next",
        },
        pagination: {
            el: '.main-slider__pagination',
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
        speed: 400
    });
};