import React from 'react';

interface MarketInfoProps {
  type: '전세' | '월세';
  recentPrice: string;
  date: string;
}

const MarketInfo: React.FC<MarketInfoProps> = ({ type, recentPrice, date }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-medium">{type}</h3>
      <p className="text-2xl font-bold">{recentPrice}</p>
      <p className="text-sm text-gray-400">{date}</p>
    </div>
  );
};

export default MarketInfo;
