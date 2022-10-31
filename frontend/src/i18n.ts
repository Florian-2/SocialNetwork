import { createI18n } from 'vue-i18n'
import fr from '@/locales/fr/translation.json';
import en from '@/locales/en/translation.json';

export const detectedLanguage = navigator.language.split("-")[0] || "fr";  

export const i18n = createI18n({
    locale: detectedLanguage,
    fallbackLocale: "en",
    legacy: false,
    messages: { "en": en, "fr": fr },

    missingWarn: false,
    fallbackWarn: false 
});

export const translateTitle = (path: string) => i18n.global.t(path);