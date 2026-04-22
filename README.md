# Yggdrasil Ascent

A Norse-mythology trivia climb for middle-school readers. Nine worlds, three difficulty modes, a library of question sets (Norse gods, *Magnus Chase* ch. 1–25), and a teacher dashboard for roster and question editing.

All state (progress, best times, roster, custom questions) is stored in the player's browser — no backend required.

## Run locally

No build step. Just open the HTML directly:

```bash
open "Ragnarok Countdown.html"
```

Or serve it over localhost (recommended so `localStorage` stays scoped per-host):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/Ragnarok%20Countdown.html
```

## Deploy

This is a fully static site — any static host will work.

### GitHub Pages (simplest)

1. Push to `main`
2. Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `root`
3. Your site lives at `https://<user>.github.io/<repo>/Ragnarok%20Countdown.html`

To make the root URL work, rename `Ragnarok Countdown.html` to `index.html` or add a redirect. See `index.html` (included — it redirects `/` to the main file).

### Netlify / Vercel / Cloudflare Pages

Drop the repo in, no build command, publish directory = `/`. The `index.html` redirect handles the root.

## Project layout

```
Ragnarok Countdown.html   main entry point — stage, screens, all markup
game.js                   runtime: router, quiz logic, timers, state
questions.js              question bank (Norse + Magnus Chase sets)
sfx.js                    Web Audio SFX (horn, ding, snap, growl)
teacher.js                teacher dashboard: roster + question editor
tokens.css                shared color + type tokens (unused at runtime; ref only)
assets/                   any imagery / fonts referenced by the HTML
```

`Norse Minigame Wireframes.html` and `_debug/` are development scratch and are excluded via `.gitignore`.

## Teacher area

Click the graduation-cap icon in the top-right of the HUD. Default password is `ragnarok` (change it in `teacher.js` — look for `TEACHER_PW`).

The dashboard stores everything in the same-origin `localStorage`, so:

- Roster + edited questions are per-device, not per-deployment.
- Clearing browser data wipes it.
- If you want shared/persistent state across devices, you'll need a backend — out of scope for this build.

## License

Private / unreleased.
