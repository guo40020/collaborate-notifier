export interface IFeishuConfiguration {
  APP_ID?: string;
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
