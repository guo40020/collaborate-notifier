import { Module } from "@nestjs/common";
import { GitlabWebhookController } from "./gitlab-webhook.controller";
import { GitlabWebhookService } from "./gitlab-webhook.service";

@Module({
  controllers: [GitlabWebhookController],
  providers: [GitlabWebhookService]
})
export class GitlabWebhookModule {}
