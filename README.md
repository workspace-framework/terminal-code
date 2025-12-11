# @sandikodev/astro-terminal-code

🖥️ **Terminal-style code highlighting for Astro with advanced workspace integration**

Part of the **RENDER Ecosystem** - "Ruin your F*cking at door" - building towards revolutionary desktop environment development with web technologies.

## ✨ Features

- 🎨 **Terminal-style frames** with macOS-like controls
- 📝 **Line numbers** with terminal aesthetics  
- 🔄 **Diff highlighting** with +/- indicators
- 📋 **Copy functionality** with visual feedback
- 🏷️ **Language badges** positioned beautifully
- 🚀 **Workspace mode** for desktop environment compatibility
- 🎯 **Future-proof** for native desktop integration

## 🚀 Installation

```bash
npm install @sandikodev/astro-terminal-code
```

## 📖 Usage

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import terminalCode from '@sandikodev/astro-terminal-code';

export default defineConfig({
  integrations: [
    terminalCode({
      themes: {
        light: 'github-light',
        dark: 'tokyo-night'
      },
      features: {
        lineNumbers: true,
        copyButton: true,
        diffHighlight: true,
        terminalFrame: true,
        workspaceMode: true, // 🚀 Enable for desktop environment
      }
    })
  ]
});
```

## 🎯 Advanced Usage

### Terminal Frame with Title
```js title="my-awesome-code.js"
console.log('Hello RENDER!');
```

### Diff Highlighting
```js diff="+1,3 -2"
- const old = 'legacy';
+ const new = 'modern';
+ const future = 'RENDER';
```

### Line Highlighting
```js {1,3-5}
const line1 = 'highlighted';
const line2 = 'normal';
const line3 = 'highlighted';
const line4 = 'highlighted';
const line5 = 'highlighted';
```

## 🌟 Workspace Mode

When `workspaceMode: true` is enabled, code blocks become **desktop environment compatible**:

- Adds `data-workspace-widget="code-block"` attributes
- Enables future native desktop integration
- Prepares for **RENDER** compositor compatibility

## 🎨 Theming

Fully compatible with terminal themes and workspace aesthetics:

- Tokyo Night (default dark)
- GitHub Light (default light)  
- Custom CSS variables support
- Terminal color scheme integration

## 🔮 Roadmap: RENDER Vision

This package is **Phase 1** of the RENDER ecosystem:

1. **Phase 1**: `@sandikodev/astro-terminal-code` ✅
2. **Phase 2**: `@sandikodev/workspace-framework` 
3. **Phase 3**: **RENDER Native Desktop Environment**

### The Vision
Create a **native desktop environment** where developers can build applications as easily as web development, with:
- **Wayland/Rust compositor** integration
- **Native performance** with web DX
- **Component-based** desktop applications
- **RedoxOS** compatibility

## 🤝 Contributing

Join the **RENDER** revolution! "Tunneling the door at everything" - This is bigger than just code highlighting - we're building the future of desktop development.

## 📄 License

MIT - Built with ❤️ by [SandikoDev](https://sandikodev.com)

---

**"Making desktop development as easy as web development"** 🚀
