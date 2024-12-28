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

export interface LoanRecommend {
  user: GuestInfo;
  loanRecommendInfos: LoanRecommendInfo[];
}

export interface GuestInfo {
  name: string;
  age: number;
  jobType: string;
  income: number;
  capital: number;
  hasHouse: boolean;
  annualInterest: number;
  annualPrinciple: number;
  dsr: number;
}

export interface LoanRecommendInfo {
  realEstateInfo: RealEstateInfo;
  hanaLoans: LoanInfo[];
  beotimmokLoans: LoanInfo[];
}

export interface RealEstateInfo {
  realEstateId: number;
  name: string;
  rentType: string;
  deposit: number;
  address: string;
  addressDetail: string;
  exclusiveAreaSize: number;
}

export interface LoanInfo {
  loanId: number;
  name: string;
  rate: number;
  limitAmount: number;
  dsr: number;
}

export interface LoanDetail {
  loanId: number;
  type: string;
  name: string;
  outline: string;
  limitAmount: number;
  rate: number;
  feature: string;
  targetGuest: string;
  targetHouse: string;
  period: string;
  paybackMethod: string;
  dsr: number;
}

export interface UserInfoResponse {
  id: number;
  name: string;
  email: string;
}
