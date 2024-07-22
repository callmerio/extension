# vite.config.ts

```ts
import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import path from "path"
import manifest from './src/manifest'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },

    plugins: [crx({ manifest }), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})

```

# tsconfig.node.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "src/manifest.ts"]
}

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

# sidepanel.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/icons/logo.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chrome Extension + React + TS + Vite</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/sidepanel/index.tsx"></script>
  </body>
</html>

```

# postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

# popup.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/icon/logo.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chrome Extension + React + TS + Vite</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/popup/index.tsx"></script>
  </body>
</html>

```

# package.json

```json
{
  "name": "pop",
  "displayName": "pop",
  "version": "0.0.0",
  "author": "rioBigDan",
  "description": "",
  "type": "module",
  "license": "MIT",
  "keywords": [
    "chrome-extension",
    "react",
    "vite",
    "create-chrome-ext"
  ],
  "engines": {
    "node": ">=14.18.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "fmt": "prettier --write '**/*.{tsx,ts,json,css,scss,md}'",
    "zip": "npm run build && node src/zip.js"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.1.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.412.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@crxjs/vite-plugin": "^2.0.0-beta.19",
    "@types/chrome": "^0.0.246",
    "@types/node": "^20.14.11",
    "@types/react": "^18.2.28",
    "@types/react-dom": "^18.2.13",
    "@vitejs/plugin-react": "^4.1.0",
    "autoprefixer": "^10.4.19",
    "gulp": "^4.0.2",
    "gulp-zip": "^6.0.0",
    "postcss": "^8.4.39",
    "prettier": "^3.0.3",
    "tailwindcss": "^3.4.6",
    "typescript": "^5.2.2",
    "vite": "^4.4.11"
  }
}
```

# options.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/icons/logo.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chrome Extension + React + TS + Vite</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/options/index.tsx"></script>
  </body>
</html>

```

# newtab.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/icons/logo.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chrome Extension + React + TS + Vite</title>
  </head>

  <body>
    <div id="app"></div>
    <script type="module" src="./src/newtab/index.tsx"></script>
  </body>
</html>

```

# devtools.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/icons/logo.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chrome Extension + React + TS + Vite</title>
  </head>

  <body>
    <div id="app"></div>
    <script type="module" src="./src/devtools/index.tsx"></script>
  </body>
</html>

```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/global.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

# README.md

```md
# pop

> a chrome extension tools built with Vite + React, and Manifest v3

## Installing

1. Check if your `Node.js` version is >= **14**.
2. Change or configurate the name of your extension on `src/manifest`.
3. Run `npm install` to install the dependencies.

## Developing

run the command

\`\`\`shell
$ cd pop

$ npm run dev
\`\`\`

### Chrome Extension Developer Mode

1. set your Chrome browser 'Developer mode' up
2. click 'Load unpacked', and select `pop/build` folder

### Nomal FrontEnd Developer Mode

1. access `http://0.0.0.0:3000/`
2. when debugging popup page, open `http://0.0.0.0:3000//popup.html`
3. when debugging options page, open `http://0.0.0.0:3000//options.html`

## Packing

After the development of your extension run the command

\`\`\`shell
$ npm run build
\`\`\`

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

---

Generated by [create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext)

```

# LICENSE

```
The MIT License (MIT)

Copyright (c) 2024-present, rioBigDan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

```

# CHANGELOG.md

```md
# CHANGELOG

\`\`\`txt
Summary
  1. document grouping follow 'SemVer2.0' protocol
  2. use 'PATCH' as a minimum granularity
  3. use concise descriptions
  4. type: feat \ fix \ update \ perf \ remove \ docs \ chore
  5. version timestamp follow the yyyy.MM.dd format
\`\`\`

## 0.0.0 [2024.07.22]

- feat: initial
- feat: generator by ![create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext)

```

# .prettierrc

```
{
  "jsxSingleQuote": false,
  "singleQuote": true,
  "trailingComma": "all",
  "endOfLine": "lf",
  "printWidth": 100,
  "semi": false,
  "tabWidth": 2,
  "useTabs": false
}

```

# .prettierignore

```
# Ignore artifacts:
build
coverage
node_modules
pnpm-lock.yaml
pnpm-workspace.yaml

```

# .npmignore

```
# OS 
.DS_Store

# ignore node dependency directories & lock
node_modules
yarn.lock
pnpm-lock.yaml
package-lock.json

# ignore log files and local
*.log
*.local
.env.local
.env.development.local
.env.test.local
.env.production.local
.history

# ignore compiled files
build
types
coverage

# ignore ide settings
.idea
.vscode

```

# .gitignore

```
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
/node_modules

# testing
/coverage

# production
/build
/package

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.history
*.log

# secrets
secrets.*.js
```

# .editorconfig

```
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,jsx,ts,tsx,md}]
charset = utf-8
indent_style = space
indent_size = 2
tab_width = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true


# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2

```

# src/zip.js

```js
import gulp from 'gulp'
import zip from 'gulp-zip'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const manifest = require('../build/manifest.json')

gulp
  .src('build/**')
  .pipe(zip(`${manifest.name.replaceAll(' ', '-')}-${manifest.version}.zip`))
  .pipe(gulp.dest('package'))

```

# src/manifest.ts

```ts
import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-34.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo-48.png',
  },
  options_page: 'options.html',
  devtools_page: 'devtools.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/contentScript/index.ts'],
    },
  ],
  side_panel: {
    default_path: 'sidepanel.html',
  },
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: [],
    },
  ],
  permissions: ['sidePanel', 'storage'],
  chrome_url_overrides: {
    newtab: 'newtab.html',
  },
})

```

# src/global.d.ts

```ts
/// <reference types="vite/client" />

declare const __APP_VERSION__: string

```

# src/global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

# src/sidepanel/index.tsx

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { SidePanel } from './SidePanel'
import './index.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <SidePanel />
  </React.StrictMode>,
)

```

# src/sidepanel/index.css

```css
:root {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;

  color-scheme: light dark;
  background-color: #242424;
}

@media (prefers-color-scheme: light) {
  :root {
    background-color: #fafafa;
  }
}

body {
  min-width: 20rem;
  margin: 0;
}

```

# src/sidepanel/SidePanel.tsx

```tsx
import { useState, useEffect } from 'react'

import './SidePanel.css'

export const SidePanel = () => {
  const [countSync, setCountSync] = useState(0)
  const link = 'https://github.com/guocaoyi/create-chrome-ext'

  useEffect(() => {
    chrome.storage.sync.get(['count'], (result) => {
      setCountSync(result.count || 0)
    })

    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === 'COUNT') {
        setCountSync(request.count || 0)
      }
    })
  }, [])

  return (
    <main>
      <h3>SidePanel Page</h3>
      <h4>Count from Popup: {countSync}</h4>
      <a href={link} target="_blank">
        generated by create-chrome-ext
      </a>
    </main>
  )
}

export default SidePanel

```

# src/sidepanel/SidePanel.css

```css
@media (prefers-color-scheme: light) {
  a:hover {
    color: #61dafb;
  }
}

main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
}

h3 {
  color: #61dafb;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.2rem;
  margin: 2rem auto;
}

a {
  font-size: 0.5rem;
  margin: 0.5rem;
  color: #cccccc;
  text-decoration: none;
}

```

# src/popup/index.tsx

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Popup } from './Popup'
import './index.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
)

```

# src/popup/index.css

```css
:root {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;

  color-scheme: light dark;
  background-color: #242424;
}

@media (prefers-color-scheme: light) {
  :root {
    background-color: #fafafa;
  }
}

body {
  min-width: 20rem;
  margin: 0;
}

```

# src/popup/Popup.tsx

```tsx
import { useState, useEffect } from 'react'

import './Popup.css'

export const Popup = () => {
  const [count, setCount] = useState(0)
  const link = 'https://github.com/guocaoyi/create-chrome-ext'

  const minus = () => {
    if (count > 0) setCount(count - 1)
  }

  const add = () => setCount(count + 1)

  useEffect(() => {
    chrome.storage.sync.get(['count'], (result) => {
      setCount(result.count || 0)
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({ count })
    chrome.runtime.sendMessage({ type: 'COUNT', count })
  }, [count])

  return (
    <main>
      <h3>Popup Page</h3>
      <div className="calc">
        <button onClick={minus} disabled={count <= 0}>
          -
        </button>
        <label>{count}</label>
        <button onClick={add}>+</button>
      </div>
      <a href={link} target="_blank">
        generated by create-chrome-ext
      </a>
    </main>
  )
}

export default Popup

```

# src/popup/Popup.css

```css
@media (prefers-color-scheme: light) {
  a:hover {
    color: #61dafb;
  }
}

main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
}

h3 {
  color: #61dafb;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.2rem;
  margin: 2rem auto;
}

.calc {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;

  & > button {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #61dafb;
    border-radius: 0.25rem;
    background-color: transparent;
    color: #61dafb;
    cursor: pointer;
    outline: none;

    width: 3rem;
    margin: 0 a;
  }

  & > label {
    font-size: 1.5rem;
    margin: 0 1rem;
  }
}

a {
  font-size: 0.5rem;
  margin: 0.5rem;
  color: #cccccc;
  text-decoration: none;
}

```

# src/options/index.tsx

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Options'
import './index.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

```

# src/options/index.css

```css
:root {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;

  color-scheme: light dark;
  background-color: #242424;
}

@media (prefers-color-scheme: light) {
  :root {
    background-color: #fafafa;
  }
}

body {
  min-width: 20rem;
  margin: 0;
}

```

# src/options/Options.tsx

```tsx
import { useState, useEffect } from 'react'

import './Options.css'

export const Options = () => {
  const [countSync, setCountSync] = useState(0)
  const link = 'https://github.com/guocaoyi/create-chrome-ext'

  useEffect(() => {
    chrome.storage.sync.get(['count'], (result) => {
      setCountSync(result.count || 0)
    })

    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === 'COUNT') {
        setCountSync(request.count || 0)
      }
    })
  }, [])

  return (
    <main>
      <h3>Options Page</h3>
      <h4>Count from Popup: {countSync}</h4>
      <a href={link} target="_blank">
        generated by create-chrome-ext
      </a>
    </main>
  )
}

export default Options

```

# src/options/Options.css

```css
@media (prefers-color-scheme: light) {
  a:hover {
    color: #61dafb;
  }
}

body {
  min-width: 20rem;
}

main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
}

h3 {
  color: #61dafb;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.2rem;
  margin: 2rem auto;
}

a {
  font-size: 0.5rem;
  margin: 0.5rem;
  color: #cccccc;
  text-decoration: none;
}

```

# src/contentScript/index.ts

```ts
console.info('contentScript is running')

```

# src/newtab/index.tsx

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { NewTab } from './NewTab'
import './index.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <NewTab />
  </React.StrictMode>,
)

```

# src/newtab/index.css

```css
:root {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;

  color-scheme: light dark;
  background-color: #242424;
}

@media (prefers-color-scheme: light) {
  :root {
    background-color: #fafafa;
  }
}

body {
  min-width: 20rem;
  margin: 0;
}

```

# src/newtab/NewTab.tsx

```tsx
import { useState, useEffect } from 'react'

import './NewTab.css'

export const NewTab = () => {
  const getTime = () => {
    const date = new Date()
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${hour}:${minute}`
  }

  const [time, setTime] = useState(getTime())
  const link = 'https://github.com/guocaoyi/create-chrome-ext'

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTime(getTime())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <section>
      <span></span>
      <h1>{time}</h1>
      <a href={link} target="_blank">
        generated by create-chrome-ext
      </a>
    </section>
  )
}

export default NewTab

```

# src/newtab/NewTab.css

```css
section::before {
  content: '';
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-image: url('https://source.unsplash.com/random');
  background-size: cover;
  filter: blur(10px);
}

section {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: #61dafb;
  text-transform: uppercase;
  font-size: 6rem;
  margin: 2rem auto;
}

a {
  font-size: 0.5rem;
  margin: 0.5rem;
  color: #cccccc;
  text-decoration: none;
}

```

# src/background/index.ts

```ts
console.log('background is running')

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }
})

```

# src/devtools/index.tsx

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { DevTools } from './DevTools'
import './index.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <DevTools />
  </React.StrictMode>,
)

chrome.devtools.panels.create('ReactCrx', '', '../../devtools.html', function () {
  console.log('devtools panel create')
})

```

# src/devtools/index.css

```css
:root {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;

  color-scheme: light dark;
  background-color: #242424;
}

@media (prefers-color-scheme: light) {
  :root {
    background-color: #fafafa;
  }
}

body {
  min-width: 20rem;
  margin: 0;
}

```

# src/devtools/DevTools.tsx

```tsx
import './DevTools.css'

export const DevTools = () => {
  const link = 'https://github.com/guocaoyi/create-chrome-ext'

  return (
    <main>
      <h3>DevTools Page</h3>
      <a href={link} target="_blank">
        generated by create-chrome-ext
      </a>
    </main>
  )
}

export default DevTools

```

# src/devtools/DevTools.css

```css
@media (prefers-color-scheme: light) {
  a:hover {
    color: #61dafb;
  }
}

body {
  min-width: 20rem;
}

main {
  text-align: center;
  padding: 1em;
  margin: 0 auto;
}

h3 {
  color: #61dafb;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.2rem;
  margin: 2rem auto;
}

a {
  font-size: 0.5rem;
  margin: 0.5rem;
  color: #cccccc;
  text-decoration: none;
}

```

# src/lib/utils.ts

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# src/assets/logo.png

This is a binary file of the type: Image

# public/img/logo-48.png

This is a binary file of the type: Image

# public/img/logo-34.png

This is a binary file of the type: Image

# public/img/logo-16.png

This is a binary file of the type: Image

# public/img/logo-128.png

This is a binary file of the type: Image

# public/icons/logo.svg

This is a file of the type: SVG Image

# public/icons/logo.ico

This is a binary file of the type: Binary

# src/components/ui/button.tsx

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

