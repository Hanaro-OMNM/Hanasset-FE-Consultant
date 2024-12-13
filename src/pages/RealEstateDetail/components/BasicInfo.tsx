import React from 'react';

interface BasicInfoProps {
  infoList: string[];
}

const BasicInfo: React.FC<BasicInfoProps> = ({ infoList }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">기본정보</h2>
      <ul className="list-disc list-inside">
        {infoList.map((info, index) => (
          <li key={index}>{info}</li>
        ))}
      </ul>
    </div>
  );
};

export default BasicInfo;
