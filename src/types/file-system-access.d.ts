export {};

declare global {
  interface OpenFilePickerType {
    description?: string;
    accept: Record<string, string[]>;
  }

  interface OpenFilePickerOptions {
    multiple?: boolean;
    excludeAcceptAllOption?: boolean;
    types?: OpenFilePickerType[];
  }

  interface Window {
    showOpenFilePicker?: (
      options?: OpenFilePickerOptions,
    ) => Promise<FileSystemFileHandle[]>;
  }
}
