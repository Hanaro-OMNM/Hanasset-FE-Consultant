export interface LoginRequest {
  consultantLoginId: string;
  password: string;
}

export interface CurrentLocation {
  lat: number;
  lng: number;
  zoom: number;
}
