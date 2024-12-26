import dataRu from "../../localization/ru.json";
import dataUz from "../../localization/uz.json";
import template from '../../index.hbs';

console.log("is dev: ", __IS_DEV__);
console.log("mode: ", __MODE__);

if (__IS_DEV__) {
    const lang = document.documentElement.lang;
    let templateData;

    if (lang === "ru") {
        templateData = template(dataRu);
    } else if (lang === "uz") {
        templateData = template(dataUz);
    }
    document.body.innerHTML = new DOMParser().parseFromString(templateData, "text/html").body.outerHTML;
}

export const templatesData = {
    ru: dataRu,
    uz: dataUz
}