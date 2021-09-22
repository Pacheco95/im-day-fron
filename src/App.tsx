import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import { UserDto } from './dto/UserDto';
import scheduleService from './service/ScheduleService';

const App: React.FC = () => {
  const [scheduledUsers, setScheduledUsers] = useState<(UserDto | null)[]>([]);

  useEffect(() => {
    scheduleService
      .get<UserDto[]>('im-day')
      .then(({ data }) => data)
      .then((response) => setScheduledUsers(response));
  }, []);

  return (
    <>
      <Header />
      <main className="px-2 md:w-4/5 xl:w-3/4 mt-12 m-auto">
        <Table
          data={scheduledUsers.map((user) => ({
            key: user?.id || '-1',
            value: user?.name || 'Ninguém',
          }))}
          title="IMs PP - Quem resolve?"
          subtitle="Próximos dias"
        />
      </main>
    </>
  );
};

export default App;
