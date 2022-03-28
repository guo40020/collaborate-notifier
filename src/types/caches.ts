export interface ICacheStructure {
  watchers: {
    systemEvents: ISystemEventWatchCache;
  }
}

export type ISystemEventWatchCache = string[];

