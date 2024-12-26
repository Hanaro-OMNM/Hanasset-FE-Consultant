import { HiBell } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import React from 'react';
import { PlatformAPI } from '../../platform/PlatformAPI';
import { activeChatRoomState } from '../../recoil/chat/atom';

type ChatHeaderProps = {
  responserName: string;
  responserImage: string;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  responserName,
  responserImage,
}) => {
  const [chatroom, setChatroom] = useRecoilState(activeChatRoomState);

  const handleEndConsultation = async () => {
    try {
      if (!chatroom) {
        console.error('Chatroom is not set.');
        alert('Chatroom ID is missing. Cannot end consultation.');
        return;
      }

      console.log(
        `Ending consultation for chatroomId: ${chatroom?.chatroom.chatroomId}`
      );

      if (chatroom && chatroom.chatroom.chatroomId) {
        const response = await PlatformAPI.putChatroomStatus(
          chatroom.chatroom.chatroomId,
          'active' // Assuming you want to change status to 'inactive' when ending consultation
        );
        console.log('Chatroom status updated to inactive:', response);
      }

      // After ending consultation, clear the chatroom state
      setChatroom(null); // Reset the chatroom state in Recoil
    } catch (error) {
      console.error('Failed to end consultation:', error);
      alert('Failed to end consultation. Please try again.');
    }
  };

  return (
    <div className="w-full p-3 bg-white justify-center">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={responserImage}
            alt="responser"
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-md font-bold text-hanaBlack80">
            {chatroom?.userName}
          </span>
          <div className="w-2 h-2 rounded-full bg-red-500 mx-2"></div>
        </div>

        <div className="flex items-center">
          <button
            className="px-2 py-1 text-xs text-white bg-hanaRed80 rounded hover:bg-hanaRed transition duration-150 ease-in-out"
            onClick={handleEndConsultation} // End consultation button logic
          >
            상담 종료
          </button>
          <button className="ml-2 flex items-center justify-center p-1 text-gray-500 hover:text-gray-700">
            <HiBell className="h-5 w-5" />
          </button>
        </div>
      </div>

      <hr className="mt-3 border-t border-hanaSilver40" />
    </div>
  );
};

export default ChatHeader;

//로그아웃
