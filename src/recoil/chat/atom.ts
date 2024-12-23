// atoms/chatRoomState.ts
import { atom } from 'recoil';

export const activeChatRoomState = atom({
  key: 'activeChatRoomState', // Unique key
  default: null as ChatRoom | null, // 초기값은 null
});

export interface ChatRoom {
  chatroomId: string;
  chatroomTitle: string;
  chatroomStatus: string;
  reservedTime: string;
  userId: number;
  consultantId: number;
  createdAt: string;
  finishedAt: string | null;
}
