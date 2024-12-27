//채팅 메세지 Response
export interface ChatMessage {
  messageType: 'JOIN' | 'TALK';
  chatroomId: string;
  senderId: number;
  content: string;
  accessor: 'guest' | 'consultant';
  createdAt: string;
}

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

//기존 메세지 불러오기
export interface CurrentMessages {
  message: string;
  result: {
    chatMessages: ChatMessage[];
  };
}

//대기열
export interface CurrentChatRooms {
  message: string;
  result: {
    chatrooms: ChatRoom[];
  };
}

//대기열
export interface CurrentWaitingRooms {
  message: string;
  result: {
    chatrooms: WaitingRoom[];
  };
}
