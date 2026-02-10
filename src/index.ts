import type { AstroIntegration } from "astro";

export interface TerminalCodeConfig {
  customStyles?: {
    borderRadius?: string;
    fontFamily?: string;
    fontSize?: string;
  };
  features?: {
    copyButton?: boolean;
    diffHighlight?: boolean;
    languageBadge?: boolean;
    lineNumbers?: boolean;
    terminalFrame?: boolean;
    workspaceMode?: boolean;
  };
  themes?: {
    dark?: string;
    light?: string;
  };
}

export default function terminalCode(
  config: TerminalCodeConfig = {},
): AstroIntegration {
  return {
    hooks: {
      "astro:config:done": () => {
        console.log(
          "🖥️  Terminal Code: Workspace-ready syntax highlighting enabled",
        );
        // Check our TerminalCodeConfig, not AstroConfig
        if (config.features?.workspaceMode) {
          console.log(
            "🚀 Workspace Mode: Desktop environment compatibility active",
          );
        }
      },
      "astro:config:setup": ({ addRenderer, updateConfig }) => {
        // Processor not needed in setup, only for runtime
        updateConfig({
          markdown: {
            syntaxHighlight: false, // We handle this ourselves
          },
        });

        // Add our custom renderer for code blocks
        addRenderer({
          name: "terminal-code-renderer",
          serverEntrypoint: "@sandikodev/astro-terminal-code/renderer",
        });
      },
    },
    name: "@sandikodev/astro-terminal-code",
  };
}

export { terminalCode };
// Note: TerminalCodeConfig is already exported via the interface declaration above
