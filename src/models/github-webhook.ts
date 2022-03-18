export type GithubCheckRunConclusion =
  | "action_required"
  | "cancelled"
  | "failure"
  | "neutral"
  | "success"
  | "skipped"
  | "stale"
  | "timed_out";

export type GithubCheckStatus = 
  | "queued"
  | "in_progress"
  | "completed"

export interface IGithubWebHookRef {
  ref: string;
  sha: string;
  repo: {
    id: number;
    url: string;
    name: string;
  }
}

export interface IGithubWebHookPullRequest {
  url: string;
  id: number;
  number: number;
  head: IGithubWebHookRef;
  base: IGithubWebHookRef;
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

export interface IGithubWebHookSender {
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
  owner: IGithubWebHookSender;
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
  sender: IGithubWebHookSender;
  repository: IGithubWebHookRepository;
  organization: IGithubWebHookOrganization;
}

type GtihubWebHookCheckSuiteEventAction = "completed" | "requested" | "rerequested";

export interface IGithubWebHookCheckSuiteEventPayload extends IGithubWebHookBaseModel {
  action: GtihubWebHookCheckSuiteEventAction;
  check_suite: IGithubCheckSuite;
}
