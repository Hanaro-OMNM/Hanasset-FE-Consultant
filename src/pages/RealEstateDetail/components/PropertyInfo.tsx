import React from 'react';
import PropertyStar from '../../../components/molecules/Star';

interface PropertyInfoProps {
  title: string;
  rentType: string;
  price: string;
  description: string;
  isStarFilled: boolean;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  title,
  rentType,
  price,
  description,
  isStarFilled,
}) => {
  return (
    <>
      <div className="w-full ml-96">
        <PropertyStar isFilled={isStarFilled} />
      </div>
      <div className="p-4 flex flex-col justify-center items-center">
        <p className="text-lg font-semibold">{title}</p>
        <p
          className={`text-3xl font-bold ${rentType === '전세' ? 'text-hanaColor2' : 'text-red-600'}`}
        >
          <span>{rentType}</span> <span className="text-black">{price}</span>
        </p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </>
  );
};

export default PropertyInfo;
