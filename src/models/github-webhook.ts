export type GithubCheckRunConclusion =
  | "action_required"
  | "cancelled"
  | "failure"
  | "neutral"
  | "success"
  | "skipped"
  | "stale"
  | "timed_out";

export type GithubCheckStatus = "queued" | "in_progress" | "completed";

export interface IGithubWebHookRef {
  ref: string;
  sha: string;
  repo: {
    id: number;
    url: string;
    name: string;
  };
}

export type GithubPullRequestState = "opened" | "closed";

export interface IGithubLabels {
  id: number;
  url: string;
  name: string;
  description: string;
  color: string;
}

export interface IGithubWebHookPullRequest {
  url: string;
  id: number;
  number: number;
  user: IGithubWebHookUser;
  head: IGithubWebHookRef;
  base: IGithubWebHookRef;
  title: string;
  state: GithubPullRequestState;
  body: string;
  closed_at: string;
  updated_at: string;
  merged_at: string;
  assignees: IGithubWebHookUser[];
  requested_reviewers: IGithubWebHookUser;
}

export interface IGithubCheckSuite {
  id: number;
  head_sha: string;
  status: GithubCheckStatus;
  conclusion: GithubCheckRunConclusion;
  started_at: string;
  completed_at: string;
  name: string;
  pull_requests: any;
}

export interface IGithubWebHookUser {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  type: string;
}

export interface IGithubWebHookOrganization {
  login: string;
  id: number;
  url: string;
  avatar_url: string;
  description: string;
}

export interface IGithubWebHookRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: IGithubWebHookUser;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  ssh_url: string;
  clone_url: string;
}

export interface IGithubWebHookBaseModel {
  action: string;
  sender: IGithubWebHookUser;
  repository: IGithubWebHookRepository;
  organization: IGithubWebHookOrganization;
}

type GtihubWebHookCheckSuiteEventAction =
  | "completed"
  | "requested"
  | "rerequested";

export interface IGithubWebHookCheckSuiteEventPayload
  extends IGithubWebHookBaseModel {
  action: GtihubWebHookCheckSuiteEventAction;
  check_suite: IGithubCheckSuite;
}

type GithubWebHookPullRequestEventAction =
  | "assigned"
  | "auto_merge_disabled"
  | "auto_merge_enabled"
  | "closed"
  | "converted_to_draft"
  | "edited"
  | "labeled"
  | "locked"
  | "locked"
  | "opened"
  | "ready_for_review"
  | "reopened"
  | "review-request_removed"
  | "review_requested"
  | "synchronize"
  | "unassigned"
  | "unlabeled"
  | "unlocked"
  // review only
  | "submitted"
  | "edited"
  | "dismissed"
  // review comment only
  | "created"
  | "deleted";

export interface IGithubWebHookPullRequestEventPayload
  extends IGithubWebHookBaseModel {
  action: GithubWebHookPullRequestEventAction;
  number: number;
  changes: {
    title: {
      from: string;
    },
    body: {
      from: string;
    }
  }
  pull_requests: IGithubWebHookPullRequest;
  repository: IGithubWebHookRepository;
  organization: IGithubWebHookOrganization;
}

export interface IGithubWebHookPullRequestReview {
  id: number;
  user: IGithubWebHookUser;
  body: string | null;
  commit_id: string;
  submitted_at: string;
  state: string;
  pull_request_url: string;
}

export interface IGithubWebHookPullRequestReviewEventPayload extends IGithubWebHookPullRequestEventPayload {
  action: "submitted" | "edited" | "dismissed";
  review: IGithubWebHookPullRequestReview;
}

export interface IGithubWebHookPullRequestReviewCommentEventPayload extends IGithubWebHookPullRequestEventPayload {
  action: "created" | "edited" | "deleted";
}
