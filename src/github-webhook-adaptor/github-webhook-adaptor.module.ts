import { Module } from "@nestjs/common";
import {GithubWebhookControler} from "./github-webhook.controller";

@Module({
  controllers: [GithubWebhookControler],
})
export class GitHubWebhookAdapterModule {}
