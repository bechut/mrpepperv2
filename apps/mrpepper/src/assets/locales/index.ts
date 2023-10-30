import { initI18Next, ILocale } from '@mrpepper/i18next';
import { sampleEn, sampleVi } from '../../app/pages/sample';

export const languages: ILocale = {
  en: 'en',
  vi: 'vi',
};
export const lang = initI18Next({ ...sampleEn }, { ...sampleVi });

export function onChangeLanguage(pathname: string) {
  const l = languages[pathname.slice(1, 3)] || languages['en'];
  lang.changeLanguage(l);
}