import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configLoader from "./config/config-loader";
import { configSchema } from "./config/config-validate-schema";
import { ICacheStructure } from "./types/caches";
import { GitHubWebhookAdapterModule } from "./webhook-adapters/github-webhook-adapter/github-webhook-adaptor.module";

@Module({
  imports: [
    GitHubWebhookAdapterModule,
    CacheModule.register<ICacheStructure>(),
    ConfigModule.forRoot({
      load: [configLoader],
      validationSchema: configSchema,
    }),
  ],
})
export class AppModule {
}
