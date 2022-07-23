import JSONViewer from '../lib/json-viewer/index.svelte';

window.onload = () => {
  try {
    const _data = JSON.parse(document.body.textContent.trim());
    document.body.innerHTML = '';

    if (chrome.runtime) {
      new JSONViewer({
        target: document.body,
        props: {
          json: _data
        }
      });

      chrome.storage.sync.get(['pallet'], ({ pallet: theme }) => {
        if (!theme || !theme.pallet) {
          return;
        }

        Object.keys(theme.pallet).forEach((name) => {
          const color = theme.pallet[name];
          document.documentElement.style.setProperty(`--${name}`, color);
        });
      });
    }
    // tslint:disable-next-line: no-empty
  } catch (_) {
    // console.log(_);
  }
};
