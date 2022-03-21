import { Injectable } from "@nestjs/common";
import { IGithubWebHookPullRequestReviewEventPayload } from "src/models/github-webhook";

@Injectable()
export class GithubWebhookService {
  async onPrReview(payload: IGithubWebHookPullRequestReviewEventPayload) {

  }
}
