import React, { useCallback, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Header from './components/Header';
import Table from './components/Table';
import { UserDto } from './dto/UserDto';
import scheduleService from './service/ScheduleService';
import WhatsAppLink from './components/WhatsAppLink';

interface Schedule {
  date: DateTime;
  user: UserDto | null;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const locale = { locale: 'pt-BR' };

const formatDate = (date: DateTime): string => {
  const diffInHours = Math.abs(DateTime.local().diff(date, ['hours']).hours);

  let prefix: string;

  if (diffInHours < 25) {
    prefix = date.toRelativeCalendar(locale) || '';
  } else {
    [prefix] = date.toFormat('EEEE', locale).split('-') || [''];
  }

  const suffix = date.toFormat('(dd/MM)', locale);

  return capitalize(`${prefix} ${suffix}`);
};

const isWeekend = (dateTime: DateTime) =>
  [6, 7].includes(dateTime.get('weekday'));

const App: React.FC = () => {
  const [scheduledUsers, setScheduledUsers] = useState<Schedule[]>([]);

  const processResponse = useCallback((users: (UserDto | null)[]) => {
    const yesterday = DateTime.local().minus({ days: 1 });

    const schedules = users.map<Schedule>((user, index) => ({
      date: yesterday.plus({ days: index }),
      user,
    }));

    setScheduledUsers(schedules);
  }, []);

  useEffect(() => {
    scheduleService
      .get<(UserDto | null)[]>('im-day')
      .then(({ data }) => data)
      .then(processResponse);
  }, []);

  const tableEntries = scheduledUsers.map(({ date, user }) => ({
    key: formatDate(date),
    value: user ? user.name : isWeekend(date) ? <WhatsAppLink /> : '\u2015',
  }));

  return (
    <>
      <Header />
      <main className="px-2 md:w-4/5 xl:w-3/4 mt-12 m-auto">
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
