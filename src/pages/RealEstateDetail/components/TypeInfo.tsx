import React from 'react';

interface TypeInfoProps {
  area: string;
  areaSize: string;
  supply: string;
  rooms: string;
  bathrooms: string;
  exclusiveRate: string;
  managementFee: string;
  floorPlanImage: string;
  floorPlanLink: string;
}

const TypeInfo: React.FC<TypeInfoProps> = ({
  area,
  areaSize,
  supply,
  rooms,
  bathrooms,
  exclusiveRate,
  managementFee,
  floorPlanImage,
  floorPlanLink,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">타입</h2>
      <div className="flex items-start mb-4">
        <div className="flex-1">
          <p className="text-lg">
            • {area} ({areaSize})
          </p>
          <img
            src={floorPlanImage}
            alt="Floor Plan"
            className="w-auto h-auto"
          />
          <div className="flex justify-center text-xs text-gray-600 mb-2">
            <div className="flex flex-col text-center">
              <p>공급/전용</p>
              <p className="font-bold">{supply}</p>
            </div>
            <span className="border-r border-gray-300 mx-5"></span>
            <div className="flex flex-col">
              <p>방/욕실</p>
              <p className="font-bold">
                {rooms}개/{bathrooms}개
              </p>
            </div>
            <span className="border-r border-gray-300 mx-5"></span>
            <div className="flex flex-col">
              <p>전용률</p>
              <p className="font-bold">{exclusiveRate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-2 rounded text-center">
        <p>
          연 평균 관리비 <span className="font-bold">{managementFee}</span>원
        </p>
      </div>
      <div className="text-right mt-2">
        <a
          href={floorPlanLink}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          네이버부동산 평면도
        </a>
      </div>
    </div>
  );
};

export default TypeInfo;
