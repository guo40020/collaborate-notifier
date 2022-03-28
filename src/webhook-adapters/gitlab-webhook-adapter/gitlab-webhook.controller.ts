import { Body, Controller, Headers, Post } from "@nestjs/common";

@Controller("/webhooks/gitlab")
export class GitlabWebhookController {
  @Post("payload")
  public async payload(@Headers("X-Gitlab-Event") event: string, @Body() payload: string) {
  }
}
