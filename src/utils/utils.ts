import { DateTime } from 'luxon';

export const isWeekend = (date: DateTime): boolean =>
  [6, 7].includes(date.weekday);
