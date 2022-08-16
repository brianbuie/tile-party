/*
	Generate icons and populate manifest
*/

import iconGen from 'icon-gen';
import fs from 'fs';

const manifest = {
  short_name: 'Tile Party',
  theme_color: '#261741',
  background_color: '#261741',
  start_url: '/',
  display: 'fullscreen',
};

(async () => {
  const srcIcon = './client/assets/icon.svg';
  const outDir = './client/assets/icons';
  const manifestSizes = [64, 128, 144, 192, 512];

  // Icons for manifest
  await iconGen(srcIcon, outDir, {
    report: true,
    favicon: {
      name: 'favicon-',
      pngSizes: manifestSizes,
    },
  }).catch(() => null);

  fs.copyFileSync(`${outDir}/favicon-64.png`, './client/assets/favicon.ico');

  // Icons for Apple
  await iconGen(srcIcon, outDir, {
    report: true,
    favicon: {
      name: 'apple-touch-icon-',
      pngSizes: [180],
    },
  }).catch(() => null);

  fs.copyFileSync(`${outDir}/apple-touch-icon-180.png`, './client/assets/apple-touch-icon.png');

  manifest.icons = manifestSizes.map(size => ({
    src: `/icons/favicon-${size}.png`,
    type: `image/png`,
    sizes: `${size}x${size}`,
  }));

  fs.writeFileSync('./client/assets/manifest.json', JSON.stringify(manifest, null, 2));
})();
