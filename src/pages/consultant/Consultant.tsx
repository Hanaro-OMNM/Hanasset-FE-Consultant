import axios from 'axios';
import { useEffect, useState } from 'react';
import ChatApp from '../chat/ChatApp';
import GuestInfo from './GuestInfo';
import GuestWaiting from './GuestWaiting';

type ChatRoomType = {
  chatroomId: string;
  name: string;
};

export default function Consultant() {
  const [chatRooms, setChatRooms] = useState<ChatRoomType[] | null>(null);

  // useEffect(() => {
  //   // 서버에서 채팅방 목록 가져오기
  //   axios
  //     .get('http://localhost:8080/chat/rooms')
  //     .then((response) => {
  //       // 서버에서 받은 채팅방 목록을 상태로 설정
  //       setChatRooms(response.data); // response.data.rooms 로 수정이 필요할 수도 있음
  //       console.log(response.data); // 데이터를 콘솔에 출력하여 확인
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching chat rooms:', error);
  //     });
  // }, []);

  return (
    <div className="flex justify-center">
      {/* 상담 예약 */}
      <div>
        <GuestWaiting />
      </div>

      {/* 채팅 */}
      <div className="w-screen">
        <ChatApp
          accessor="consultant"
          chatroomId="18d74244-1ce7-4235-a557-ae93c1638f5d"
        />
      </div>

      {/* 고객 정보 */}
      <div>
        <GuestInfo />
      </div>
    </div>
  );
}
