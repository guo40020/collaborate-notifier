import { ObjectId } from "mongodb";
import { ImPlatformType, RepoPlatformType, WatchScopeType } from "src/types/common";

export interface IUser {
  _id: ObjectId;
  displayName: string;
}

export interface IUserAccessTokens {
  userId: ObjectId;
  platformId: string;
  platform: RepoPlatformType;
  token: string;
}

export interface IUserImAccountData<T = never> {
  userId: ObjectId;
  platformName: ImPlatformType;
  platformId: string;
  extras: T;
}

export interface IActivityWatchers {
  _id: ObjectId;
  userId: ObjectId;
  scope: WatchScopeType;
  repoPlatform: RepoPlatformType;
  repo?: string;  // required for repo & collaboration type
  prNumber?: number;  // required for pr type
  issueNumber?: number;  // required for issue type
  eventLevel?: number;  // required for systemEvents type
}

export interface IEventLog {
  event: string;
  platform: string;
  payload: string;
}
