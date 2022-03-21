import { Module } from "@nestjs/common";
import {GithubWebhookControler} from "./github-webhook.controller";
import { GithubWebhookService } from "./github-webhook.service";

@Module({
  controllers: [GithubWebhookControler],
  providers: [GithubWebhookService],
})
export class GitHubWebhookAdapterModule {}
