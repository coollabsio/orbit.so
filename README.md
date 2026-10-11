# orbit.so

![Orbit landing page](.github/screenshots/hero.webp)

Landing page for [Orbit](https://github.com/coollabsio/orbit), the self-hosted workspace for teams by coolLabs.

Built with Astro, Tailwind CSS v4 and [Reicon](https://www.npmjs.com/package/reicon) icons, in the same style as coolify.io and coollabs.io, with a pink theme.

<details>
<summary>Full page</summary>

![Orbit landing page, full page](.github/screenshots/full.webp)

</details>

## Development

```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # static site in dist/
```

## Notes

- Screenshots in `public/images/screenshots/` were captured from the Orbit web app with demo data (1600x1000 @2x, resized to 2400px WebP).
- `Dockerfile` and `nginx.conf` build and serve the static site.
