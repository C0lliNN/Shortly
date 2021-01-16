declare class ClipboardItem {
  constructor(data: { [mimeType: string]: Blob });
}
interface Clipboard {
  write(data: ClipboardItem[]): Promise<void>;
}

interface NavigatorClipboard {
  readonly clipboard?: Clipboard;
}

interface Navigator extends NavigatorClipboard {}
