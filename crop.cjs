const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
    const metadata = await sharp('assets/icon.jpg').metadata();
    const size = Math.min(metadata.width, metadata.height);

    // We'll create a square image with a white background first
    await sharp('assets/icon.jpg')
        .resize(size, size, { fit: 'cover' })
        .toFile('assets/icon_square.png');

    // Now create the circular version with transparency
    const radius = size / 2;
    const circleSvg = `
    <svg width="${size}" height="${size}">
      <circle cx="${radius}" cy="${radius}" r="${radius}" fill="white"/>
    </svg>
  `;

    await sharp('assets/icon_square.png')
        .composite([{
            input: Buffer.from(circleSvg),
            blend: 'dest-in'
        }])
        .toFile('assets/icon.png');

    // Cleanup
    if (fs.existsSync('assets/icon_square.png')) {
        fs.unlinkSync('assets/icon_square.png');
    }

    console.log('Successfully updated assets/icon.png from icon.jpg');
}

processImage().catch(err => {
    console.error(err);
});
