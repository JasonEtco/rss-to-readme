import { Toolkit } from 'actions-toolkit'
import { ReadmeBox } from 'readme-box'
import Parser from 'rss-parser'
import mustache from 'mustache'

const parser = new Parser()

interface Inputs {
  'feed-url': string
  'readme-section': string
  max: string
  template: string
  branch: string
  [key: string]: string
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
    .map(item => mustache.render(tools.inputs.template, item)).join('\n')

  // Update the section of our README
  await ReadmeBox.updateSection(newString, {
    ...tools.context.repo,
    token: tools.token,
    section: tools.inputs['readme-section'],
    branch: tools.inputs.branch || tools.context.payload.repository?.default_branch
  })
})
