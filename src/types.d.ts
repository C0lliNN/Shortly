declare class ClipboardItem {
  constructor(data: { [mimeType: string]: Blob });
}
interface Clipboard {
  write(data: ClipboardItem[]): Promise<void>;
}

interface Navigator {
  readonly clipboard: Clipboard;
}
