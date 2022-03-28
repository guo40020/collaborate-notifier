import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosError, AxiosInstance } from "axios";
import { IFeishuConfiguration } from "src/config/config-types";
import { IGetAuthTokenResponse } from "src/models/feishu";

const FEISHU_AUTH_TOKEN_URL = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal";

@Injectable()
export class FeishuService {
  private enabled: boolean;
  private app_id: string;
  private app_secret: string;
  private bearerToken: string;
  private logger: Logger;
  private expiry: number;
  private axiosInstance: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger("FeishuAdapterService");
  }

  public async initService() {
    this.logger.verbose("Loading secrets");
    const feishuConf = this.configService.get<IFeishuConfiguration>("feishu");
    if (!feishuConf) {
      this.logger.warn("Feishu authorization not configured. Disabling...");
      this.enabled = false;
      return;
    }
    if (!feishuConf.APP_KEY) {
      this.logger.warn("Feishu app_key not configured. Disabling...");
      this.enabled = false;
      return;
    }
    if (!feishuConf.APP_SECRET) {
      this.logger.warn("Feishu app_secret not configured. Disabling...");
      this.enabled = false;
      return;
    }

    try {
      const res = await axios.post<any, IGetAuthTokenResponse>(
        FEISHU_AUTH_TOKEN_URL,
        {
          app_id: this.app_id,
          app_secret: this.app_secret,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      );

      this.bearerToken = res.tenant_access_token;
      this.expiry = res.expire;

      this.axiosInstance = axios.create({
        headers: {
          "Authorization": `Bearer ${this.bearerToken}`,
          "Content-Type": "application/json; charset=utf-8",
        }
      });
    } catch (e: unknown) {
      const err = e as AxiosError<IGetAuthTokenResponse>;
      this.logger.error(
        `Failed to get feishu auth token: err: ${err.message} code: ${
          err.response?.data?.code ?? "no code received"
        } msg: ${err.response?.data?.msg ?? "no msg received"}`,
      );
    }
  }
}
