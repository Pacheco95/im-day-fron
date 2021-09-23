import { DateTime } from 'luxon';

export const isWeekend = (date: DateTime): boolean =>
  [6, 7].includes(date.weekday);

export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const formatDate = (date: DateTime): string => {
  const diffInHours = Math.abs(DateTime.local().diff(date, ['hours']).hours);

  let prefix: string;

  if (diffInHours < 25) {
    prefix = date.toRelativeCalendar() || '';
  } else {
    [prefix] = date.toFormat('EEEE').split('-') || [''];
  }

  const suffix = date.toFormat('(dd/MM)');

  return capitalize(`${prefix} ${suffix}`);
};

export const getDateRange = (
  startDate: DateTime,
  nDays: number
): DateTime[] => {
  return [...Array(nDays).keys()].map((index) =>
    startDate.plus({ days: index })
  );
};
