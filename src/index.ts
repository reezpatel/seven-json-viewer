import { renderJSONViewer } from './lib/json-view';
import { JSONPath } from 'jsonpath-plus';

const JSON_COPY_MESSAGE = 'JSON Copied!!';

const init = (_json: any) => {
  let _originalJSON = _json;
  let _currentJSON = _originalJSON;

  const renderJSON = (element: HTMLElement, data: any) => {
    _currentJSON = data;
    renderJSONViewer(element, data);
  };

  const jsonContainer = document.getElementById('json-placeholder');
  renderJSON(jsonContainer, _originalJSON);
  const copyJSON = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).catch(e => {
      console.error('Failed to Copy JSON', e);
    });
  };

  const metaHintDOM = document.getElementById('hint-text');

  document.onclick = e => {
    const element = e.target as HTMLElement;
    if (element.classList.contains('coll-start')) {
      element.classList.toggle('open');
      element.parentElement.classList.toggle('hidden');
    }
  };

  document.getElementById('json-copy').onclick = () => {
    metaHintDOM.innerText = JSON_COPY_MESSAGE;
    metaHintDOM.classList.add('visible');
    copyJSON(_currentJSON);
    setTimeout(() => {
      metaHintDOM.classList.remove('visible');
    }, 1000);
  };

  document.getElementById('json-path-input').oninput = (e: KeyboardEvent) => {
    const element = e.target as HTMLInputElement;
    const jPath = element.value;

    let _json: any = _originalJSON;

    if (jPath) {
      try {
        _json = JSONPath({ path: jPath, json: _json }); //.query(_originalJSON, jPath);
      } catch (_) {
        return;
      }
    }
    renderJSON(jsonContainer, _json);
  };
};

window.onload = () => {
  const stylesURL = chrome.runtime.getURL('/styles.css');

  let _data = {};
  try {
    _data = JSON.parse(document.body.innerText);
    document.getElementsByTagName('html')[0].innerHTML = `
    <head><link rel="stylesheet" href="${stylesURL}" /></head>
    <body><div class="json-container">
    <div id="json-placeholder"></div>
  </div>
  <footer>
    <div class="jpath-container">
      <input type="text" id="json-path-input" placeholder="JSON Path" />
    </div>
    <div class="meta-container">
      <span class="copy-hint" id="hint-text"></span>
      <span id="json-copy">📝</span>
    </div>
  </footer></body>`;
    init(_data);
  } catch (_) {
    return;
  }
};
