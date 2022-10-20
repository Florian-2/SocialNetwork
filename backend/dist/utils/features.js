"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAcceptLanguage = void 0;
function getAcceptLanguage(headers) {
    let language = headers["accept-language"];
    if (!language || language === "*") {
        language = "fr";
    }
    else if (language?.length > 2) {
        language = language.split("-")[0]; // fr-FR => fr
    }
    return language;
}
exports.getAcceptLanguage = getAcceptLanguage;
