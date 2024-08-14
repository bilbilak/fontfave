import JSZip from 'jszip';
import { createPreview, filterFonts } from './ui';
import { pause } from './utils';

export async function loadFonts() {
  const archive = await downloadFonts();
  const fonts = Object.keys(archive.files);

  for (let i = 0; i < fonts.length; i++) {
    const font = fonts[i];
    const [fontName, fontExtension] = font.split(/\.(?=[^.]+$)/);

    let fontFormat;

    switch (fontExtension) {
      case 'ttf':
        fontFormat = 'truetype';
        break;
      case 'otf':
        fontFormat = 'opentype';
        break;
      case 'woff2':
        fontFormat = 'woff2';
        break;
      default:
        console.error(`${fontExtension} format is not supported`);
        continue;
    }

    const fontFile = archive.files[font];
    const fontBlob = await fontFile.async('blob');
    const fontFace = new FontFace(fontName, `url(${URL.createObjectURL(fontBlob)}) format('${fontFormat}')`);

    try {
      await fontFace.load();
    } catch (error) {
      console.error('Failed loading fonts: ', error);
    }

    document.fonts.add(fontFace);

    createPreview(fontName);
    filterFonts();

    await pause(50);
  }
}

async function downloadFonts() {
  const loader = document.getElementById('loader') as HTMLElement;
  const response = await fetch('/fonts.zip');
  const zipBlob = await response.blob();
  const zipFile = await JSZip.loadAsync(zipBlob);

  loader.style.display = 'none';

  return zipFile;
}
