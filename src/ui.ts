import { handleSelection } from './events';

export function createPreview(fontName: string) {
  const previewText = document.getElementById('preview-text') as HTMLInputElement;
  const fontPreview = document.createElement('div');

  fontPreview.className = 'font-preview';
  fontPreview.style.fontFamily = fontName;
  fontPreview.title = fontName;
  fontPreview.textContent = previewText.value;
  fontPreview.style.display = 'none';

  const fontList = document.getElementById('font-list') as HTMLElement;
  fontList.appendChild(fontPreview);

  fontPreview.addEventListener('click', () => {
    handleSelection(fontPreview);
  });
}

export function updatePreviews(text: string) {
  document.title = text;

  const previews = document.querySelectorAll('.font-preview') as NodeListOf<HTMLElement>;
  previews.forEach(preview => {
    // TODO: Prevent redundant runs
    preview.textContent = text;
  });
}

export function filterFonts(query: string = '') {
  query = query.toLowerCase();

  const fontItems = document.querySelectorAll('#font-list .font-preview') as NodeListOf<HTMLElement>;
  fontItems.forEach(item => {
    const fontName = item.title.toLowerCase();

    if (fontName.includes(query)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
