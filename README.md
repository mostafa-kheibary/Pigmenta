<p align="center">
  <a href="https://pigmenta.dev">
    <img width="20%" src=".github/assets/pigmenta-transparent.png" alt="Pigmenta logo" />
    <h1 align="center">Pigmenta</h1>
  </a>
</p>

<p align="center">
  <em>The complete toolkit for theming — generate and manage design tokens with ease.</em><br><br>
  <a href="https://www.npmjs.com/package/pigmenta">
    <img src="https://img.shields.io/npm/dm/pigmenta.svg?style=flat-round" alt="npm downloads" />
  </a>
  <a href="https://www.npmjs.com/package/pigmenta">
    <img alt="NPM Version" src="https://badgen.net/npm/v/pigmenta" />
  </a>
  <a href="https://github.com/yourname/pigmenta/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/pigmenta?style=flat" alt="License" />
  </a>
</p>

<p align="center">
  <img src=".github/assets/pigmenta-banner.png" alt="Pigmenta banner" width="100%" />
</p>

---

## 🌈 Overview

**Pigmenta** is a lightweight, powerful toolkit for theming and design token management.  
It helps you define color palettes, tokens, and outputs ready-to-use **Tailwind** or **CSS** themes automatically.

Perfect for **UI libraries**, **monorepos**, and **multi-theme applications**.

---

## ✨ Features

- ⚙️ **Automatic theme generation** (CSS or Tailwind)
- 🌗 **Light / Dark mode** ready
- 🧩 **Extendable configs** for shared theming in monorepos
- ⚡ **Vite plugin support** for real-time updates
- 🔄 **Watch mode** to auto-generate themes on file change
- 🧠 **Typed configuration** with auto-completion
- 🪄 **Simple CLI** for setup and management
- 💡 **VS Code extension** for token previews and theme sync
- 🎨 **Figma plugin** to import/export tokens visually

---

## 🚀 Quick Start

### 1. Installation

```bash
# with npm
npm i pigmenta -D

# or yarn
yarn add pigmenta -D

# or pnpm
pnpm add pigmenta -D
```

### 2. Initialize Pigmenta

Create your theme config:

```bash
npx pigmenta init
```

This creates a `pigmenta.config.js` file and a `.pigmenta` directory with type definitions.

Example config:

```js
/** @type {import('./.pigmenta/types').Config} */
export default {
	options: {
		output: 'tailwind',
		dest: './src',
		default: 'light',
		tokenPrefix: 'color',
	},
	pallets: {
		neutral: {
			titanium: {
				shade: {
					0: '#101113',
					10: '#181A1C',
					20: '#2E3033',
				},
			},
		},
	},
	tokens: {
		back: {
			light: 'neutral-titanium-shade-95',
			dark: 'neutral-titanium-black',
		},
	},
};
```

### 3. Generate Theme Files

```bash
npx pigmenta watch
```

This will automatically generate your Tailwind or CSS theme files based on your config.

---

## 🔌 Vite Integration

Pigmenta ships with a Vite plugin for live updates while developing.

```js
import { defineConfig } from 'vite';
import { pigmentaVitePlugin } from 'pigmenta/vite';

export default defineConfig({
	plugins: [sveltekit(), pigmentaVitePlugin()],
});
```

---

## 🧱 Extending Configs

You can extend other Pigmenta configs to share tokens and palettes across packages — ideal for monorepos or design systems.

```js
export default {
	options: {
		output: 'tailwind',
		dest: './src',
		default: 'light',
		extend: ['../../pigmenta.config.js'],
	},
	pallets: {},
	tokens: {},
};
```

---

## 🧭 Example Use Cases

- Build a **shared design system** for multiple apps
- Sync **theme tokens** between design and code
- Quickly prototype **dark / light** modes
- Generate **Tailwind-ready** themes from your tokens

---

## 🎨 Pigmenta Figma Plugin — _Bridge Design to Code_

The **Pigmenta Figma Plugin** lets designers export color tokens directly from Figma into a ready-to-use **Pigmenta config file**.

No more manual syncing — generate `.pigmenta` token structures straight from your design system and keep your codebase perfectly aligned.

👉 **[Install from Figma Community](https://www.figma.com/community/plugin/xxxx-pigmenta)**

**Key Features:**

- 🎨 Export colors, palettes, and shades from Figma
- 🔄 Generate Pigmenta-compatible tokens automatically
- 🧩 Stay consistent between design and development

---

## 💡 Pigmenta VS Code Extension

The **Pigmenta VS Code Extension** enhances your workflow with smart syntax highlighting and color awareness.

It recognizes Pigmenta token names, highlights their values, and gives you quick color previews inline — making theme editing intuitive and visual.

👉 **[Download from Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=pigmenta.vscode-extension)**

**Key Features:**

- 🌈 Smart syntax highlighting for tokens
- 🧠 Inline color previews and hover info
- ⚙️ Works seamlessly with your `pigmenta.config.js`

> Together, the Figma plugin and VS Code extension close the loop between **design** and **development**, keeping your themes in perfect sync 🎯

---

## 🧑‍💻 Contributing

Contributions are always welcome!
Please read the [contributing guide](./CONTRIBUTING.md) before submitting PRs.

---

## 🧠 Authors

- **Mostafa Kheibary** ([@taker](https://github.com/taker))
- Community contributors 💛

---

## 📜 License

Licensed under the [MIT License](./LICENSE).

---

> Built with love and a bit of pigment 🎨
