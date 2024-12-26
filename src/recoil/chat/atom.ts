import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { WaitingRoom } from '../../types/hanaAssetResponse.common';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // 로컬 스토리지의 키 이름
  storage: localStorage, // 기본 storage는 localStorage
});

export const activeChatRoomState = atom<WaitingRoom | null>({
  key: 'activeChatRoomState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
