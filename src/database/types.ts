import { ObjectId } from "mongodb";
import { ImPlatformType, RepoPlatformType, WatchScopeType } from "src/types/common";

export interface IUser {
  _id: ObjectId;
  displayName: string;
}


export interface IUserAccessTokens {
  _id: ObjectId;
  userId: ObjectId;
  platformId: string;
  platform: RepoPlatformType;
  token: string;
}

export interface IUserImAccountData<T = never> {
  _id: ObjectId;
  userId: ObjectId;
  platformName: ImPlatformType;
  platformId: string;
  extras: T;
}

export interface IActivityWatchers {
 _id: ObjectId;
 userId: ObjectId;
 scope: WatchScopeType;
}

export interface IPrActivityWatchers {
  _id: ObjectId;
  userId: ObjectId;
  prNumber: number;
  repoPlatform: RepoPlatformType;
}

export interface IIssueActivityWatchers {
  _id: ObjectId;
  userId: ObjectId;
  issueNumber: number;
  repoPlatform: RepoPlatformType;
}

export interface IEventLog {
  event: string;
  platform: string;
  payload: string;
}

