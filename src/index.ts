import type { AstroIntegration } from 'astro';
import { createTerminalCodeProcessor } from './processor.js';

export interface TerminalCodeConfig {
  themes?: {
    light?: string;
    dark?: string;
  };
  features?: {
    lineNumbers?: boolean;
    copyButton?: boolean;
    diffHighlight?: boolean;
    languageBadge?: boolean;
    terminalFrame?: boolean;
    workspaceMode?: boolean;
  };
  customStyles?: {
    borderRadius?: string;
    fontFamily?: string;
    fontSize?: string;
  };
}

export default function terminalCode(config: TerminalCodeConfig = {}): AstroIntegration {
  return {
    name: '@sandikodev/astro-terminal-code',
    hooks: {
      'astro:config:setup': ({ updateConfig, addRenderer }) => {
        const processor = createTerminalCodeProcessor(config);
        
        updateConfig({
          markdown: {
            syntaxHighlight: false, // We handle this ourselves
          },
        });

        // Add our custom renderer for code blocks
        addRenderer({
          name: 'terminal-code-renderer',
          serverEntrypoint: '@sandikodev/astro-terminal-code/renderer',
        });
      },
      'astro:config:done': ({ config }) => {
        console.log('🖥️  Terminal Code: Workspace-ready syntax highlighting enabled');
        if (config.features?.workspaceMode) {
          console.log('🚀 Workspace Mode: Desktop environment compatibility active');
        }
      },
    },
  };
}

export { terminalCode };
export type { TerminalCodeConfig };
