export interface PullRequestRef {
  label: string;
  ref: string;
  sha: string;
  user: any;
  repo: any;
}

export interface PullRequestCommitUser {
  name: string;
  email: string;
  date: string;
}

export interface PullRequestCommitUserMeta {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface PullRequestCommitTree {
  sha: string;
  url: string;
}

export interface PullRequestCommitVerification {
  verified: boolean;
  reason: string;
  signature: null;
  payload: null;
}

export interface PullRequestCommit {
  sha: string;
  node_id: string;
  commit: {
    author: PullRequestCommitUser;
    committer: PullRequestCommitUser;
    message: string;
    tree: PullRequestCommitTree;
    url: string;
    comment_count: number;
    verification: PullRequestCommitVerification;
  };
  url: string;
  html_url: string;
  comments_url: string;
  author: PullRequestCommitUserMeta;
  committer: PullRequestCommitUserMeta;
  parents: {sha: string; url: string; html_url: string}[];
}

export interface PullRequestCommitCompareResult {
  status: string;
  ahead_by: number;
  behind_by: number;
  total_commits: number;
  commits: PullRequestCommit[];
}
