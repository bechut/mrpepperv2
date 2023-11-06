import moment from 'moment-timezone';

const locales: { [key: string]: string } = {
  en: 'Singapore',
  vi: 'Asia/Ho_Chi_Minh',
};

export const format = {
  full: 'DD/MM/YYYY HH:mm:ss A (z UTC)',
  short: 'MMM DD YYYY',
  time: 'HH:mm:ss A (z UTC)',
  date: 'DD/MM/YYYY',
};

export type IFormat = keyof typeof format;

export class ConfigMoment {
  private locale = 'en';

  constructor(locale: string) {
    this.locale = locale;
  }

  dateToISOString(d: Date) {
    return moment(d).toISOString();
  }

  dateToString(d: Date, f: IFormat): string {
    return moment(d).tz(locales[this.locale]).format(format[f]);
  }

  stringToDate(d: string) {
    return moment(d).tz(locales[this.locale]);
  }

  between(target: Date, d1: Date, d2: Date) {
    return moment(target).isBetween(d1, d2);
  }

  before(d1: Date, d2: Date) {
    return moment(d1).isBefore(d2);
  }

  after(d1: Date, d2: Date) {
    return moment(d1).isAfter(d2);
  }

  add(
    d: Date,
    type: moment.unitOfTime.DurationConstructor,
    amount: moment.DurationInputArg1
  ) {
    return moment(d).add(amount, type);
  }

  substract(
    d: Date,
    type: moment.unitOfTime.DurationConstructor,
    amount: moment.DurationInputArg1
  ) {
    return moment(d).subtract(amount, type);
  }
}
