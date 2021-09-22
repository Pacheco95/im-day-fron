import React from 'react';

interface TableRowItem {
  key: string | number;
  value: JSX.Element | string;
}

interface TableProps {
  title: string;
  subtitle?: string;
  data: Readonly<TableRowItem[]>;
}

const Table: React.FC<TableProps> = ({ title, subtitle, data }: TableProps) => (
  <div className="bg-white shadow-lg overflow-hidden md:rounded-lg">
    <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      {subtitle && (
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
    <div className="border-t border-gray-200">
      <dl>
        {data.map(({ key, value }, index) => (
          <div
            key={key}
            className={`flex px-4 h-8 sm:h-11 md:h-12 sm:px-6 ${
              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
            }`}
          >
            <dt className="flex flex-col justify-center flex-1 text-sm font-medium text-gray-500">
              {key}
            </dt>
            <dd className="flex flex-col justify-center flex-1 text-sm text-gray-900">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

Table.defaultProps = {
  subtitle: '',
};

export default Table;
