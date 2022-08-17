/*
	Generate icons and populate manifest
*/
import iconGen from 'icon-gen';
import fs from 'fs';

(async () => {
  const publicDir = './public';
  const subDirName = 'icons';
  const srcIcon = `${publicDir}/icon.svg`;
  const outDir = `${publicDir}/${subDirName}`;
  const manifestSizes = [64, 128, 144, 192, 512];

  // Icons for manifest
  await iconGen(srcIcon, outDir, {
    report: true,
    favicon: {
      name: 'favicon-',
      pngSizes: manifestSizes,
    },
  }).catch(() => null);

  // Icons for Apple
  await iconGen(srcIcon, outDir, {
    report: true,
    favicon: {
      name: 'apple-touch-icon-',
      pngSizes: [180],
    },
  }).catch(() => null);

  // Favicon in root directory for non-html requests
  fs.copyFileSync(`${outDir}/favicon-64.png`, `${publicDir}/favicon.ico`);

  // Apple prefers this in root directory as well
  fs.copyFileSync(`${outDir}/apple-touch-icon-180.png`, `${publicDir}/apple-touch-icon.png`);

  const manifest = {
    short_name: 'Tile Party',
    theme_color: '#261741',
    background_color: '#261741',
    start_url: '/',
    display: 'fullscreen',
    icons: manifestSizes.map(size => ({
      src: `/${subDirName}/favicon-${size}.png`,
      type: `image/png`,
      sizes: `${size}x${size}`,
    })),
  };

  fs.writeFileSync(`${publicDir}/manifest.json`, JSON.stringify(manifest, null, 2));
})();
