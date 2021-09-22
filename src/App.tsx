import React from 'react';
import Header from './components/Header';
import Table from './components/Table';
import { UserDto } from './dto/UserDto';

const users: Readonly<UserDto[]> = Array(11)
  .fill(0)
  .map((_, i) => ({
    id: i,
    name: 'Michael',
  }));

const App: React.FC = () => (
  <>
    <Header />
    <main className="px-2 md:w-4/5 xl:w-3/4 mt-12 m-auto">
      <Table
        data={users.map(({ id: key, name: value }) => ({ key, value }))}
        title="Usuários agendados"
        subtitle={`Últimos ${users.length} dias`}
      />
    </main>
  </>
);

export default App;
