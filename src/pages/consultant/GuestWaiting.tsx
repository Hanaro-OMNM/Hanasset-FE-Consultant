import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { consultationData, initialExpandedState } from '../../assets/Dummy';
import { PlatformAPI } from '../../platform/PlatformAPI';
import { activeChatRoomState } from '../../recoil/chat/atom';
import {
  ChatRoom,
  CurrentChatRooms,
} from '../../types/hanaAssetResponse.common';

interface GuestWaitingProps {
  consultantId: number;
}

export default function GuestWaiting({ consultantId }: GuestWaitingProps) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>(
    initialExpandedState
  );
  const [currentRooms, setCurrentRooms] = useState<{
    [key: string]: ChatRoom[];
  } | null>(null);
  const [activeChatRoom, setActiveChatRoom] =
    useRecoilState(activeChatRoomState); // 상태를 하나의 상담으로 설정

  useEffect(() => {
    const fetchConsultationData = async () => {
      try {
        const waitingRooms: CurrentChatRooms =
          await PlatformAPI.getWaitingRoomsInfo(consultantId);

        console.log(waitingRooms);

        // Group waiting rooms by 30-minute intervals
        const groupedData = groupChatRoomsByTimeInterval(
          waitingRooms.result.chatrooms.filter(
            (room) => room.chatroomStatus !== 'active'
          ),
          30
        );

        console.log(groupedData);

        setCurrentRooms(groupedData);

        // Initialize expanded state
        setExpanded(
          Object.keys(groupedData).reduce(
            (acc, key) => {
              acc[key] = false;
              return acc;
            },
            {} as { [key: string]: boolean }
          )
        );
      } catch (error) {
        console.error('Failed to fetch consultation data:', error);
      }
    };

    fetchConsultationData();
  }, [consultantId]);

  const groupChatRoomsByTimeInterval = (
    chatRooms: ChatRoom[],
    intervalMinutes: number = 30
  ): { [key: string]: ChatRoom[] } => {
    return chatRooms.reduce(
      (acc, room) => {
        const [hour, minute] = room.reservedTime
          .split(' ')[1]
          .split(':')
          .map(Number); // Extract hour and minute as numbers
        const adjustedMinute = minute < intervalMinutes ? '00' : '30'; // Round to the nearest interval
        const timeSlot = `${String(hour).padStart(2, '0')}:${adjustedMinute}`; // Format as 'HH:MM'

        if (!acc[timeSlot]) acc[timeSlot] = [];
        acc[timeSlot].push(room);
        return acc;
      },
      {} as { [key: string]: ChatRoom[] }
    );
  };

  const toggleExpand = (timeSlot: string) => {
    setExpanded((prev) => ({
      ...prev,
      [timeSlot]: !prev[timeSlot],
    }));
  };

  const handleChatroomStatusUpdate = async (
    chatroomId: string,
    chatroomStatus: string
  ) => {
    try {
      const updatedRoom = await PlatformAPI.putChatroomStatus(
        chatroomId,
        chatroomStatus
      );
      console.log('Updated room:', updatedRoom);
      alert(
        `Chatroom "${updatedRoom.result.chatrooms[0].chatroomTitle}" status updated successfully!`
      );

      // Recoil 상태 업데이트 (하나의 상담만 활성화됨)
      const room = updatedRoom.result.chatrooms[0];
      setActiveChatRoom(room); // 활성화된 상담을 Recoil 상태로 설정

      // Local State 업데이트
      setCurrentRooms((prev) => {
        if (!prev) return prev;
        const updatedRooms = { ...prev };
        Object.keys(updatedRooms).forEach((key) => {
          updatedRooms[key] = updatedRooms[key].filter(
            (room) => room.chatroomId !== chatroomId
          );
        });
        return updatedRooms;
      });
    } catch (error) {
      console.error('Error updating chatroom status:', error);
      alert('Failed to update chatroom status. Please try again.');
    }
  };

  return (
    <div className="w-[300px] min-h-screen bg-gray-100 p-6">
      {/* 상담중 섹션 */}
      <h2 className="text-lg font-bold mt-4">상담중</h2>
      <hr className="border-t border-gray-300 my-2" />
      {activeChatRoom ? (
        <p className="text-sm mb-1 cursor-pointer hover:text-blue-600">
          {activeChatRoom.chatroomTitle}
        </p>
      ) : (
        <p className="text-sm mb-1">현재 진행 중인 상담이 없습니다.</p>
      )}

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
          {expanded[timeSlot] && currentRooms && currentRooms[timeSlot] && (
            <div className="pl-1">
              {currentRooms[timeSlot].map((room, index) => (
                <p
                  key={index}
                  className="pt-2 cursor-pointer hover:text-blue-600"
                  onClick={() =>
                    handleChatroomStatusUpdate(
                      room.chatroomId,
                      room.chatroomStatus
                    )
                  }
                >
                  {room.chatroomTitle}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
