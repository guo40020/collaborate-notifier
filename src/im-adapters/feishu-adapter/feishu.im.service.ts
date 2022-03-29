import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SchedulerRegistry } from "@nestjs/schedule";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { IFeishuConfiguration } from "src/config/config-types";
import { IGetAuthTokenResponse } from "src/models/feishu";

const FEISHU_AUTH_TOKEN_URL = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal";

@Injectable()
export class FeishuImService {
  private enabled: boolean;
  private app_id: string;
  private app_secret: string;
  private bearerToken: string;
  private logger: Logger;
  private expiry: number;
  private axiosInstance: AxiosInstance;

  public static async factory(
    configService: ConfigService,
    schedulerRegistry: SchedulerRegistry,
  ): Promise<FeishuImService> {
    console.log("factory called");
    const instance = new FeishuImService(configService, schedulerRegistry);
    await instance.initService();
    return instance;
  }

  static provide = {
    provide: FeishuImService,
    inject: [ConfigService, SchedulerRegistry],
    useFactory: FeishuImService.factory,
  };

  constructor(private readonly configService: ConfigService, private readonly scheduleRegistry: SchedulerRegistry) {
    this.logger = new Logger("FeishuAdapterService");
  }

  private async renewToken() {
    try {
      const res = await axios.post<any, AxiosResponse<IGetAuthTokenResponse, IGetAuthTokenResponse>>(
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

      if (res.data.code !== 0) {
        this.logger.error(`Got non-zero response code: ${res.data.code}, msg: ${res.data.msg}`);
        throw new Error(`Got non-zero response code: ${res.data.code}, msg: ${res.data.msg}`)
      }

      this.bearerToken = res.data.tenant_access_token;
      this.expiry = res.data.expire;

      this.axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${this.bearerToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      this.logger.verbose(`Adding token renewal with timeout: ${this.expiry}`);
      const renewTimeout = setTimeout(() => {
        this.scheduleRegistry.deleteTimeout("feishu_token_renewal");
        this.renewToken();
      }, this.expiry);
      this.scheduleRegistry.addTimeout("feishu_token_renewal", renewTimeout);

    } catch (e: unknown) {
      const err = e as AxiosError<IGetAuthTokenResponse>;
      this.logger.error(
        `Failed to get feishu auth token: err: ${err.message} code: ${
          err.response?.data?.code ?? "no code received"
        } msg: ${err.response?.data?.msg ?? "no msg received"}`,
      );
      throw e;
    }
  }

  public async initService() {
    this.logger.verbose("Loading secrets");
    const feishuConf = this.configService.get<IFeishuConfiguration>("FEISHU");
    if (!feishuConf) {
      this.logger.warn("Feishu authorization not configured. Disabling...");
      this.enabled = false;
      return;
    }
    if (!feishuConf.APP_ID) {
      this.logger.warn("Feishu app_key not configured. Disabling...");
      this.enabled = false;
      return;
    }
    if (!feishuConf.APP_SECRET) {
      this.logger.warn("Feishu app_secret not configured. Disabling...");
      this.enabled = false;
      return;
    }

    await this.renewToken()
  }

  public async sendCard() {}
}
