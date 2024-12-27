import { Client, Message, StompSubscription } from '@stomp/stompjs';
import { PiPaperPlaneRightFill } from 'react-icons/pi';
import { useRecoilState } from 'recoil';
import SockJS from 'sockjs-client';
import React, { useState, useEffect, useRef } from 'react';
import profile from '../../assets/img/profile_ex.jpg';
import { activeChatRoomState } from '../../recoil/chat/atom';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';

type ChatMessageType = {
  id: number;
  user: 'guest' | 'consultant';
  subject: 'sender' | 'responser';
  message: string;
  time: string;
};

interface ChatAppProps {
  accessor: 'guest' | 'consultant';
}

const ChatApp: React.FC<ChatAppProps> = ({ accessor }) => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [activeChatRoom, setActiveChatRoom] =
    useRecoilState(activeChatRoomState);
  const [chatroomId, setChatroomId] = useState<string | null>(
    activeChatRoom?.chatroom.chatroomId ?? null
  );

  useEffect(() => {
    if (activeChatRoom?.chatroom.chatroomId) {
      setChatroomId(activeChatRoom.chatroom.chatroomId);
    }
  }, [activeChatRoom]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (!chatroomId) return;

    const socket = new SockJS('http://localhost:8080/ws-chat');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      },
    });

    let subscriptionRef: StompSubscription | null = null;

    client.onConnect = () => {
      console.log(`[${accessor}] Connected to WebSocket`);

      // Redis에서 채팅 기록 요청
      client.publish({
        destination: `/app/chat.history/${chatroomId}`,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        },
      });

      // Redis에서 메시지 기록 및 실시간 메시지 처리
      subscriptionRef = client.subscribe(
        `/topic/rooms/${chatroomId}`,
        (message: Message) => {
          const newData = JSON.parse(message.body);

          if (Array.isArray(newData)) {
            // Redis에서 가져온 기록 메시지 (index 1부터 읽음)
            const loadedMessages = newData.slice(1).map((msg, index) => ({
              id: index + 2, // 초기 메시지 이후로 ID 설정
              user: msg.accessor === 'consultant' ? 'consultant' : 'guest',
              subject: msg.accessor === 'consultant' ? 'sender' : 'responser',
              message: msg.content,
              time: msg.createdAt
                ? new Date(msg.createdAt).toLocaleTimeString()
                : getCurrentTime(),
            }));

            // 기존 메시지 초기화 후 새로운 기록 추가
            setMessages(loadedMessages);
          } else {
            // 실시간 메시지 처리
            const newMessage: ChatMessageType = {
              id: messages.length + 1,
              user: newData.accessor === 'consultant' ? 'consultant' : 'guest',
              subject:
                newData.accessor === 'consultant' ? 'sender' : 'responser',
              message: newData.content,
              time: getCurrentTime(),
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      );
    };

    client.activate();
    setStompClient(client);

    return () => {
      if (subscriptionRef) {
        subscriptionRef.unsubscribe();
        console.log('Unsubscribed from WebSocket topic');
      }
      client.deactivate().then(() => {
        console.log('WebSocket client deactivated');
      });
    };
  }, [chatroomId]);

  const handleSendMessage = () => {
    if (stompClient && inputMessage.trim() !== '') {
      const message = {
        messageType: 'TALK',
        chatroomId: chatroomId,
        accessor: accessor,
        content: inputMessage,
        createdAt: new Date().toISOString(),
      };
      console.log(message);
      stompClient.publish({
        destination: `/app/chat.sendMessage/${chatroomId}`,
        body: JSON.stringify(message),
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        },
      });
      setInputMessage('');
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-col h-screen w-full items-center">
          <ChatHeader responserImage={profile} />
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
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
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
      </div>
    </div>
  );
};

export default ChatApp;
