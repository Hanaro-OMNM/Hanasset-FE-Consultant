import { FaBuilding, FaCompass, FaUsers } from 'react-icons/fa';
import React from 'react';

interface PropertyDetailsProps {
  propertyNumber: string;
  availableDate: string;
  managementFee: string;
  parkingInfo: string;
  direction: string;
  totalFloors: string;
  currentFloor: string;
  area: string;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  propertyNumber,
  availableDate,
  managementFee,
  parkingInfo,
  direction,
  totalFloors,
  currentFloor,
  area,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">매물정보</h2>
      <div className="flex items-center mb-4">
        <div className="flex-1 text-center">
          <FaBuilding className="mx-auto mb-1 text-gray-600" size={24} />
          <p>
            {currentFloor} / {totalFloors}
          </p>
        </div>
        <div className="flex-1 text-center">
          <FaCompass className="mx-auto mb-1 text-gray-600" size={24} />
          <p>{direction}</p>
        </div>
        <div className="flex-1 text-center">
          <FaUsers className="mx-auto mb-1 text-gray-600" size={24} />
          <p>해당면적 {area}</p>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      <ul className="list-disc list-inside mb-4">
        <li>{propertyNumber} (매물번호)</li>
        <li>{availableDate} / 협의가능</li>
        <li>관리비 {managementFee} (최근 3개월 관리비 평균)</li>
        <li>{direction} (거실기준)</li>
        <li>{parkingInfo}</li>
      </ul>
    </div>
  );
};

export default PropertyDetails;
