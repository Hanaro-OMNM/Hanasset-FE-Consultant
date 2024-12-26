export interface LoginRequest {
  consultantLoginId: string;
  password: string;
}

//src/types/hanaAssetRequest.common.ts

export interface CurrentLocation {
  lat: number;
  lng: number;
  zoom: number;
}
