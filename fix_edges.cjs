const sharp = require('sharp');
const fs = require('fs');

async function fixIcon() {
    const sourceIcon = '/Users/ananyasingh/Desktop/swadishtz-icon.png';
    const targetIcon = 'assets/icon.png';
    const targetSvg = 'assets/icon.svg';

    console.log('Processing icon to fix straight edges...');

    // 1. Create a perfectly square 1024x1024 PNG with the icon centered
    // Adaptive icons require content to be within the "Safe Zone" (approx 66% center)
    // 600px on a 1024px canvas is ~58%, safe from all mask clipping.
    await sharp(sourceIcon)
        .resize(600, 600, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .extend({
            top: 212, bottom: 212, left: 212, right: 212,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toFile(targetIcon);

    // 2. Create the SVG version of this padded square image
    const pngBuffer = fs.readFileSync(targetIcon);
    const base64Png = pngBuffer.toString('base64');

    const svgContent = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <image width="1024" height="1024" href="data:image/png;base64,${base64Png}" />
</svg>`;

    fs.writeFileSync(targetSvg, svgContent);

    console.log('Successfully created padded square icon at assets/icon.png and assets/icon.svg');
}

fixIcon().catch(err => {
    console.error('Error fixing icon:', err);
    process.exit(1);
});
