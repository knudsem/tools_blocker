# Assets Setup Guide

This guide will help you set up the assets for your Canva Pro Assets Hider extension.

## Assets Overview

The extension requires the following assets:
- Extension icon in multiple sizes (16px, 48px, 128px)
- Buy Me a Coffee logo
- Patreon logo

## Setup Instructions

### 1. Save the SVG files

Save each SVG provided to the root of your project:
- Save the extension icon SVG as `icon.svg`
- Save the Buy Me a Coffee logo SVG as `buymeacoffee.svg`
- Save the Patreon logo SVG as `patreon.svg`

### 2. Install dependencies

```bash
npm install
```

### 3. Convert SVGs to PNGs

Run the conversion script:

```bash
npm run convert-assets
```

This will:
- Create the `assets` directory if it doesn't exist
- Convert the icon SVG to PNG files in different sizes (16px, 48px, 128px)
- Convert the donation logos to PNG

### 4. Verify assets

Check that the following files have been created in the `assets` directory:
- `icon-16.png`
- `icon-48.png`
- `icon-128.png`
- `buymeacoffee.png`
- `patreon.png`

### 5. Manual conversion (if needed)

If you encounter issues with the conversion script, you can manually convert the SVG files using:

#### Online tools:
- [SVGOMG](https://jakearchibald.github.io/svgomg/)
- [SVG to PNG Converter](https://svgtopng.com/)

#### Desktop applications:
- Inkscape
- Adobe Illustrator
- GIMP
- Photoshop

Save the converted files in the appropriate sizes to the `assets` directory.

## Customizing Assets

Feel free to modify the SVG files to better match your branding:
- Change colors
- Adjust designs
- Replace with your own icons

After modifying the SVG files, run the conversion script again to update the PNG files.
