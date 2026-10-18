# dashboard

A personal dashboard with live cards: calendar, GitHub activity, music, anime and games, AI usage, and recent YouTube likes.

**Live site:** https://oherna25.github.io/dashboard/

## How it works

The site is plain HTML, CSS, and JavaScript — no build step, no framework, no backend.

| file | role |
| --- | --- |
| `index.html` | card grid markup |
| `styles.css` | light and dark themes, responsive layout |
| `data.js` | a complete set of mock data (`DASHBOARD`) |
| `live.js` | generated live snapshot (optional) |
| `app.js` | overlays `live.js` onto the mock data and renders the cards |

Each card has one renderer and two possible sources: the mock data in `data.js`, or the live snapshot in `live.js`. The renderers never fetch anything themselves. If `live.js` is absent, or one source fails, that card falls back to its mock values and the sources row marks it red. A fresh checkout with no `live.js` therefore shows the full layout on mock data.

## Live data

`live.js` is generated on a local machine by a collector that talks to each API, then published as a static file:

| card | source |
| --- | --- |
| github | GitHub API — recent commits and projects |
| steam | Steam Web API — games, playtime, last played |
| apple music | Apple Music API — recently played |
| anilist | AniList GraphQL — watching and completed |
| youtube | YouTube Data API — recent liked videos |
| opencode | local SQLite database — sessions and token usage |
| cursor | local snapshot exported from the Cursor app |
| calendar, today, lately | derived from calendar and activity data |

Credentials — API keys and OAuth refresh tokens — exist only on the collecting machine, outside this repository. The collector runs there and emits display-ready values; the browser never receives a key. The local build refuses to publish a bundle that contains a secret-like string.

## Deploy

Everything the site needs is static. To publish a copy:

1. Put the site files in a new folder: `index.html`, `styles.css`, `data.js`, `app.js`, and optionally `live.js`.
2. Create a public repository and push:

   ```sh
   git init -b main
   git add -A
   git commit -m "dashboard"
   gh repo create <name> --public --source=. --push
   gh api -X POST repos/{owner}/{repo}/pages -f "source[branch]=main" -f "source[path]=/"
   ```

3. GitHub Pages serves the site at `https://<owner>.github.io/<name>/` after the first build.

Without a `live.js`, the page runs entirely on the mock data in `data.js`. To publish live data, generate `live.js` on the collecting machine and commit it — any static host works, and nothing server-side is required.

This copy refreshes every ten minutes: a launchd job on the collecting machine rebuilds `live.js`, amends the single commit, and force-pushes it. The repository therefore always holds exactly one snapshot.
