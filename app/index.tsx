import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from './Containers/AppContainer';

// ReactDOM.render(<AppContainer />, document.getElementById('root'));
declare global {
  interface Window {
    json: any;
  }
}

window.onload = () => {
  try {
    const _data = JSON.parse(document.body.textContent.trim());
    window.json = _data;

    const root = document.createElement('div');
    root.setAttribute('id', 'root');

    const snackbar = document.createElement('div');
    snackbar.setAttribute('id', 'snackbar');

    document.body.innerHTML = '';
    document.body.appendChild(root);
    document.body.appendChild(snackbar);

    if (chrome.runtime) {
      const stylesURL = chrome.runtime.getURL('styles.css');

      const style = document.createElement('link');
      style.setAttribute('rel', 'stylesheet');
      style.setAttribute('href', stylesURL);
      document.head.append(style);

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

    ReactDOM.render(<AppContainer />, document.getElementById('root'));
    // tslint:disable-next-line: no-empty
  } catch (_) {
    // console.log(_);
  }
};
