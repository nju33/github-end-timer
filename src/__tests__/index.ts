import nock from 'nock';
import {Probot} from 'probot';
import endTimer from '..';
import payload from './fixtures/pull_request.closed.json';

nock.disableNetConnect();

describe('End Timer', () => {
  let probot: any;

  beforeEach(() => {
    probot = new Probot({id: 123, cert: 'test'});
    const app = probot.load(endTimer);
    app.app = () => 'test';
  });

  test('response', async done => {
    nock('https://api.github.com')
      .post('/app/installations/13055/access_tokens')
      .reply(200, {token: 'test'});

    nock('https://api.github.com')
      .get(/repos\/.+\/compare/)
      .reply(200, {
        commits: [
          {
            commit: {
              message: 'test [wt 3.3]'
            }
          },
          {
            commit: {
              message: 'test [et 2.3]'
            }
          }
        ]
      });

    nock('https://api.github.com')
      .post(/repos\/.+\/issues/, (body: {body: string}) => {
        expect(body.body).toMatch(/このプルリクの作業時間は \*\*5時間36分\*\* です/);

        done();
        return true;
      })
      .reply(200);

    await probot.receive({name: 'pull_request', payload});
  });
});
