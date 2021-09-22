import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

import scheduleService from './service/ScheduleService';

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
