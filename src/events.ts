import { updatePreviews, filterFonts } from './ui';

export function handleInputChanges() {
  const previewText = document.getElementById('preview-text') as HTMLInputElement;
  previewText.addEventListener('input', () => {
    updatePreviews(previewText.value);
  });

  const fontName = document.getElementById('font-name') as HTMLInputElement;
  fontName.addEventListener('input', () => {
    filterFonts(fontName.value);
  });
}

export function handleSelection(fontPreview: HTMLDivElement, selectionRound: number = 0) {
  const selectionRounds = getSelectionRounds();

  if (fontPreview.classList.contains('selected')) {
    fontPreview.classList.remove('selected');
    clearPreviewsFrom(selectionRound, fontPreview.title);
  } else {
    fontPreview.classList.add('selected');

    const newFontPreview = fontPreview.cloneNode(true) as HTMLDivElement;
    newFontPreview.classList.remove('selected');
    selectionRounds[selectionRound].appendChild(newFontPreview);

    if (selectionRound < 2) {
      newFontPreview.addEventListener('click', () => {
        handleSelection(newFontPreview, selectionRound + 1);
      });
    }
  }
}

function clearPreviewsFrom(selectionRound: number, fontName: string) {
  const selectionRounds = getSelectionRounds();

  for (let i = selectionRound; i < selectionRounds.length; i++) {
    const items = selectionRounds[i].querySelectorAll(`.font-preview[title="${fontName}"]`);

    items.forEach(item => {
      item.remove();
    });
  }
}

function getSelectionRounds() {
  return [
    document.getElementById('selection-round-1'),
    document.getElementById('selection-round-2'),
    document.getElementById('selection-round-3')
  ] as HTMLElement[];
}
