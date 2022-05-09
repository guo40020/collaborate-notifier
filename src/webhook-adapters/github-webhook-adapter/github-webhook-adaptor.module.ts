import { Module } from "@nestjs/common";
import { ImSenderModule } from "src/im-adapters/im-sender.module";
import {GithubWebhookController} from "./github-webhook.controller";
import { GithubWebhookService } from "./github-webhook.service";

@Module({
  controllers: [GithubWebhookController],
  providers: [GithubWebhookService],
  imports: [ImSenderModule],
})
export class GitHubWebhookAdapterModule {}
