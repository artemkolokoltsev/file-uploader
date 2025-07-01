import React from 'react';

type StatCardProps = {
  title: string;
  count: number;
  color?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, count }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <div className="text-sm text-gray-500">{title}</div>
      <div className={`text-gray-900 text-3xl font-bold mt-1`}>{count}</div>
    </div>
  );
};

export default StatCard;
