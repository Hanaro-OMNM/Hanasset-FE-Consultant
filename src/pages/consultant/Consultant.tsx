import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { activeChatRoomState } from '../../recoil/chat/atom';
import ChatApp from '../chat/ChatApp';
import GuestInfo from './GuestInfo';
import GuestWaiting from './GuestWaiting';

export default function Consultant() {
  const activeChatRoom = useRecoilValue(activeChatRoomState);
  const [chatroomId, setChatroomId] = useState('');

  useEffect(() => {
    // activeChatRoom이 변경될 때만 chatroomId 업데이트
    if (activeChatRoom?.chatroom.chatroomId) {
      setChatroomId(activeChatRoom.chatroom.chatroomId);
    }
  }, [activeChatRoom]);

  return (
    <div className="flex justify-center">
      {/* 상담 예약 */}
      <div>
        <GuestWaiting consultantId={1} />
      </div>
      {/* 채팅 */}
      <div className="w-screen">
        <ChatApp accessor="consultant" consultantId={1} />
      </div>
      {/* 고객 정보 */}
      <div>
        <GuestInfo />
      </div>
    </div>
  );
}
