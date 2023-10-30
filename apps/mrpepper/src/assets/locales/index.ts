import { initI18Next, ILocale } from '@mrpepper/i18next';
import { sampleEn, sampleVi } from '../../app/pages/sample';
import { signupEn, signupVi } from '../../app/pages/sign-up';

export const languages: ILocale = {
  en: 'en',
  vi: 'vi',
};
export const lang = initI18Next(
  { ...sampleEn, ...signupEn },
  { ...sampleVi, ...signupVi }
);

export function onChangeLanguage(pathname: string) {
  const l = languages[pathname.slice(1, 3)] || languages['en'];
  lang.changeLanguage(l);
}
