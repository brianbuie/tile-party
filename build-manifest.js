/*
	Generate icons and populate manifest with theme values
*/

import iconGen from 'icon-gen';
import fs from 'fs';
import manifest from './client/assets/manifest';
import theme from './client/ui/theme';

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

  manifest.icons = manifestSizes.map((size) => ({
    src: `/icons/favicon-${size}.png`,
    type: `image/png`,
    sizes: `${size}x${size}`,
  }));

  manifest.background_color = theme.colors.purple;
  manifest.theme_color = theme.browserTheme;

  fs.writeFileSync('./client/assets/manifest.json', JSON.stringify(manifest, null, 2));
})();
