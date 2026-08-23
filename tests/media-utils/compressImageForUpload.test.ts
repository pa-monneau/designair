import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { compressImageForUpload } from '../../packages/media-utils/src/client';

const SKIP_BELOW_BYTES = 800 * 1024;

const makeFile = (size: number, name = 'photo.png', type = 'image/png'): File =>
  new File([new Uint8Array(size)], name, { type });

const stubBitmap = (width: number, height: number) => {
  const close = vi.fn();
  vi.stubGlobal(
    'createImageBitmap',
    vi.fn(async () => ({ width, height, close })),
  );
  return close;
};

const stubCanvas = (
  outputBlob: Blob | null,
  getContextReturn: object | null = { drawImage: vi.fn() },
) => {
  const drawImage = (getContextReturn as { drawImage?: unknown })?.drawImage;
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
    getContextReturn as unknown as CanvasRenderingContext2D,
  );
  vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (
    this: HTMLCanvasElement,
    callback: BlobCallback,
  ) {
    callback(outputBlob);
  });
  return { drawImage };
};

describe('compressImageForUpload', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('ne touche pas un fichier déjà sous le seuil', async () => {
    const file = makeFile(SKIP_BELOW_BYTES - 1);
    const createImageBitmapSpy = vi.fn();
    vi.stubGlobal('createImageBitmap', createImageBitmapSpy);

    const result = await compressImageForUpload(file);

    expect(result).toBe(file);
    expect(createImageBitmapSpy).not.toHaveBeenCalled();
  });

  it('recompresse et redimensionne une image trop grande, ratio conservé', async () => {
    stubBitmap(4000, 2000);
    const smallBlob = new Blob([new Uint8Array(100)], { type: 'image/jpeg' });
    stubCanvas(smallBlob);
    const file = makeFile(SKIP_BELOW_BYTES + 1);

    const result = await compressImageForUpload(file);

    expect(result.type).toBe('image/jpeg');
    expect(result.name).toBe('photo.jpg');
    expect(result.size).toBe(smallBlob.size);
  });

  it("ne grossit jamais une image déjà plus petite que la dimension max", async () => {
    stubBitmap(800, 600);
    let canvasWidth = 0;
    let canvasHeight = 0;
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      function (this: HTMLCanvasElement) {
        canvasWidth = this.width;
        canvasHeight = this.height;
        return { drawImage: vi.fn() } as unknown as CanvasRenderingContext2D;
      },
    );
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (
      callback: BlobCallback,
    ) {
      callback(new Blob([new Uint8Array(100)], { type: 'image/jpeg' }));
    });
    const file = makeFile(SKIP_BELOW_BYTES + 1);

    await compressImageForUpload(file);

    expect(canvasWidth).toBe(800);
    expect(canvasHeight).toBe(600);
  });

  it('garde le fichier original si le résultat compressé est plus lourd', async () => {
    stubBitmap(4000, 2000);
    const file = makeFile(SKIP_BELOW_BYTES + 1);
    const heavierBlob = new Blob([new Uint8Array(file.size + 1)], {
      type: 'image/jpeg',
    });
    stubCanvas(heavierBlob);

    const result = await compressImageForUpload(file);

    expect(result).toBe(file);
  });

  it('garde le fichier original si le canvas ne fournit aucun contexte 2D', async () => {
    stubBitmap(4000, 2000);
    stubCanvas(null, null);
    const file = makeFile(SKIP_BELOW_BYTES + 1);

    const result = await compressImageForUpload(file);

    expect(result).toBe(file);
  });

  it('garde le fichier original si createImageBitmap échoue (format non décodable)', async () => {
    vi.stubGlobal(
      'createImageBitmap',
      vi.fn(async () => {
        throw new Error('decode failed');
      }),
    );
    const file = makeFile(SKIP_BELOW_BYTES + 1);

    const result = await compressImageForUpload(file);

    expect(result).toBe(file);
  });

  it("garde le fichier original si toBlob renvoie null", async () => {
    stubBitmap(4000, 2000);
    stubCanvas(null);
    const file = makeFile(SKIP_BELOW_BYTES + 1);

    const result = await compressImageForUpload(file);

    expect(result).toBe(file);
  });
});
