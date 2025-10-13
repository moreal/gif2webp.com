import type { LoadedFile } from "../utils/fileUtils";

// Create a simple GIF-like header for mock data
// This is a minimal GIF87a header
const createMockGifData = (size: number): ArrayBuffer => {
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);

  // GIF89a header
  view[0] = 0x47; // 'G'
  view[1] = 0x49; // 'I'
  view[2] = 0x46; // 'F'
  view[3] = 0x38; // '8'
  view[4] = 0x39; // '9'
  view[5] = 0x61; // 'a'

  // Fill rest with dummy data
  for (let i = 6; i < size; i++) {
    view[i] = Math.floor(Math.random() * 256);
  }

  return buffer;
};

export const createMockFile = (
  name: string,
  size: number,
  type = "image/gif"
): File => {
  const buffer = createMockGifData(size);
  const blob = new Blob([buffer], { type });
  return new File([blob], name, { type, lastModified: Date.now() });
};

export const createMockLoadedFile = (
  name: string,
  size: number
): LoadedFile => {
  const data = createMockGifData(size);
  const file = createMockFile(name, size);

  return {
    file,
    data,
    size,
  };
};

// Pre-configured mock files for common scenarios
export const mockSmallFile = createMockLoadedFile("small-animation.gif", 50 * 1024); // 50KB
export const mockMediumFile = createMockLoadedFile("medium-animation.gif", 5 * 1024 * 1024); // 5MB
export const mockLargeFile = createMockLoadedFile("large-animation.gif", 50 * 1024 * 1024); // 50MB
export const mockVeryLargeFile = createMockLoadedFile("very-large-animation.gif", 150 * 1024 * 1024); // 150MB

export const mockFileList: LoadedFile[] = [
  createMockLoadedFile("cat.gif", 1.5 * 1024 * 1024),
  createMockLoadedFile("dog.gif", 2.3 * 1024 * 1024),
  createMockLoadedFile("animation.gif", 800 * 1024),
];
