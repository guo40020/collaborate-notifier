export interface IFeishuConfiguration {
  APP_KEY?: string;
  APP_SECRET?: string;
}

export type IConfiguration = {
  ROOT_PAT: string;
  DB: {
    URI: string;
    database: string;
  };
  FEISHU: IFeishuConfiguration;
}
