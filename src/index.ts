import { Toolkit } from 'actions-toolkit'
import { ReadmeBox } from 'readme-box'
import Parser from 'rss-parser'
import mustache from 'mustache'

const parser = new Parser()

interface Inputs {
  'feed-url': string
  'readme-section': string
  max: string
  pre_template: string
  template: string
  post_template: string
  [key: string]: string
}

Toolkit.run<Inputs>(async tools => {
  // Fetch feed
  const feed = await parser.parseURL(tools.inputs['feed-url'])

  if (!feed.items) {
    throw new Error('feed.items was not found!')
  }

  let strings: Array<string> = []

  if (tools.inputs.pre_template) {
    strings.push(tools.inputs.pre_template)
  }

  // Create our new list
  const newString = feed.items
    .slice(0, parseInt(tools.inputs.max, 10)) 
    .map(item => mustache.render(tools.inputs.template, item)).join('\n')

  strings.push(newString)

  if (tools.inputs.post_template) {
    strings.push(tools.inputs.post_template)
  }

  const finalString = strings.join('\n')

  // Update the section of our README
  await ReadmeBox.updateSection(finalString, {
    ...tools.context.repo,
    token: tools.token,
    section: tools.inputs['readme-section']
  })
})
