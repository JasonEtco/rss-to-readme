<h3 align="center">📦🔖</h3>
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

**`feed-url`**:

The URL to an RSS feed. It's assumed that the RSS feed follow the standard format!

**`readme-section`**:

The name of the section of your README to update. This uses [`JasonEtco/readme-box`](https://github.com/JasonEtco/readme-box) to replace a section of the README and update the file. Your README should contain HTML comments like this, where `example` is the the value of `readme-section`:

```html
### Example RSS feed:

<!--START_SECTION:example-->
...
<!--END_SECTION:example-->
```

You can inspect this repo's README to see it in use!

### Example RSS feed:

<!--START_SECTION:feed-->
* [349: Black Lives Matter](https://designdetails.simplecast.com/episodes/349-black-lives-matter-czdMW9KM)
* [348: Getting Unstuck](https://designdetails.simplecast.com/episodes/9ae0646c-9ae0646c)
* [347: Overcoming Skill Gaps](https://designdetails.simplecast.com/episodes/0a523f70-0a523f70)
* [346: Quality Software](https://designdetails.simplecast.com/episodes/94edbd03-94edbd03)
* [345: Developing Taste](https://designdetails.simplecast.com/episodes/3d318a0d-3d318a0d)
<!--END_SECTION:feed-->

> This started as a little proof-of-concept for @brianlovin!
