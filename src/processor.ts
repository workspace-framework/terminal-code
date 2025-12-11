import { getHighlighter } from 'shiki';
import type { TerminalCodeConfig } from './index.js';

export interface ProcessedCode {
  html: string;
  lang: string;
  meta?: {
    title?: string;
    highlight?: number[];
    diff?: { add: number[]; remove: number[] };
  };
}

export function createTerminalCodeProcessor(config: TerminalCodeConfig) {
  const {
    themes = { light: 'github-light', dark: 'tokyo-night' },
    features = {
      lineNumbers: true,
      copyButton: true,
      diffHighlight: true,
      languageBadge: true,
      terminalFrame: true,
      workspaceMode: false,
    },
    customStyles = {},
  } = config;

  return {
    async processCode(code: string, lang: string, meta?: string): Promise<ProcessedCode> {
      const highlighter = await getHighlighter({
        themes: Object.values(themes),
        langs: [lang || 'text'],
      });

      // Parse meta information
      const parsedMeta = parseMeta(meta || '');
      
      // Generate highlighted HTML
      let html = highlighter.codeToHtml(code, {
        lang: lang || 'text',
        themes: themes,
      });

      // Apply terminal-style enhancements
      html = applyTerminalStyling(html, {
        lang,
        meta: parsedMeta,
        features,
        customStyles,
      });

      return {
        html,
        lang,
        meta: parsedMeta,
      };
    },
  };
}

function parseMeta(meta: string) {
  const result: any = {};
  
  // Parse title: title="My Code"
  const titleMatch = meta.match(/title="([^"]+)"/);
  if (titleMatch) result.title = titleMatch[1];
  
  // Parse highlight lines: {1,3-5}
  const highlightMatch = meta.match(/\{([0-9,-]+)\}/);
  if (highlightMatch) {
    result.highlight = parseLineNumbers(highlightMatch[1]);
  }
  
  // Parse diff: diff="+1,3 -2,4"
  const diffMatch = meta.match(/diff="([^"]+)"/);
  if (diffMatch) {
    const diffStr = diffMatch[1];
    const addMatch = diffStr.match(/\+([0-9,]+)/);
    const removeMatch = diffStr.match(/-([0-9,]+)/);
    
    result.diff = {
      add: addMatch ? parseLineNumbers(addMatch[1]) : [],
      remove: removeMatch ? parseLineNumbers(removeMatch[1]) : [],
    };
  }
  
  return result;
}

function parseLineNumbers(str: string): number[] {
  return str.split(',').flatMap(part => {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    return [Number(part)];
  });
}

function applyTerminalStyling(html: string, options: any): string {
  const { lang, meta, features, customStyles } = options;
  
  let enhanced = html;
  
  // Add terminal frame if enabled
  if (features.terminalFrame) {
    enhanced = wrapInTerminalFrame(enhanced, lang, meta?.title);
  }
  
  // Add line numbers if enabled
  if (features.lineNumbers) {
    enhanced = addLineNumbers(enhanced);
  }
  
  // Add diff highlighting if enabled and meta has diff info
  if (features.diffHighlight && meta?.diff) {
    enhanced = addDiffHighlighting(enhanced, meta.diff);
  }
  
  // Add copy button if enabled
  if (features.copyButton) {
    enhanced = addCopyButton(enhanced);
  }
  
  // Add workspace-specific enhancements
  if (features.workspaceMode) {
    enhanced = addWorkspaceFeatures(enhanced);
  }
  
  return enhanced;
}

function wrapInTerminalFrame(html: string, lang: string, title?: string): string {
  const header = title || lang || 'terminal';
  
  return `
    <div class="terminal-code-block" data-lang="${lang}">
      <div class="terminal-header">
        <div class="terminal-controls">
          <span class="terminal-dot terminal-close"></span>
          <span class="terminal-dot terminal-minimize"></span>
          <span class="terminal-dot terminal-maximize"></span>
        </div>
        <div class="terminal-title">${header}</div>
        <div class="terminal-actions">
          <!-- Copy button will be inserted here -->
        </div>
      </div>
      <div class="terminal-content">
        ${html}
      </div>
    </div>
  `;
}

function addLineNumbers(html: string): string {
  // Add line number styling classes
  return html.replace(/<pre[^>]*>/g, '<pre class="terminal-pre with-line-numbers">');
}

function addDiffHighlighting(html: string, diff: { add: number[]; remove: number[] }): string {
  // Add diff classes to specific lines
  let lineIndex = 1;
  return html.replace(/<span class="line">/g, () => {
    const classes = ['line'];
    if (diff.add.includes(lineIndex)) classes.push('diff-add');
    if (diff.remove.includes(lineIndex)) classes.push('diff-remove');
    lineIndex++;
    return `<span class="${classes.join(' ')}">`;
  });
}

function addCopyButton(html: string): string {
  return html.replace(
    '<div class="terminal-actions">',
    `<div class="terminal-actions">
      <button class="terminal-copy-btn" onclick="terminalCopyCode(this)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
        <span>Copy</span>
      </button>`
  );
}

function addWorkspaceFeatures(html: string): string {
  // Add workspace-specific classes and attributes for future desktop integration
  return html.replace(
    '<div class="terminal-code-block"',
    '<div class="terminal-code-block workspace-compatible" data-workspace-widget="code-block"'
  );
}
