# New developer?

**Using NPM version >= 3 ?**
use `npm set progress=false` to speed up the process before installing the dependencies.

- clone the repo
- install the dependencies with `npm i`
- start the development server & client with `npm run dev`
- http://localhost:3000

# Adding new dependencies

Production: `npm i -S somepackage && npm run lock`
Development only: `npm i -D somepackage && npm run lock`

`npm run lock` is calling `npm shrinkwrap` and [shrinkpack](https://github.com/JamieMason/shrinkpack) for several benefits:
- the dependency tree remains predictible
- if a package is deleted from npm, we have a backup copy
- downloading packages from Github during cloning is much faster than fetching everything from npm afterwards

# Dev tools

## Redux

You can enable/disable them in the [webpack dev config](https://github.com/watch-janick/rise-website/blob/frontend/webpack/dev.config.js#L84)
`CTRL+SHIFT+H to hide them`
`CTRL+SHIFT+L to change position`

Configure or Replace the monitor in the [DevTools container](https://github.com/watch-janick/rise-website/blob/frontend/src/containers/DevTools.js)

## Saga Monitor

Call `logEffect()` from the browser console (`npm run dev` only)

# Conventions

- `null` is reserved for empty values from API, use empty objects, arrays, strings in reducers, selectors, etc.
