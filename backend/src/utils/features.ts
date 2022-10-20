import { IncomingHttpHeaders } from "node:http";

export function getAcceptLanguage(headers: IncomingHttpHeaders): string {
    let language = headers["accept-language"];

    if (!language || language === "*") {
        language = "fr";
    } 
    else if (language?.length > 2) {
        language = language.split("-")[0]; // fr-FR => fr
    }

    return language;
}