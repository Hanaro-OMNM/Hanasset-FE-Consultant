import React from 'react';

interface MarketInfoCardProps {
  type: string;
  price: string;
  date: string;
  floor: number;
  averagePrice?: string;
}

const MarketInfoCard: React.FC<MarketInfoCardProps> = ({
  type,
  price,
  date,
  floor,
  averagePrice,
}) => {
  const isJeonse = type === '전세';

  return (
    <div className="w-1/2 border-r last:border-r-0 p-4">
      <h3
        className={`text-lg font-semibold ${isJeonse ? 'text-teal-600' : 'text-rose-600'}`}
      >
        {type}
      </h3>
      <p className="text-sm text-gray-500">최근 실거래가</p>
      <p className="text-2xl font-bold mt-2">{price}</p>
      <p className="text-gray-500 mt-1 text-sm">
        {date} / {floor}층
      </p>
      {isJeonse && averagePrice && (
        <p className="text-sm mt-2 text-gray-600">매물평균가 {averagePrice}</p>
      )}
    </div>
  );
};

export default MarketInfoCard;
