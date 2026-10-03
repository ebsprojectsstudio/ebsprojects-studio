import sharp from 'sharp';
import type { ImageMetadata } from 'astro';

/**
 * The colours along the top and bottom edges of a photograph, read at build
 * time. Used to fill the space around a photograph shown whole, so the
 * margins read as more of its own background rather than as bars.
 *
 * Returns null when the source file cannot be read (a remote image, say);
 * callers fall back to plain black.
 */
export async function edgeColors(img: ImageMetadata): Promise<{ top: string; bottom: string } | null> {
  // Local images carry their source path, though not as an enumerable key.
  const path = (img as ImageMetadata & { fsPath?: string }).fsPath;
  if (!path) return null;
  try {
    const size = 16;
    const { data } = await sharp(path)
      .resize(size, size, { fit: 'fill' })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const row = (y: number) => {
      let r = 0, g = 0, b = 0;
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 3;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      return `rgb(${Math.round(r / size)}, ${Math.round(g / size)}, ${Math.round(b / size)})`;
    };
    return { top: row(0), bottom: row(size - 1) };
  } catch {
    return null;
  }
}
