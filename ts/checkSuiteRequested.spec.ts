import fs from 'fs'
import nock from 'nock'
import path from 'path'
import { Probot, ProbotOctokit } from 'probot'
import myProbotApp from '.'

let probot: Probot

beforeEach(() => {
  nock.disableNetConnect()
  probot = new Probot({
    appId: 123,
    privateKey: fs.readFileSync(
      path.join(__dirname, 'fixtures/mock-cert.pem'),
      'utf-8'
    ),
    // disable request throttling and retries for testing
    Octokit: ProbotOctokit.defaults({
      retry: { enabled: false },
      throttle: { enabled: false },
    }),
  })
  // Load our app into probot
  return probot.load(myProbotApp)
})

test('do nothing if repo is not .github', async () => {
  const mock = nock('https://api.github.com')
  // // Test that we correctly return a test token
  // .post('/app/installations/2/access_tokens')
  // .reply(200, {
  //   token: 'test',
  //   permissions: {
  //     issues: 'write',
  //   },
  // })

  await probot.receive({
    name: 'check_suite',
    id: 'some id',
    // @ts-ignore
    payload: { repository: { name: 'something-else' } }
  })

  expect(mock.pendingMocks()).toStrictEqual([])
})

afterEach(() => {
  nock.cleanAll()
  nock.enableNetConnect()
})
