import { Probot } from 'probot'

export function checkSuiteRequested(app: Probot) {
  app.on('check_suite.requested', async (event) => {
    if ('.github' !== event.payload.repository.name) return

    const basehead = `${event.payload.check_suite.before!}...${event.payload.check_suite.after!}`
    await event.octokit.repos.compareCommitsWithBasehead({
      basehead,
      repo: event.payload.repository.name,
      owner: event.payload.repository.owner.login,
    })
  })
}
