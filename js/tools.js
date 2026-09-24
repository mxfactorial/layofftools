import { html, render } from 'lit-html'

// turns [text](https://...) into links, everything else stays plain text
const linkify = (line) => {
  const parts = []
  let last = 0
  for (const m of line.matchAll(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g)) {
    parts.push(line.slice(last, m.index), html`<a href=${m[2]}>${m[1]}</a>`)
    last = m.index + m[0].length
  }
  parts.push(line.slice(last))
  return parts
}

const toolCard = (tool) => html`
  <article class="tool">
    <h3><a href=${tool.url}>${tool.name}</a></h3>
    ${tool.description.map((line) => html`<p>${linkify(line)}</p>`)}
    ${tool.code
      ? html`<p><a href=${tool.code}>${tool.code.replace(/^https:\/\//, '')}</a></p>`
      : ''}
  </article>
`

const { tools } = await fetch('/data/tools.json').then((r) => r.json())

render(tools.map(toolCard), document.getElementById('tool-list'))
