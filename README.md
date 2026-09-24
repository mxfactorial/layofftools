# layoff.tools

https://layoff.tools

## local dev

serve the folder then open http://localhost:8000

with node, the page reloads when u save

```
npx browser-sync start --server --files "**/*.html,**/*.css,**/*.js,**/*.json" --ignore "tmp/**" --port 8000 --listen localhost --no-open --no-notify --no-ui
```

without node, refresh by hand

```
python3 -m http.server 8000
```

opening index.html as a file breaks the js, browsers only load modules from a server

## license

[AGPL-3.0](LICENSE), copyright (c) 2026 layoff.tools contributors

the layoff.tools name and domain arent covered by the license, forks must use a different name

`vendor/lit-html` keeps its own BSD-3-Clause license
