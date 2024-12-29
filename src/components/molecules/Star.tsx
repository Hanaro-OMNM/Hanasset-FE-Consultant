import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import React from 'react';

interface StarProps {
  isFilled: boolean;
  onClick?: () => void;
}

const Star: React.FC<StarProps> = ({ isFilled, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {isFilled ? (
        <FaStar className="text-hanaColor2 w-7 h-7" />
      ) : (
        <CiStar className="text-gray-400 w-7 h-7" />
      )}
    </div>
  );
};

export default Star;
