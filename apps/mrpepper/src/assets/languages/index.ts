import { initI18Next, ILocale } from '@mrpepper/multi-lang';
import { sampleEn, sampleVi } from '../../pages/sample/lang';
import { signupEn, signupVi } from '../../pages/signup/lang';

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
