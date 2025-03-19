// convert-assets.js
// This script converts SVG assets to follow Plasmo's naming conventions
// Requires Node.js and sharp package

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Function to convert SVG to PNG
async function convertSvgToPng(svgPath, outputPath, size) {
  try {
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(outputPath);
      
    console.log(`Created ${outputPath}`);
  } catch (error) {
    console.error(`Error converting ${svgPath} to PNG:`, error);
  }
}

// Create Plasmo icon file
async function createPlasmoIcons() {
  const iconSvgPath = path.join(__dirname, 'icon.svg');
  
  // Make sure SVG file exists
  if (!fs.existsSync(iconSvgPath)) {
    console.error('Icon SVG file not found. Please save the SVG content to icon.svg first.');
    return;
  }
  
  // Create the main ~icons.png file for Plasmo (512x512)
  const plasmoIconPath = path.join(__dirname, '~icons.png');
  await convertSvgToPng(iconSvgPath, plasmoIconPath, 512);
  
  // Optionally create the .plasmo/gen-assets directory and icons
  const plasmoAssetsDir = path.join(__dirname, '.plasmo', 'gen-assets');
  if (!fs.existsSync(plasmoAssetsDir)) {
    fs.mkdirSync(plasmoAssetsDir, { recursive: true });
  }
  
  // Create icon files in Plasmo's expected location and format
  const iconSizes = [16, 32, 48, 64, 128];
  for (const size of iconSizes) {
    const outputPath = path.join(plasmoAssetsDir, `icon${size}.plasmo.png`);
    await convertSvgToPng(iconSvgPath, outputPath, size);
  }
  
  // Create donation banners
  const assetsDir = path.join(__dirname, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  const buymeacoffeeSvgPath = path.join(__dirname, 'buymeacoffee.svg');
  const patreonSvgPath = path.join(__dirname, 'patreon.svg');
  
  if (fs.existsSync(buymeacoffeeSvgPath)) {
    await convertSvgToPng(
      buymeacoffeeSvgPath, 
      path.join(assetsDir, 'buymeacoffee.png'), 
      24
    );
  }
  
  if (fs.existsSync(patreonSvgPath)) {
    await convertSvgToPng(
      patreonSvgPath, 
      path.join(assetsDir, 'patreon.png'), 
      24
    );
  }
  
  console.log('\nAll assets converted successfully!');
  console.log('✅ ~icons.png created in project root (for Plasmo)');
  console.log('✅ Icon files created in .plasmo/gen-assets/');
  console.log('✅ Donation banner assets created in assets/');
}

// Run the conversion
createPlasmoIcons().catch(console.error);