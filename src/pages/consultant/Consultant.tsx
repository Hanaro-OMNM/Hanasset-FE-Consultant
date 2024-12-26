import { useRecoilValue } from 'recoil';
import { activeChatRoomState } from '../../recoil/chat/atom';
import ChatApp from '../chat/ChatApp';
import GuestInfo from './GuestInfo';
import GuestWaiting from './GuestWaiting';

export default function Consultant() {
  const activeChatRoom = useRecoilValue(activeChatRoomState);

  return (
    <div className="flex justify-center">
      {/* 상담 예약 */}
      <div>
        <GuestWaiting consultantId={2} />
      </div>

      {/* 채팅 */}
      <div className="w-screen">
        <ChatApp
          accessor="consultant"
          chatroomId={
            activeChatRoom?.chatroomId || '06774186-6343-476e-b5c5-49b21c085f74'
          }
        />
      </div>

      {/* 고객 정보 */}
      <div>
        <GuestInfo />
      </div>
    </div>
  );
}
