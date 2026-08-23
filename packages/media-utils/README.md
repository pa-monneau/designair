# @recordair/media-utils

Compression/réencodage d'image à l'upload, extrait de Record'air. Deux points d'entrée séparés pour ne jamais bundler `sharp` (binaire natif Node) côté navigateur.

## `@recordair/media-utils/client`

```ts
import { compressImageForUpload } from '@recordair/media-utils/client';

const compressed = await compressImageForUpload(file);
```

Redimensionne et recompresse une image côté navigateur (`<canvas>` → JPEG) avant l'envoi réseau. Best-effort : toute erreur (format non décodable, canvas indisponible) retombe sur le fichier original.

## `@recordair/media-utils/server`

```ts
import { reencodeImageToWebp } from '@recordair/media-utils/server';

const webpBuffer = await reencodeImageToWebp(inputBuffer, { maxDimension: 2400, quality: 82 });
```

Réencode systématiquement un buffer image en WebP (`sharp`), redimensionné si besoin sans jamais agrandir. Garde-fou serveur indépendant de ce que le client a réellement envoyé. Lève une erreur si le buffer n'est pas une image décodable.
