import moment from 'moment';

export const format = {
  full: 'DD/MM/YYYY HH:mm:ss A (z UTC)',
  short: 'MMM DD YYYY',
  time: 'HH:mm:ss A (z UTC)',
  date: 'DD/MM/YYYY',
};

export type IFormat = keyof typeof format;

export class ConfigMoment {
  dateToISOString(d: Date) {
    return moment(d).utcOffset(0).toISOString();
  }

  dateToString(d: Date, f: IFormat): string {
    return moment(d).utcOffset(0).format(format[f]);
  }

  stringToDate(d: string) {
    return moment(d).utcOffset(0);
  }

  between(target: Date, d1: Date, d2: Date) {
    return moment(target).utcOffset(0).isBetween(d1, d2);
  }

  before(d1: Date, d2: Date) {
    return moment(d1).utcOffset(0).isBefore(d2);
  }

  after(d1: Date, d2: Date) {
    return moment(d1).utcOffset(0).isAfter(d2);
  }

  add(
    d: Date,
    type: moment.unitOfTime.DurationConstructor,
    amount: moment.DurationInputArg1
  ) {
    return moment(d).utcOffset(0).add(amount, type);
  }

  substract(
    d: Date,
    type: moment.unitOfTime.DurationConstructor,
    amount: moment.DurationInputArg1
  ) {
    return moment(d).utcOffset(0).subtract(amount, type);
  }
}
