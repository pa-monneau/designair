import sharp from 'sharp';

const DEFAULT_MAX_DIMENSION = 2400;
const DEFAULT_WEBP_QUALITY = 82;

type ReencodeImageToWebpOptions = {
  maxDimension?: number;
  quality?: number;
};

/**
 * Réencode systématiquement une image en WebP, redimensionnée si besoin
 * (jamais agrandie, `withoutEnlargement`). Garde-fou serveur indépendant de
 * ce que le client a réellement envoyé — une compression navigateur en
 * amont (`./client`) est best-effort, pas fiable à 100 % selon device.
 * Lève si le buffer n'est pas une image décodable ; à l'appelant de
 * traduire l'erreur en réponse adaptée.
 */
export const reencodeImageToWebp = async (
  input: Buffer,
  options: ReencodeImageToWebpOptions = {},
): Promise<Buffer> => {
  const maxDimension = options.maxDimension ?? DEFAULT_MAX_DIMENSION;
  const quality = options.quality ?? DEFAULT_WEBP_QUALITY;

  return sharp(input)
    .rotate()
    .resize({
      width: maxDimension,
      height: maxDimension,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toBuffer();
};
