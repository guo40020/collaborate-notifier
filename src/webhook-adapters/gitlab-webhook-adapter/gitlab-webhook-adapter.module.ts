import { Module } from "@nestjs/common";
import { GitlabWebhookController } from "./gitlab-webhook.controller";

@Module({
  controllers: [GitlabWebhookController]
})
export class GitlabWebhookModule {}
