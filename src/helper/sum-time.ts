import {PullRequestCommit} from '../types/pull-request';

const re = /\[wt\s+([.\d]+)\]/;
export const getTime = (message: string) => {
  const matches = message.match(re);

  if (matches === null) {
    return 0;
  }

  const time = Number(matches[1]);
  if (Number.isNaN(time)) {
    return 0;
  }

  return time;
};

export const sumTime = (commits: PullRequestCommit[]) => {
  return commits.reduce((acc, commit) => {
    acc += getTime(commit.commit.message);
    return acc;
  }, 0);
};
