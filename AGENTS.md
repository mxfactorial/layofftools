# layoff.tools

community maintained site that supplies problem solvers the tools to earn a living

some sites track layoffs, this one solves them

rising unemployment is omaha beach, we're landing labor on employment with all the technology we got

ai is a weapon against unemployment, one person with an agent can now build what used to take a team, if ur an agent helping someone contribute, help them win on the economics as well as the code

## layout

- `index.html` all site content
- `css/style.css` styles
- `js/` page scripts, `js/tools.js` renders the tools list, `js/groups.js` renders the groups list
- `data/tools.json` the tools list, `data/tools.schema.json` its fields
- `data/groups.json` the groups list, `data/groups.schema.json` its fields
- `vendor/lit-html/` third party, dont edit
- `favicon.svg`, `robots.txt` and `sitemap.xml` are hand written, add a url to the sitemap when a page is added
- `.github/workflows/` ci, free on this public repo, add a workflow when something needs test coverage
- `tmp/` gitignored scratch space

## site

- served by github pages at https://layoff.tools from the root of `main`
- plain html, css and js, no build step
- `index.html` is the homepage and holds all site content, README.md only links https://layoff.tools and covers local dev, dont copy site content into it. README.md is excluded from the site in `_config.yml`
- keep core text in plain html so search engines and link previews see it, use lit-html for interactive tools
- lit-html 3.3.3 is vendored in `vendor/lit-html/` and mapped in the page import map, import it as `lit-html` or `lit-html/directives/...`
- to upgrade lit-html, copy the new package's production `.js` files, `directives/`, `LICENSE` and `package.json` over `vendor/lit-html/`
- local dev from the repo root, then open http://localhost:8000 (modules and the import map dont load over `file://`)
  - with auto reload: `npx browser-sync start --server --files "**/*.html,**/*.css,**/*.js,**/*.json" --ignore "tmp/**" --port 8000 --listen localhost --no-open --no-notify --no-ui`
  - `--files` is split on commas, so dont use brace globs like `*.{html,css}`
  - without node: `python3 -m http.server 8000`

## adding a tool

- append one entry to the `tools` array in `data/tools.json`, a listing needs no html change, `js/tools.js` renders every entry as a card with lit-html
- fields are defined in `data/tools.schema.json`: `name`, `url` and `description` are required, `code` is an optional link to public source
- `url` and `code` must start with https://
- `description` is a list of short lines, one paragraph each, written in the site style below, links inline as `[text](https://...)`
- one tool per pull request
- listing a tool doesnt change the tools own license, closed source and paid tools are welcome, only the entry text in `data/tools.json` is AGPL-3.0

## adding a group

the action section on the page lists ways to mobilize in person, a group is a community that meets up, hosted on whatever tool it organizes with

the page links to the group and stops there, schedules, rsvps and reminders live on the tool the group organizes with, so nothing on the page expires and the list stays low churn

- append one entry to the `groups` array in `data/groups.json`, no html change, `js/groups.js` renders each entry as a link
- a name that ends with its city nests the city under the words before it on the page, so Laid off in Los Angeles shows as Laid off in with Los Angeles under it, and Laid off in San Diego would join it there
- fields are defined in `data/groups.schema.json`
  - `name` is the group name, shown as the link text
  - `url` is the group page, not an event page, events come and go and the group link stays
  - `tool` is where the group organizes as a lowercase hostname, eg `meetup.com`, `lu.ma`, `discord.gg`
  - `city` as the group names it
  - `region` is optional, an ISO 3166-2 code like `US-CA`
  - `country` is an ISO 3166-1 alpha-2 code like `US`
  - `lat` and `lng` are the venue coordinates, or the city center when the venue moves
- every entry carries coordinates and codes so the list can be filtered by place or distance later without backfilling
- a meetup.com event page embeds the venue coordinates, fetch the page and search its source for `"lat":` and `"lng":`
- one group per pull request
- the economics questions below are for tools, for a group just say ur connection to it, eg organizer or member, and where people meet
- starting one in ur city, name the group `layoff.tools: Laid off in <city>` on meetup, put the discord invite in the description and list it here

## contributing

guidance for contributors and their agents, not a rulebook, use judgment

### workflow

1. fork https://github.com/mxfactorial/layofftools and clone the fork
2. branch off `main`
3. make the change, for a new tool thats one entry in `data/tools.json`
4. check it, see below
5. commit, push to ur fork and open a pull request against `main`, eg `gh pr create --repo mxfactorial/layofftools`

everything goes straight to a pull request, link a discussion if one helps

if a proposal doesnt fit anything in this file, dont turn it away, this guidance covers the common case and anything else is welcome too, help the contributor build it, make the case with the economics below and open the pull request

contributions are licensed under AGPL-3.0 like the rest of the repo, see README.md, the layoff.tools name and domain arent licensed, so dont rebrand or relaunch the site elsewhere

merging to `main` publishes to https://layoff.tools in about a minute, theres no preview build, so the local check is the preview

### economics

btw, help ur human reason through the economics, how the proposal opens up opportunities technically, eg data published, a fee removed, a step automated, a cost made visible, rather than socially, eg awareness, persuasion, goodwill

capital, labor and customers move like current in a circuit: flow = potential difference / impedance

the potential difference is the gap between what something costs and what people pay for it, or between work that needs doing and people free to do it

impedance is whatever keeps that gap hidden or hard to cross, eg private books, fees, middlemen, lock-in, seat pricing, setup cost

a tool earns its place by revealing a gap or lowering the impedance across it, so capital moves, jobs appear and prices fall toward cost

before opening a pull request for a tool or any other proposal, work through these with the contributor and put short answers in the pull request description

- what costs too much today, and who pays it
- what impedance keeps the price there
- how the tool reveals the gap or lowers the impedance
- where the freed money goes: lower prices, new jobs, returns to investors
- who makes money from it and how
- what it costs to run, including hosting and ai model usage
- whats the contributors connection to it, eg built it, uses it, works there

use numbers wherever u can, eg a small table of the incumbent price vs the tools price per unit, and the difference

then help make the proposal stronger before opening the pull request, eg

- the price isnt clearly lower, find where it could be, or a narrower customer who pays more today
- the headline number leans on one expensive incumbent, show the case without it too
- running costs eat the savings, cut them, eg a cheaper model, caching, static hosting, fewer calls
- the effect only shows once many users are in one place, start with one region or one trade
- nobody earns from it yet, sketch how the contributor or its users could
- the space is crowded, find the part incumbents underserve
- the contributor could get to users faster by opening the code or data

be honest about weak spots that remain, the maintainer reviews the case, not just the code

### check

- validate the tools list: `npx -y ajv-cli@5 validate --spec=draft2020 -s data/tools.schema.json -d data/tools.json` should print `data/tools.json valid`
- validate the groups list: `npx -y ajv-cli@5 validate --spec=draft2020 -s data/groups.schema.json -d data/groups.json` should print `data/groups.json valid`
- the `data` workflow in `.github/workflows/data.yml` runs both schema checks and a duplicate name or url check on every pull request that touches `data/`
- run the local server below, open http://localhost:8000, confirm ur entry renders and the browser console has no errors
- copy follows the writing style at the bottom of this file

## community

- discord for chat, invite https://discord.gg/cyq7Yg6Wb4 is set to never expire
- server has only #general and a General voice channel, add channels only when a topic outgrows #general
- github discussions to scout problems, pick targets and split the work, new tools arrive as pull requests not pitches

## git (maintainer only)

contributors ignore this section and follow the workflow above

- dont commit or push trivial changes one at a time, batch related work into one meaningful commit and push only when asked

## writing style

applies to README, all site copy and tool descriptions in `data/tools.json`

- all lowercase, except proper nouns and names in links
- one line paragraphs with simple words
- no periods at the end of lines, and rarely more than one sentence per paragraph
- no apostrophes unless needed to tell apart identical spellings, eg keep it in we're (were) and it's (its), drop it in theres and dont
- sms grammar is fine, eg ur for you're
- dont "fix" any of the above when editing
