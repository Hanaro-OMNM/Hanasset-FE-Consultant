import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { dummyChatData } from '../../assets/Dummy.tsx';
import logo from '../../assets/img/logo.png';
import GuestChatDetail from '../GuestChatDetail';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';

type ChatMessageType = {
  id: number;
  user: 'guest' | 'consultant';
  subject: 'sender' | 'responser';
  message: string;
  time: string;
};

type ChatAppProps = {
  accessor: 'guest' | 'consultant';
};

const ChatHistory: React.FC<ChatAppProps> = () => {
  const { id } = useParams<{ id: string }>();

  const chatMessages = dummyChatData[id || '1'] || [];

  const [messages] = useState<ChatMessageType[]>(chatMessages);
  useEffect(() => {}, [messages]);

  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
  };

  return (
    <div>
      <div>
        <div className="top-0 absolute pl-4 animate-fadeInRight">
          <div className="flex flex-col h-screen w-full items-center min-w-[420px]">
            <ChatHeader responserName="하나은행 상담사" responserImage={logo} />
            <div className="flex-1 w-full px-4 md:px-8 py-4 bg-hanaSilver20 shadow overflow-y-auto scrollbar-hide hover:scrollbar-hide hover:scrollbar-thumb-gray-400 space-y-4">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={msg.id}
                  subject={msg.subject}
                  message={msg.message}
                  lastMessageTime={
                    index === 0 || msg.time !== messages[index - 1].time
                      ? msg.time
                      : null
                  }
                  responserName="하나은행 상담사"
                  responserImage={logo}
                />
              ))}
            </div>
            <div className="flex w-full p-5 bg-gray-300">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 rounded-full text-sm border-2 focus:outline-none bg-gray-100 cursor-not-allowed"
                placeholder="메시지를 입력할 수 없습니다."
                disabled
              />
              <button
                onClick={handleSendMessage}
                className="flex items-center justify-center p-2 ml-2 rounded-full bg-gray-400 text-gray-600 cursor-not-allowed"
                disabled
              >
                <PiPaperPlaneRightFill className="h-5 w-5" />
              </button>
            </div>
          </div>
          <GuestChatDetail />
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
