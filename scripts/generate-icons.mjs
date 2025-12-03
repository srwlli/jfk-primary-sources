import sharp from 'sharp'
import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public', 'icons')

// Ensure directory exists
mkdirSync(publicDir, { recursive: true })

// SVG template for the icon
const createSVG = (size, maskable = false) => {
  const padding = maskable ? size * 0.15 : 0
  const innerSize = size - padding * 2
  const fontSize = Math.floor(innerSize * 0.38)
  const borderRadius = maskable ? 0 : Math.floor(size * 0.18)
  const offsetX = padding
  const offsetY = padding

  return Buffer.from(`<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4A55A2"/>
      <stop offset="100%" style="stop-color:#3A4592"/>
    </linearGradient>
  </defs>
  ${maskable ? `<rect width="${size}" height="${size}" fill="#4A55A2"/>` : ''}
  <rect x="${offsetX}" y="${offsetY}" width="${innerSize}" height="${innerSize}" rx="${borderRadius}" fill="url(#bg)"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="bold" fill="white">JFK</text>
</svg>`)
}

// Generate icons
const icons = [
  { name: 'icon-192.png', size: 192, maskable: false },
  { name: 'icon-512.png', size: 512, maskable: false },
  { name: 'icon-maskable-192.png', size: 192, maskable: true },
  { name: 'icon-maskable-512.png', size: 512, maskable: true },
  { name: 'apple-touch-icon.png', size: 180, maskable: false },
]

async function generateIcons() {
  for (const { name, size, maskable } of icons) {
    const svg = createSVG(size, maskable)
    const path = join(publicDir, name)

    await sharp(svg)
      .png()
      .toFile(path)

    console.log(`✓ Created: ${name}`)
  }

  // Also create apple-touch-icon in public root
  const appleSvg = createSVG(180, false)
  await sharp(appleSvg)
    .png()
    .toFile(join(__dirname, '..', 'public', 'apple-touch-icon.png'))
  console.log(`✓ Created: apple-touch-icon.png (in public root)`)

  console.log('\n✅ All icons generated successfully!')
}

generateIcons().catch(console.error)
