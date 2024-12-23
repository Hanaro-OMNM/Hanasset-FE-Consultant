import axios, { AxiosInstance } from 'axios';
import {
  ChatMessage,
  CurrentChatRooms,
} from '../types/hanaAssetResponse.common.ts';

export class PlatformAPI {
  static instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
    withCredentials: true,
  });
  private static readonly defaultConfig = {
    headers: { 'Content-Type': 'application/json' },
  };
  public static async getMessagesInfo(
    chatroomId: string
  ): Promise<ChatMessage> {
    const response = await this.instance.get(`chat/chatroom/messages`, {
      ...this.defaultConfig,
      params: chatroomId, //쿼리 파라미터
    });
    return response.data as ChatMessage;
  }

  public static async getWaitingRoomsInfo(
    consultantId: number // consultantId를 매개변수로 추가
  ): Promise<CurrentChatRooms> {
    const response = await this.instance.get(`chat/waiting/${consultantId}`, {
      ...this.defaultConfig,
    });
    return response.data as CurrentChatRooms;
  }

  public static async putChatroomStatus(
    chatroomId: string,
    state: string
  ): Promise<CurrentChatRooms> {
    const response = await this.instance.put(
      `chat/update-status`,
      { chatroomId, state }, //request body
      { ...this.defaultConfig }
    );
    return response.data as CurrentChatRooms;
  }
}
