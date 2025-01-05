import {
    COOKIE_REQUEST_BLOCK,
    GOOGLE_SHEETS_URL,
    LOCAL_STORAGE_LANG_KEY,
    SOURCE
} from "../app/constants";
import { getCookie, setCookie } from "../helpers/cookie";
import { translate } from "../../localization";

export const callbackForm = () => {
    const form = document.querySelector(".callback__form .form");

    if (!form) return;

    const queryParams = Object.fromEntries(new URLSearchParams(location.search).entries());
    const button = form.querySelector(".lp-button");
    const lang = localStorage.getItem(LOCAL_STORAGE_LANG_KEY) || document.documentElement.lang;
    const _requestBlock = getCookie(COOKIE_REQUEST_BLOCK);

    const validatePhoneInput = (phone) => {
        if (phone.length > 19 || phone.length < 19) {
            throw new Error(translate("errors.incorrectPhoneNumber"));
        }
    };

    const sendDataToGoogleSheets = (data) => {
        if (window.ym) {
            window.ym(97752261,'reachGoal','generate_lead');
        }

        if (window.fbq) {
            window.fbq('track', 'Lead');
        }

        return fetch(GOOGLE_SHEETS_URL, {
            method: "POST",
            body: JSON.stringify(data),
            mode: "no-cors"
        });
    };

    const renderSuccessDialog = (form) => {
        let $form;
        if (form) {
            $form = form;
        } else {
            $form = document.querySelector(".callback__form form");
        }

        $form.closest(".container .callback__inner").classList.add("form-success");
        $form.closest(".callback__col").innerHTML = `
            <div class="success-icon">
                <svg width="800px" height="800px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="okIconTitle" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#ffffff"> <title id="okIconTitle">Ok</title> <polyline points="4 13 9 18 20 7"/> </svg>
            </div>
            <div class="success title-sm">
                ${translate("notifications.requisitionSuccess")}
            </div>
        `;
    };

    if (_requestBlock) {
        renderSuccessDialog();
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!window.fetch) {
            console.log("Запросы заблокированы");
            return;
        }

        const form = e.target;
        const formElements = form.elements;

        const googleSheetsUtms = {
            utm_source: queryParams?.utm_source ? queryParams.utm_source : "-",
            utm_medium: queryParams?.utm_medium ? queryParams.utm_medium : "-",
            utm_campaign: queryParams?.utm_campaign ? queryParams.utm_campaign : "-",
            utm_term: queryParams?.utm_term ? queryParams.utm_term : "-",
            utm_content: queryParams?.utm_content ? queryParams.utm_content : "-"
        };

        const adminSmartposUtms = {
            utmSource: googleSheetsUtms.utm_source,
            utmMedium: googleSheetsUtms.utm_medium,
            utmCampaign: googleSheetsUtms.utm_campaign,
            utmTerm: googleSheetsUtms.utm_term,
            utmContent: googleSheetsUtms.utm_content,
        };

        const data = {
            name: formElements.name.value,
            phone: formElements.phone.value,
            source: "BUSINESS",
            ...googleSheetsUtms
        };

        try {
            validatePhoneInput(data.phone);

            button.classList.add("loading");

            const requests = [
                fetch("/api/smartpos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        phone: data.phone.replace(/\D/g, ""),
                        fullName: data.name,
                        source: SOURCE,
                        ...adminSmartposUtms
                    })
                }),
                fetch("/api/support", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        phone: data.phone.replace(/\D/g, ""),
                        name: data.name,
                        ...adminSmartposUtms
                    })
                }),
                sendDataToGoogleSheets(data)
            ];

            const responses = await Promise.allSettled(requests);
            const { value: resolvedRequest } = await responses.find((res) => res.value?.ok);

            if (resolvedRequest?.ok) {
                const exp = new Date();
                exp.setHours(exp.getHours() + 1);

                if (!_requestBlock) {
                    setCookie(COOKIE_REQUEST_BLOCK, 1, {
                        expires: exp
                    });
                }

                renderSuccessDialog(form);

                if (gtag) {
                    gtag("event", "generate_lead", {
                        currency: "USD",
                        value: 1.00
                    });
                }
            } else {
                throw new Error(translate("errors.failedToSubmitRequest"));
            }
        } catch (e) {
            const $err = form.parentElement.querySelector(".error-message");
            if ($err) {
                $err.remove();
                form.insertAdjacentHTML("beforebegin", `<div class="error-message">${e.message}</div>`);
            } else {
                form.insertAdjacentHTML("beforebegin", `<div class="error-message">${e.message}</div>`);
            }
        } finally {
            button.classList.remove("loading");
        }
    };

    form.addEventListener("submit", onSubmit);
};