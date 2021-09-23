import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Header from './components/Header';
import Table from './components/Table';
import scheduleService, { MaybeUser } from './service/ScheduleService';
import WhatsAppLink from './components/WhatsAppLink';
import { formatDate, isWeekend } from './utils/utils';

interface Schedule {
  date: DateTime;
  user: MaybeUser;
}

const App = (): JSX.Element => {
  const [scheduledUsers, setScheduledUsers] = useState<Schedule[]>([]);

  useEffect(() => {
    const processResponse = (users: MaybeUser[]) => {
      const yesterday = DateTime.local().minus({ days: 1 });

      const schedules = users.map<Schedule>((user, index) => ({
        date: yesterday.plus({ days: index }),
        user,
      }));

      setScheduledUsers(schedules);
    };

    scheduleService.getRecentScheduledUsers().then(processResponse);
  }, []);

  const tableEntries = scheduledUsers.map(({ date, user }) => ({
    key: formatDate(date),
    value: user ? (
      user.name
    ) : isWeekend(date) ? (
      <WhatsAppLink date={date} />
    ) : (
      '\u2015'
    ),
  }));

  return (
    <>
      <Header />
      <main className="px-2 md:w-3/5 xl:w-2/3 mt-12 m-auto">
        <Table
          data={tableEntries}
          title="IMs PP - Quem resolve?"
          subtitle="Próximos dias"
        />
      </main>
    </>
  );
};

export default App;
