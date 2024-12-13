import React from 'react';
import MarketChart from './MarketChart';
import MarketInfoCard from './MarketInfoCard';
import TransactionTable from './TransactionTable';

interface MarketSectionProps {
  sizeInfo: string;
  jeonseMarketInfoCardProps: {
    type: string;
    price: string;
    date: string;
    floor: number;
    averagePrice?: string;
  };
  wolseMarketInfoCardProps: {
    type: string;
    price: string;
    date: string;
    floor: number;
  };
}

const MarketSection: React.FC<MarketSectionProps> = ({
  sizeInfo,
  jeonseMarketInfoCardProps,
  wolseMarketInfoCardProps,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-10">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">시세</div>
        <p className="text-xs text-gray-500">{sizeInfo} (평형)</p>
      </div>
      <div className="flex border-t">
        <MarketInfoCard {...jeonseMarketInfoCardProps} />
        <MarketInfoCard {...wolseMarketInfoCardProps} />
      </div>
      <div className="mt-8 flex justify-center">
        <MarketChart />
      </div>
      <TransactionTable />
    </div>
  );
};

export default MarketSection;
