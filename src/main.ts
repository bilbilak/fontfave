import { loadFonts } from './fonts';
import { handleInputChanges } from './events';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="loader">
      <img src="/loader.svg" alt="Loading...">
  </div>
  <div class="row">
      <input type="text" id="preview-text" placeholder="Enter the text..." value="ACME">
  </div>
  <div class="row columns">
      <div class="column">
          <div class="filters">
              <input type="search" id="font-name" placeholder="Search font name...">
          </div>
          <div id="font-list"></div>
      </div>
      <div id="selection-round-1" class="column"></div>
      <div id="selection-round-2" class="column"></div>
      <div id="selection-round-3" class="column"></div>
  </div>
`;

(async () => {
  handleInputChanges();
  await loadFonts();
})();
