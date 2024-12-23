//src/types/hanaAssetResponse.common.ts

export interface CurrentMarkers {
  message: string;
  result: {
    currentMarkers: {
      cityName: string;
      cortarNo: number;
      emdName: string;
      sigunguName: string;
    };
    markerInfos: markerInfos[];
  };
}
export interface markerInfos {
  centerLat: number;
  centerLng: number;
  cortarNoCode: number;
  name: string;
}

export interface CurrentMarkers {
  message: string;
  result: {
    currentMarkers: {
      cityName: string;
      cortarNo: number;
      emdName: string;
      sigunguName: string;
    };
    markerInfos: markerInfos[];
  };
}

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

//기존 메세지 불러오기
export interface CurrentMessages {
  message: string;
  result: {
    chatMessageResponse: ChatMessage[];
  };
}

//대기열
export interface CurrentChatRooms {
  message: string;
  result: {
    chatroomResponse: ChatRoom[];
  };
}
