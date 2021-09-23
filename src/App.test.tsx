import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateTime } from 'luxon';
import App from './App';

import scheduleService from './service/ScheduleService';
import { isWeekend } from './utils/utils';
import { UserDto } from './dto/UserDto';

it('should call api on component mount only', () => {
  const scheduleServiceSpy = jest
    .spyOn(scheduleService, 'get')
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: [],
      })
    );

  const { queryAllByRole } = render(<App />);

  return waitFor(() => queryAllByRole('row')).then((tableEntries) => {
    expect(scheduleServiceSpy).toBeCalledTimes(1);
    expect(tableEntries.length).toBe(0);
  });
});

it('should should list scheduled users', async () => {
  const totalDays = 11;

  jest.spyOn(scheduleService, 'get').mockImplementationOnce(() => {
    const now = DateTime.now();

    const response: (UserDto | null)[] = [...Array(totalDays).keys()].map(
      (index) => {
        const date = now.plus({ days: 1 });

        const shouldBeNull = index % 4 === 0 || isWeekend(date);

        return shouldBeNull ? null : { id: index, name: `User ${index}` };
      }
    );

    return Promise.resolve({
      data: response,
    });
  });

  const { getAllByRole } = render(<App />);

  const tableEntries = await waitFor(() => getAllByRole('row'));

  expect(tableEntries.length).toBe(totalDays);
});
