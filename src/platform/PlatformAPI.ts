import axios, { AxiosInstance } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { LoginRequest } from '../types/hanaAssetRequest.common.ts';

export class PlatformAPI {
  static isTokenExpired = (token: string) => {
    try {
      const decoded = jwtDecode(token); // 토큰 디코딩
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp! < currentTime; // 만료 여부 확인
    } catch (error) {
      console.error('Invalid token', error);
      return true;
    }
  };

  static instance: AxiosInstance = (() => {
    const instance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 10000,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });

    instance.interceptors.response.use(
      (response) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && this.isTokenExpired(accessToken)) {
          const authorizationHeader = response.headers.authorization;
          if (
            authorizationHeader &&
            authorizationHeader.startsWith('Bearer ')
          ) {
            const accessToken = authorizationHeader.split(' ')[1];
            localStorage.setItem('accessToken', accessToken);
            return accessToken;
          } else {
            console.error('Authorization header is missing or invalid');
            return undefined;
          }
        }
        return response;
      },
      (error) => {
        console.error('Response error:', error);
      }
    );

    return instance;
  })();

  public static async login(
    loginData: LoginRequest
  ): Promise<string | undefined> {
    try {
      const response = await this.instance.post(
        '/consultant/signin',
        loginData
      );
      const authorizationHeader = response.headers.authorization;

      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const accessToken = authorizationHeader.split(' ')[1];
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
      } else {
        console.error('Authorization header is missing or invalid');
        return undefined;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return undefined;
    }
  }
}
