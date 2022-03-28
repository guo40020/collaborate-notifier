export interface IFeishuBaseResponse {
  code: number;
  msg: "success" | string;
}

export interface IGetAuthTokenResponse extends IFeishuBaseResponse {
  tenant_access_token: string;
  expire: number;
}
