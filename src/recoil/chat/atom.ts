// atoms/chatRoomState.ts
import { atom } from 'recoil';

export const activeChatRoomState = atom({
  key: 'activeChatRoomState', // Unique key
  default: null as WaitingRoom | null, // 초기값은 null
});
//채팅방 Response
export interface ChatRoom {
  chatroomId: string;
  userId: number;
  consultantId: number;
  chatroomTitle: string;
  chatroomStatus: string;
  reservedTime: string;
  finishedAt: string | null;
  createdAt: string;
}

//채팅방 Response
export interface WaitingRoom {
  userName: string;
  chatroom: ChatRoom;
}
