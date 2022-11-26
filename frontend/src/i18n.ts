import { createI18n } from 'vue-i18n'
import fr from '@/locales/fr/translation.json';
import en from '@/locales/en/translation.json';

export const browserLanguage = navigator.language.split("-")[0] || "fr";  

export const i18n = createI18n({
    locale: browserLanguage,
    fallbackLocale: "en",
    legacy: false,
    messages: { "en": en, "fr": fr },
    datetimeFormats: {
        'fr': {
            medium: {
                dateStyle: "long", timeStyle: "short"
            },
        },
        'en': {
            medium: {
                dateStyle: "long", timeStyle: "short"
            }
        }
    },
    missingWarn: false,
    fallbackWarn: false 
});

export const translateTitle = (path: string) => i18n.global.t(path);