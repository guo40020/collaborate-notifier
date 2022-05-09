import {
  Controller,
  Post,
  Headers,
  Body,
  HttpCode,
  Logger,
} from "@nestjs/common";
import {
  IGithubWebHookBaseModel,
  IGithubWebHookPullRequestReviewEventPayload,
} from "src/models/github-webhook";
import { GithubEventType } from "src/types/github-types";
import { GithubWebhookService } from "./github-webhook.service";

@Controller("/webhooks/github/")
export class GithubWebhookController {
  constructor(private readonly githubService: GithubWebhookService) {}

  private readonly logger = new Logger(GithubWebhookController.name, {
    timestamp: true,
  });

  @Post("payload")
  @HttpCode(204)
  public async payload(
    @Headers("X-GitHub-Event") event: GithubEventType,
    @Headers("X-GitHub-Delivery") guid: string,
    @Body() payload: IGithubWebHookBaseModel,
  ) {
    this.logger.log(`received ${event} event with guid ${guid}`);
    switch (event) {
      case "ping":
        break;
      case "pull_requests_review":
        this.githubService.onPrReview(
          payload as IGithubWebHookPullRequestReviewEventPayload,
        );
        break;
    }
  }
}
