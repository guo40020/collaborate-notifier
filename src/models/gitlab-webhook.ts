export type MergeRequestActions =
  | "open"
  | "close"
  | "reopen"
  | "update"
  | "approved"
  | "unapproved"
  | "approval"
  | "unapproved"
  | "merge";

export interface IGitlabUser {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
  email: string;
}

export interface IGitlabProject {
  id: number;
  name: string;
  description: string;
  web_url: string;
  avatar_url: string;
  namespace: string;
  default_branch: string;
  git_ssh_url: string;
  git_http_url: string;
  visibility_level: number;
  path_with_namespace: string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

export interface IGitlabRepository {
  name: string;
  url: string;
  description: string;
  homepage: string;
}

export interface IGitlabCommitAuthor {
  name: string;
  email: string;
}

export interface IGitlabCommit {
  id: string;
  message: string;
  timestamp: string;
  url: string;
  author: IGitlabCommitAuthor;
}

export interface IGitlabChange {
  updated_by_id: {
    previous: number | null;
    current: number;
  };
  updated_at: {
    previous: string | null;
    current: string;
  };
  labels: {
    previous: IGitlabLabel[],
    current: IGitlabLabel[],
  }
}

export interface IGitlabLabel {
  id: number;
  title: string;
  color: string;
  project_id: number;
  created_at: string;
  updated_at: string;
  template: boolean;
  description: string;
  type: string;
  group_id: number;
}

export interface IGitlabMergeRequestObject {
  id: number;
  target_branch: string;
  source_branch: string;
  source_project_id: number;
  author_id: number;
  assignee_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  milestone_id: number | null;
  state: string;
  blocking_discussions_resolved: boolean;
  merge_status: string;
  target_project_id: number;
  iid: number;
  description: string;
  source: IGitlabProject;
  target: IGitlabProject;
  last_commit: IGitlabCommit;
  work_in_progress: boolean;
  url: string;
  action: MergeRequestActions;
  assignee: IGitlabUser;
}

export interface IBaseMergeRequestPayload {
  event_type: "merge_request";
  user: IGitlabUser;
  object_attributes: IGitlabMergeRequestObject;
  labels: IGitlabLabel[];
  changes: IGitlabChange;
}
