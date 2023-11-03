import i18next from 'i18next';

export interface ILocale {
  [key: string]: string;
}

export function initI18Next(en: ILocale, vi: ILocale) {
  i18next.init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React handles escaping
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
    },
    parseMissingKeyHandler: (key) => {
      return key
        .split('?')[1]
        .split('_')
        .map((str: string) => str[0].toUpperCase() + str.substring(1))
        .join(' ');
    },
  });

  return i18next;
}