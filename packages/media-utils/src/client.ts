const MAX_DIMENSION = 2400;
const JPEG_QUALITY = 0.85;
// En dessous de ce poids, pas la peine de re-encoder (coût CPU pour un gain négligeable).
const SKIP_BELOW_BYTES = 800 * 1024;

/**
 * Redimensionne + recompresse une image côté navigateur avant upload (canvas
 * → JPEG). Best-effort : toute erreur (format non décodable, canvas
 * indisponible) retombe sur le fichier original ; un réencodage serveur
 * (`./server`) reste le garde-fou final indépendant de ce résultat.
 */
export const compressImageForUpload = async (file: File): Promise<File> => {
  if (file.size <= SKIP_BELOW_BYTES) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
    );
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg' });
  } catch {
    return file;
  }
};
