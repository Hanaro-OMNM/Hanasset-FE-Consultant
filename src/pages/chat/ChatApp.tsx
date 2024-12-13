import { PiPaperPlaneRightFill } from 'react-icons/pi';
import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/img/logo.png';
import profile from '../../assets/img/profile_ex.jpg';
import GuestChatDetail from '../GuestChatDetail';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';

type ChatMessageType = {
  id: number;
  user: 'guest' | 'consultant';
  subject: 'sender' | 'responser';
  message: string;
  time: string; // 각 메시지의 시간을 저장
};

type ChatAppProps = {
  accessor: 'guest' | 'consultant';
};

const ChatApp: React.FC<ChatAppProps> = ({ accessor }) => {
  const getCurrentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 1,
      user: 'consultant',
      subject: 'responser',
      message: '안녕하세요, 상담사 땡땡땡 입니다. 무엇을 도와드릴까요?',
      time: getCurrentTime(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [inputValue, setInputValue] = useState('');
  const [lastMessageTime, setLastMessageTime] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    console.log(lastMessageTime); //오류방지용 임시 console.log 출력

    const currentTime = getCurrentTime();

    const newMessage: ChatMessageType = {
      id: messages.length + 1,
      user: 'guest',
      subject: 'sender',
      message: inputValue,
      time: currentTime,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setLastMessageTime(currentTime); // 마지막 메시지 시간을 업데이트

    setTimeout(() => {
      const responserReply: ChatMessageType = {
        id: messages.length + 2,
        user: 'consultant',
        subject: 'responser',
        message:
          '알겠습니다. 고객님의 매출과 대출 상품 리스트를 확인하였습니다. 상담은 선택된 매물 중 첫번째 매물부터 시작됩니다.',
        time: getCurrentTime(),
      };
      setMessages((prevMessages) => [...prevMessages, responserReply]);
      setLastMessageTime(responserReply.time);
    }, 1000);
  };

  return (
    <div>
      <div>
        {accessor === 'guest' ? (
          <div className="top-0 absolute pl-4 animate-fadeInRight">
            <div className="flex flex-col h-screen w-full items-center min-w-[420px]">
              <ChatHeader
                responserName="하나은행 상담사"
                responserImage={logo}
              />
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
                <div ref={messagesEndRef} />
              </div>
              <div className="flex w-full p-5 bg-hanaGreen60">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 rounded-full text-sm border-2 focus:border-hanaGreen80 focus:outline-none"
                  placeholder="메세지를 입력해주세요..."
                />
                <button
                  onClick={handleSendMessage}
                  className="flex items-center justify-center p-2 ml-2 rounded-full bg-hanaGreen80 text-white hover:bg-hanaGreen transition duration-150 ease-in-out"
                >
                  <PiPaperPlaneRightFill className="h-5 w-5" />
                </button>
              </div>
            </div>
            <GuestChatDetail />
          </div>
        ) : (
          <div className="flex flex-col h-screen w-full items-center">
            <ChatHeader responserName={'고객1'} responserImage={profile} />
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
                  responserName="고객1"
                  responserImage={profile}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex w-full p-5 bg-hanaGreen60">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 rounded-full text-sm border-2 focus:border-hanaGreen80 focus:outline-none"
                placeholder="메세지를 입력해주세요..."
              />
              <button
                onClick={handleSendMessage}
                className="flex items-center justify-center p-2 ml-2 rounded-full bg-hanaGreen80 text-white hover:bg-hanaGreen transition duration-150 ease-in-out"
              >
                <PiPaperPlaneRightFill className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
