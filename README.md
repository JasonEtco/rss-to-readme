<h3 align="center">📡📝</h3>
<h3 align="center">RSS to README Action</h3>
<p align="center">A GitHub Action that updates a section of a README from an RSS feed.</p>

---

## Usage

You can use this action in a workflow file like any other:

```yml
name: Update this repo's README

on:
  schedule:
    # Once a day at 8 AM
    - cron: 0 8 * * *

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: JasonEtco/rss-to-readme@v1
        with:
          feed-url: https://jasonet.co/rss.xml
          readme-section: feed
```

### Options

#### `feed-url`:

The URL to an RSS feed. It's assumed that the RSS feed follow the standard format!

#### `readme-section`:

The name of the section of your README to update. This uses [`JasonEtco/readme-box`](https://github.com/JasonEtco/readme-box) to replace a section of the README and update the file. Your README should contain HTML comments like this, where `feed` is the the value of `readme-section`:

```html
### Example RSS feed:

<!--START_SECTION:feed-->
...
<!--END_SECTION:feed-->
```

You can inspect this repo's README to see it in use!

#### `max` (default: 5)

The maximum number of items to show from the RSS feed. Defaults to `5`!

#### `template` (default: `"* [{{ title }}]({{ link }}))"`)

The template to use when rendering each item in the feed. These will be joined by a newline (`\n`).

### Example RSS feed:

<!--START_SECTION:example-->
* [Probot App or GitHub Action? (Updated)](https://jasonet.co/posts/probot-app-or-github-action-v2/)
* [Build your own Probot](https://jasonet.co/posts/build-your-own-probot/)
* [New features of GitHub Actions v2](https://jasonet.co/posts/new-features-of-github-actions/)
* [Run your GitHub Actions workflow on a schedule](https://jasonet.co/posts/scheduled-actions/)
* [Just enough Docker](https://jasonet.co/posts/just-enough-docker/)
<!--END_SECTION:example-->

> This started as a little proof-of-concept for @brianlovin!
