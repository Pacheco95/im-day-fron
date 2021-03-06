import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateTime } from 'luxon';
import App from './App';

import scheduleService, { MaybeUser } from './service/ScheduleService';
import { getDateRange, isWeekend } from './utils/utils';

describe('App', () => {
  it('should call api on component mount only', () => {
    const scheduleServiceSpy = jest
      .spyOn(scheduleService, 'getRecentScheduledUsers')
      .mockImplementationOnce(() => Promise.resolve([]));

    const { queryAllByRole } = render(<App />);

    return waitFor(() => queryAllByRole('row')).then((tableEntries) => {
      expect(scheduleServiceSpy).toBeCalledTimes(1);
      expect(tableEntries.length).toBe(0);
    });
  });

  it('should list scheduled users', async () => {
    const totalDays = 11;

    const yesterday = DateTime.now().minus({ days: 1 });

    const dateRange = getDateRange(yesterday, 11);

    const response: MaybeUser[] = dateRange.map((date, index) => {
      const shouldBeNull = index % 4 === 0 || isWeekend(date);

      return shouldBeNull ? null : { id: index, name: `User ${index}` };
    });

    jest
      .spyOn(scheduleService, 'getRecentScheduledUsers')
      .mockReturnValueOnce(Promise.resolve(response));

    const weekendsCount = dateRange.filter(isWeekend).length;

    const { getAllByRole, getAllByAltText } = render(<App />);

    const tableEntries = await waitFor(() => getAllByRole('row'));
    const whatsappIconsCount = await waitFor(() =>
      getAllByAltText(/whatsapp icon/)
    );

    expect(tableEntries.length).toBe(totalDays);
    expect(whatsappIconsCount.length).toBe(weekendsCount);
  });
});
