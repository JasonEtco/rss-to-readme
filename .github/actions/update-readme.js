const { Toolkit } = require('actions-toolkit')
const Parser = require('rss-parser')
const parser = new Parser()

const MAX_ITEMS = 30

Toolkit.run(async tools => {
  // Fetch feed
  const feed = await parser.parseURL(process.env.FEED_URL)
  // Create our new README string. This could be way more robust.
  const newString = feed.items
    .slice(0, MAX_ITEMS)
    .map(item => `* [${item.title}](${item.link})`).join('\n')
  // Update the README.md
  const existingReadme = await tools.github.repos.getReadme(tools.context.repo)
  await tools.github.repos.createOrUpdateFile({
    ...tools.context.repo,
    content: Buffer.from(newString).toString('base64'),
    message: 'Automatic README update',
    path: 'README.md',
    sha: existingReadme.data.sha
  })
}, {
  secrets: ['GITHUB_TOKEN', 'FEED_URL']
})
