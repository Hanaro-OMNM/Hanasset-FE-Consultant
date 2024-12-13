import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { useState } from 'react';
import { consultationData, initialExpandedState } from '../../assets/Dummy';

export default function GuestWaiting() {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>(
    initialExpandedState
  );

  const toggleExpand = (timeSlot: string) => {
    setExpanded((prev) => ({
      ...prev,
      [timeSlot]: !prev[timeSlot],
    }));
  };

  return (
    <div className="w-[300px] min-h-screen bg-gray-100 p-6">
      {/* 상담중 섹션 */}
      <h2 className="text-lg font-bold mt-4">상담중</h2>
      <hr className="border-t border-gray-300 my-2" />
      <p className="text-sm mb-1">이순님</p>

      {/* 상담 예약 섹션 */}
      <h2 className="text-lg font-bold mt-4">상담 예약</h2>
      <hr className="border-t border-gray-300 my-2" />

      {Object.keys(expanded).map((timeSlot) => (
        <div key={timeSlot} className="mb-4">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => toggleExpand(timeSlot)}
          >
            <h3 className="text-md font-semibold">{timeSlot}</h3>
            <span>
              {expanded[timeSlot] ? (
                <FaChevronUp className="text-hanaBlack80" />
              ) : (
                <FaChevronDown className="text-hanaBlack80" />
              )}
            </span>
          </div>
          {expanded[timeSlot] && (
            <div className="pl-1">
              {consultationData[timeSlot].map((name, index) => (
                <p key={index} className="pt-2">
                  {name}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
