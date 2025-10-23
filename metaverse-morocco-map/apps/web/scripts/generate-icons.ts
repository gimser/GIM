import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';

function createIcon(size: number, outPath: string) {
  const png = new PNG({ width: size, height: size });
  // simple gradient with Moroccan-metaverse colors
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;
      const t = x / size;
      // blend emerald to neon violet
      const r = Math.round((14 * (1 - t)) + (124 * t));
      const g = Math.round((159 * (1 - t)) + (58 * t));
      const b = Math.round((110 * (1 - t)) + (237 * t));
      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = 255;
    }
  }
  const buffer = PNG.sync.write(png);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buffer);
}

const root = path.resolve(process.cwd(), 'public', 'icons');
createIcon(192, path.join(root, 'icon-192.png'));
createIcon(512, path.join(root, 'icon-512.png'));
console.log('Icons generated at', root);
