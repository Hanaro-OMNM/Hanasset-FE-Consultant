import React from 'react';

interface MarketCardProps {
  type: string;
  recentPrice: string;
  date: string;
}

const MarketCard: React.FC<MarketCardProps> = ({ type, recentPrice, date }) => {
  return (
    <div className="p-4 border rounded-lg">
      <p
        className={`text-3xl font-bold ${type === '전세' ? 'text-green-600' : 'text-red-600'}`}
      >
        <span>{type}</span> <span className="text-black">{recentPrice}</span>
      </p>
      <p className="text-gray-500">{date}</p>
    </div>
  );
};

export default MarketCard;
