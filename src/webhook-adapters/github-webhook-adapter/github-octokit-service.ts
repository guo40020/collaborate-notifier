import { Injectable } from "@nestjs/common";
import { Octokit } from "Octokit";

@Injectable()
export class OctokitService {
  public octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({ auth: process.env.GITHUB_PAT });
  }

  public async getPullRequest(owner: string, repo: string, prNumber: number) {
    const pr = await this.octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
    });
    return pr.data;
  }

  public async getPullRequestReview(
    owner: string,
    repo: string,
    prNumber: number,
    reviewId: number,
  ) {
    const review = await this.octokit.rest.pulls.getReview({
      owner,
      repo,
      pull_number: prNumber,
      review_id: reviewId,
    });
    return review.data;
  }
}
