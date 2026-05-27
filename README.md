# Personal Website

Live at [kieranhitchcock.com](https://kieranhitchcock.com).

Static site exploring creative coding with [p5.js](https://p5js.org), inspired by [Daniel Shiffman](https://www.youtube.com/@TheCodingTrain/videos) (The Coding Train).

## Stack

- Plain HTML/CSS/JS — no build step
- p5.js sketches under `projects/` (Slime Mold, Boids, Worley Noise, Contour Map, Noisy Lines, Jake The Dog, Hidden Text, Money Money Money)
- Hosted on Cloudflare Workers Static Assets — `wrangler.jsonc` at repo root, deploys via Workers Builds on push to `main`
