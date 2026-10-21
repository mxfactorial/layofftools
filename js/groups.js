import { html, render } from 'lit-html'

const { groups: list } = await fetch('/data/groups.json').then((r) => r.json())

// the part of the name before the city, eg Laid off in Los Angeles -> Laid off in
const prefix = (m) => {
  const tail = ` ${m.city}`
  return m.name.toLowerCase().endsWith(tail.toLowerCase()) ? m.name.slice(0, -tail.length) : ''
}

// entries with a prefix nest their city under it, sharing a prefix merges them, the rest list as is
const groups = new Map()
for (const m of list) {
  const p = prefix(m)
  if (!groups.has(p)) groups.set(p, [])
  groups.get(p).push(m)
}

render(
  html`<ul>
    ${[...groups].flatMap(([p, list]) =>
      p
        ? html`<li>${p}<ul>${list.map((m) => html`<li><a href=${m.url}>${m.city}</a></li>`)}</ul></li>`
        : list.map((m) => html`<li><a href=${m.url}>${m.name}</a></li>`)
    )}
  </ul>`,
  document.getElementById('group-list')
)
