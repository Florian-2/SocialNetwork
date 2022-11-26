import { computed } from 'vue';
import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat  from "dayjs/plugin/localizedFormat";
import 'dayjs/locale/fr'
import { browserLanguage } from '@/i18n';
import { useNow } from '@vueuse/core'
import { useI18n } from 'vue-i18n';

day.extend(relativeTime);
day.extend(localizedFormat);
day.locale(browserLanguage);

export function useRelativeTime(date: string | Date) {
    const { d } = useI18n();
    const now = useNow({
        interval: 30_000
    });

    const diff = day(date).diff(undefined, "day");

    // Si le poste a été posté il y a moins de 24h on utilise une date relative sinon une date classique
    const time = computed(() => {
        if (diff === 0) {
            const dayjs = day(now.value);
            const diff = dayjs.to(day(date));
            return diff;
        }

        return d(date, "medium");
    })

    return {
        time
    }
}