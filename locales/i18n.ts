import {createI18n, LocaleMessageType} from "vue-i18n";
import esES from "./es-ES.json";
import caES from "./ca-ES.json";
import enGB from "./en-GB.json";

const messages: LocaleMessageType<any> = {
    'Español': esES,
    'Català': caES,
    'English (UK)': enGB,
    'A': enGB,
    'B': enGB,
    'C': enGB,
    'D': enGB,
    'E': enGB,
    'F': enGB,
    'G': enGB,
    'H': enGB,
    'i': enGB,
    'j': enGB,
    'k': enGB,
};

// i18n module configuration (https://vue-i18n.intlify.dev/)
export const i18n = createI18n({
    locale: 'English (UK)',
    fallbackLocale: 'English (UK)',
    globalInjection: true,
    messages
});