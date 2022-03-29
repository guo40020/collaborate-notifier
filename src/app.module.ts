import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import configLoader from "./config/config-loader";
import { configSchema } from "./config/config-validate-schema";
import { FeishuImModule } from "./im-adapters/feishu-adapter/feishu.im.module";
import { FeishuImService } from "./im-adapters/feishu-adapter/feishu.im.service";
import { ICacheStructure } from "./types/caches";
import { GitHubWebhookAdapterModule } from "./webhook-adapters/github-webhook-adapter/github-webhook-adaptor.module";

@Module({
  imports: [
    GitHubWebhookAdapterModule,
    CacheModule.register<ICacheStructure>(),
    ConfigModule.forRoot({
      load: [configLoader],
      validationSchema: configSchema,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    FeishuImModule,
  ],
  providers: [
  ],
})
export class AppModule {
}
