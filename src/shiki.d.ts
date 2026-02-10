// Type declaration for shiki module
// This package declares shiki as a dependency but types may not be installed in submodule
// This stub allows TypeScript to compile while the full shiki package is installed externally

declare module "shiki" {
  export interface Highlighter {
    codeToHtml(
      code: string,
      options: { lang: string; themes: Record<string, string> },
    ): string;
  }

  export interface HighlighterOptions {
    langs: string[];
    themes: string[];
  }

  export function getHighlighter(
    options: HighlighterOptions,
  ): Promise<Highlighter>;
}
