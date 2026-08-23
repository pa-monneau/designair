import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { reencodeImageToWebp } from '../../packages/media-utils/src/server';

const makePngBuffer = (width: number, height: number): Promise<Buffer> =>
  sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 200, g: 50, b: 50 },
    },
  })
    .png()
    .toBuffer();

// Bruit aléatoire : une couleur plate compresse au même poids quelle que
// soit la qualité WebP (rien à perdre), il faut du détail pour que le
// paramètre ait un effet mesurable.
const makeNoisyPngBuffer = (width: number, height: number): Promise<Buffer> => {
  const raw = Buffer.from(
    Array.from({ length: width * height * 3 }, () => Math.floor(Math.random() * 256)),
  );
  return sharp(raw, { raw: { width, height, channels: 3 } }).png().toBuffer();
};

describe('reencodeImageToWebp', () => {
  it('réencode systématiquement en WebP', async () => {
    const input = await makePngBuffer(100, 100);

    const output = await reencodeImageToWebp(input);
    const metadata = await sharp(output).metadata();

    expect(metadata.format).toBe('webp');
  });

  it('redimensionne une image plus grande que la dimension max, ratio conservé', async () => {
    const input = await makePngBuffer(4000, 2000);

    const output = await reencodeImageToWebp(input, { maxDimension: 1000 });
    const metadata = await sharp(output).metadata();

    expect(metadata.width).toBe(1000);
    expect(metadata.height).toBe(500);
  });

  it("ne grossit jamais une image déjà plus petite que la dimension max", async () => {
    const input = await makePngBuffer(200, 100);

    const output = await reencodeImageToWebp(input, { maxDimension: 2400 });
    const metadata = await sharp(output).metadata();

    expect(metadata.width).toBe(200);
    expect(metadata.height).toBe(100);
  });

  it('applique la qualité WebP demandée', async () => {
    const input = await makeNoisyPngBuffer(300, 300);

    const highQuality = await reencodeImageToWebp(input, { quality: 90 });
    const lowQuality = await reencodeImageToWebp(input, { quality: 10 });

    expect(lowQuality.byteLength).toBeLessThan(highQuality.byteLength);
  });

  it('lève une erreur sur un buffer non décodable', async () => {
    const input = Buffer.from('ceci n\'est pas une image');

    await expect(reencodeImageToWebp(input)).rejects.toThrow();
  });
});
