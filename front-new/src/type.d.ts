declare module "@editorjs/marker" {
  import type { InlineTool, InlineToolConstructorOptions } from "@editorjs/editorjs";

  export default class Marker implements InlineTool {
    constructor(options: InlineToolConstructorOptions);
    static get isInline(): boolean;
    static get shortcut(): string;
    static get sanitize(): object;
    render(): HTMLElement;
    surround(range: Range): void;
    checkState(): boolean;
    static get title(): string;
  }
}

declare module "title-editorjs" {
  import type { BlockTool, BlockToolConstructorOptions } from "@editorjs/editorjs";

  export default class Title implements BlockTool {
    constructor(options: BlockToolConstructorOptions);
    render(): HTMLElement;
    save(block: HTMLElement): object;
    static get toolbox(): { title: string; icon: string };
  }
}

declare module "editorjs-inline-tool" {
  import type { InlineTool } from "@editorjs/editorjs";

  interface GenericInlineToolConfig {
    sanitize: Record<string, object>;
    shortcut?: string;
    tagName: string;
    toolboxIcon?: string;
  }

  export function createGenericInlineTool(config: GenericInlineToolConfig): new () => InlineTool;
  export const ItalicInlineTool: new () => InlineTool;
  export const UnderlineInlineTool: new () => InlineTool;
  export default createGenericInlineTool;
}

declare module "editorjs-text-color-plugin" {
  import type { InlineTool, InlineToolConstructorOptions } from "@editorjs/editorjs";

  interface ColorPluginConfig {
    colorCollections?: string[];
    defaultColor?: string;
    type?: "text" | "marker";
    customPicker?: boolean;
    icon?: string;
  }

  export default class ColorPlugin implements InlineTool {
    constructor(options: InlineToolConstructorOptions);
    static get isInline(): boolean;
    static get sanitize(): object;
    static get title(): string;
    render(): HTMLElement;
    surround(range: Range): void;
    checkState(): boolean;
  }
}