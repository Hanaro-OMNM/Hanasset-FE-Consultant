// global.d.ts
import type { maps } from 'navermaps';

// 네이버 지도 타입을 임포트

export {};

declare global {
  interface Window {
    naver: typeof maps; // naver의 실제 타입으로 설정
  }
}

export type selectedEstateType = {
  id: number;
  name: string;
  detail: string;
  address: string;
};
