import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { PlatformAPI } from '../../platform/PlatformAPI';
import { activeChatRoomState } from '../../recoil/chat/atom';
import isLoginAtom from '../../recoil/isLogin';
import {
  CurrentWaitingRooms,
  WaitingRoom,
} from '../../types/hanaAssetResponse.common';

const initialExpandedState = {};

export default function GuestWaiting() {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>(
    initialExpandedState
  );
  const [currentRooms, setCurrentRooms] = useState<{
    [key: string]: WaitingRoom[];
  } | null>(null);
  const [activeChatRoom, setActiveChatRoom] =
    useRecoilState(activeChatRoomState); // 상태를 하나의 상담으로 설정
  const [isLogin, setIsLogin] = useRecoilState<boolean>(isLoginAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultationData = async () => {
      try {
        const waitingRooms: CurrentWaitingRooms =
          await PlatformAPI.getWaitingRoomsInfo();

        const groupedData = groupChatRoomsByTimeInterval(
          waitingRooms.result.chatrooms.filter(
            (room) => room.chatroom && room.chatroom.chatroomStatus !== 'active'
          ),
          30
        );

        setCurrentRooms(groupedData);

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
  }, [activeChatRoom]);

  const groupChatRoomsByTimeInterval = (
    waitingRooms: WaitingRoom[],
    intervalMinutes: number = 30
  ): { [key: string]: WaitingRoom[] } => {
    return waitingRooms.reduce(
      (acc, room) => {
        const chatroom = room.chatroom;

        // 유효성 검사: reservedTime이 null 또는 undefined인지 확인
        if (!chatroom || !chatroom.reservedTime) {
          console.warn('Invalid chatroom:', room);
          return acc;
        }

        try {
          const [hour, minute] = chatroom.reservedTime
            .split(' ')[1]
            .split(':')
            .map(Number);

          const adjustedMinute = minute < intervalMinutes ? '00' : '30';

          const timeSlot = `${String(hour).padStart(2, '0')}:${adjustedMinute}`;

          if (!acc[timeSlot]) acc[timeSlot] = [];
          acc[timeSlot].push(room);
        } catch (error) {
          console.error('Error processing chatroom:', room, error);
        }

        return acc;
      },
      {} as { [key: string]: WaitingRoom[] }
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
    chatroomStatus: string,
    userName: string
  ) => {
    try {
      const updatedRoom = await PlatformAPI.putChatroomStatus(
        chatroomId,
        chatroomStatus
      );
      alert(
        `Chatroom "${updatedRoom.result.chatrooms[0].chatroomTitle}" status updated successfully!`
      );

      const room = updatedRoom.result.chatrooms[0];

      // Recoil 상태 업데이트 (하나의 상담만 활성화됨)
      setActiveChatRoom((prev) => ({
        ...prev,
        chatroom: room,
        userName: userName,
      }));

      setCurrentRooms((prev) => {
        if (!prev) return prev;
        const updatedRooms = { ...prev };
        Object.keys(updatedRooms).forEach((key) => {
          updatedRooms[key] = updatedRooms[key].filter(
            (waitingRoom) => waitingRoom.chatroom.chatroomId !== chatroomId
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
    <div className="w-[300px] min-h-screen bg-gray-100 p-6 relative">
      {/* 상담중 섹션 */}
      <h2 className="text-lg font-bold mt-4">상담중</h2>
      <hr className="border-t border-gray-300 my-2" />
      {activeChatRoom ? (
        <p className="text-sm mb-1 cursor-pointer hover:text-blue-600">
          {activeChatRoom.userName}
        </p>
      ) : (
        <p className="text-gray-500">현재 진행 중인 상담이 없습니다.</p>
      )}

      {/* 상담 예약 섹션 */}
      <h2 className="text-lg font-bold mt-4">상담 예약</h2>
      <hr className="border-t border-gray-300 my-2" />
      {Object.keys(expanded).length > 0 ? (
        Object.keys(expanded).map((timeSlot) => (
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
                        room.chatroom.chatroomId,
                        room.chatroom.chatroomStatus,
                        room.userName
                      )
                    }
                  >
                    {room.userName}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-gray-500">현재 대기중인 상담이 없습니다.</div>
      )}

      {/* 푸터 섹션 */}
      <footer className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => {
            localStorage.removeItem('accessToken');
            setIsLogin(false);
            navigate('/login');
          }}
          className="rounded bg-red-500 text-white py-1 px-2 hover:bg-red-600"
        >
          로그아웃
        </button>
      </footer>
    </div>
  );
}
