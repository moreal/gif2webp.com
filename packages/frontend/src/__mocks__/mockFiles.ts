import type { LoadedFile } from "../utils/fileUtils";
// Import real GIF file using Vite's asset handling
import catsGifUrl from "./cats_move.gif?url";

// Load real GIF data from the actual file
const loadRealGifData = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load GIF file: ${response.statusText}`);
  }
  return await response.arrayBuffer();
};

export const createMockFile = async (
  name: string,
  type = "image/gif"
): Promise<File> => {
  const buffer = await loadRealGifData(catsGifUrl);
  const blob = new Blob([buffer], { type });
  return new File([blob], name, { type, lastModified: Date.now() });
};

export const createMockLoadedFile = async (
  name: string
): Promise<LoadedFile> => {
  const data = await loadRealGifData(catsGifUrl);
  const file = await createMockFile(name);

  return {
    file,
    data,
    size: data.byteLength,
  };
};

// Pre-configured mock files for common scenarios
// These are Promises that resolve to LoadedFile - use with await
// All use the real cats_move.gif file
export const mockSmallFile = createMockLoadedFile("small-animation.gif");
export const mockMediumFile = createMockLoadedFile("medium-animation.gif");
export const mockLargeFile = createMockLoadedFile("large-animation.gif");
export const mockVeryLargeFile = createMockLoadedFile("very-large-animation.gif");

// Mock using the actual cats_move.gif file
export const mockCatsFile = createMockLoadedFile("cats_move.gif");

// Helper function to create a list of mock files
export const createMockFileList = async (): Promise<LoadedFile[]> => {
  return Promise.all([
    createMockLoadedFile("cat.gif"),
    createMockLoadedFile("dog.gif"),
    createMockLoadedFile("animation.gif"),
  ]);
};
