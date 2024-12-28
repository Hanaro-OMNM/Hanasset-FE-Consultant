import ChatApp from '../chat/ChatApp';
import GuestInfoPage from './GuestInfo';
import GuestWaiting from './GuestWaiting';

export default function Consultant() {
  return (
    <div className="flex justify-center">
      {/* 상담 예약 */}
      <div>{/* <GuestWaiting /> */}</div>
      {/* 채팅 */}
      <div className="w-screen">
        <ChatApp />
      </div>
      {/* 고객 정보 */}
      <div>
        <GuestInfoPage />
      </div>
    </div>
  );
}
