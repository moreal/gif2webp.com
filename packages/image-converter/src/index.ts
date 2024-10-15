import Vips from "wasm-vips"

export async function convertImage(data: ArrayBuffer): Promise<Uint8Array> {
  const vips = await Vips({
    dynamicLibraries: [],
  });
  const image = vips.Image.newFromBuffer(data, "[n=-1]");
  const thumbnail = vips.Image.thumbnailBuffer(data, image.width, {
    height: image.height,
    option_string: "[n=-1]"
  });
  const delays = thumbnail.getArrayInt('delay');
  const copied = thumbnail.copy();
  copied.setArrayInt('delay', delays);
  return copied.writeToBuffer('.webp');
}
