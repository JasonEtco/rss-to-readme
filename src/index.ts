import { Toolkit } from 'actions-toolkit'
import { ReadmeBox } from 'readme-box'
import Parser from 'rss-parser'
import nunjucks from 'nunjucks'
// @ts-ignore
import dateFilter from 'nunjucks-date-filter'

const parser = new Parser()
const env = nunjucks.configure({ autoescape: false })
env.addFilter('date', dateFilter)

interface Inputs {
  'feed-url': string
  'readme-section': string
  'empty-commits': string
  max: string
  template: string
  branch: string
  [key: string]: string
}

async function getReadme(tools: Toolkit, branch: string, path: string) {
  const { data } = await tools.github.request('GET /repos/:owner/:repo/contents/:path', {
    ...tools.context.repo,
    ref: branch,
    path
  })

  // The API returns the blob as base64 encoded, we need to decode it
  const encoded = data.content
  const decoded = Buffer.from(encoded, 'base64').toString('utf8')

  return {
    content: decoded,
    sha: data.sha
  }
}

Toolkit.run<Inputs>(async tools => {
  // Fetch feed
  const feed = await parser.parseURL(tools.inputs['feed-url'])

  if (!feed.items) {
    throw new Error('feed.items was not found!')
  }

  // Create our new list
  const newString = feed.items
    .slice(0, parseInt(tools.inputs.max, 10)) 
    .map(item => env.renderString(tools.inputs.template, item)).join('\n')

  // Prepare some options
  const emptyCommits = tools.inputs['empty-commits'] !== 'false'
  const branch = tools.inputs.branch || tools.context.payload.repository?.default_branch
  const path = tools.inputs.path || 'README.md'

  // Update the section of our README
  const box = new ReadmeBox({
    ...tools.context.repo,
    token: tools.token,
    branch: tools.inputs.branch || tools.context.payload.repository?.default_branch
  })

  // Get the README
  const { content: oldContents, sha } = await getReadme(tools, box.branch, path)

  // Replace the old contents with the new
  const replaced = box.replaceSection({
    section: tools.inputs['readme-section'],
    oldContents,
    newContents: newString
  })

  if (emptyCommits !== true && oldContents === replaced) {
    return
  }

  // Actually update the README
  return box.updateReadme({
    content: replaced,
    branch,
    sha,
    path
  })
})


//Sorry, let me comment for the hacktoberfest crowd 
