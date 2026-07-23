/**
 * One-off image pipeline: source art in assets/ -> optimized WebP in public/.
 * Re-run with `npm run images` whenever source art changes.
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

// The hero source is only 1456px wide, so there is no useful 2x variant —
// a single native-width WebP is the whole story.
const JOBS = [
  { src: 'assets/kyleskudlarek_hero_image.png', out: 'public/hero.webp', width: 1456, quality: 82 },
  { src: 'assets/kyle.jpg', out: 'public/kyle.webp', width: 900, quality: 82 },
]

await mkdir('public', { recursive: true })

for (const { src, out, width, quality } of JOBS) {
  const info = await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out)
  const kb = (info.size / 1024).toFixed(0)
  console.log(`${out.padEnd(24)} ${info.width}x${info.height}  ${kb} KB`)
}
