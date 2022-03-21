import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId;
  displayName: string;
}

export type IAccessTokenPlatform = "Github" | "Gitlab";

export interface IUserAccessTokens {
  _id: ObjectId;
  userId: ObjectId;
  platformId: string;
  platform: IAccessTokenPlatform;
  token: string;
}

export type IImPlatform = "Lark";

export interface IUserImAccountData<T = never> {
  _id: ObjectId;
  userId: ObjectId;
  platformName: IImPlatform;
  platformId: string;
  extras: T;
}

export interface IEventLog {
  event: string;
  platform: string;
  payload: string;
}

