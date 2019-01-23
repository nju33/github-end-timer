import {Application} from 'probot';
import {
  PullRequestRef,
  PullRequestCommitCompareResult,
} from './types/pull-request';
import {sumTime} from './helper';

export = (app: Application) => {
  const router = app.route('/cron');
  router.get('/job', (_: unknown, res: any) => {
    res.end('working');
  });

  app.on('pull_request.closed', async context => {
    const pullRequest: {
      head: PullRequestRef;
      base: PullRequestRef;
    } = {
      head: context.payload.pull_request.head,
      base: context.payload.pull_request.base,
    };

    const {
      data,
    }: {
      data: PullRequestCommitCompareResult;
    } = await context.github.repos.compareCommits(
      context.repo({
        head: pullRequest.head.sha,
        base: pullRequest.base.sha,
      }),
    );

    const time = sumTime(data.commits);
    let timeStr = '';
    if (time < 1) {
      timeStr = `${time}分`;
    } else {
      timeStr = `${Math.floor(time)}時${Math.ceil(60 * (time % 1))}分`;
    }

    const issueComment = context.issue({
      body: `このプルリクの作業時間は **${timeStr}** です`,
    });
    context.github.issues.createComment(issueComment);
  });
};
