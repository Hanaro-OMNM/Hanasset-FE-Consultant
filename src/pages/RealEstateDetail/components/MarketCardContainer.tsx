import React from 'react';
import MarketCard from './MarketCard';

interface MarketCardContainerProps {
  cards: { type: string; recentPrice: string; date: string }[];
}

const MarketCardContainer: React.FC<MarketCardContainerProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {cards.map((card, index) => (
        <MarketCard
          key={index}
          type={card.type}
          recentPrice={card.recentPrice}
          date={card.date}
        />
      ))}
    </div>
  );
};

export default MarketCardContainer;
