import * as React from 'react';
import themes, { Theme } from '../data/themes';
import DeleteIcon from '../Icons/delete';
import BookmarkIcon from '../Icons/bookmark';

const AppContainer = () => {
  const [activeTheme, setTheme] = React.useState('dracula');
  const [isHistoryEnabled, setHistoryEnabled] = React.useState(true);
  const [history, setHistory] = React.useState([]);

  const toggleHistory = () => {
    setHistoryEnabled(!isHistoryEnabled);
  };

  const changeTheme = (theme: Theme) => () => {
    chrome.storage.sync.set({ pallet: theme }, () => {
      setTheme(theme.name);
    });
  };

  React.useEffect(() => {
    chrome.storage.sync.get(['pallet'], (t) => {
      if (!t || !t.pallet) {
        return;
      }
      setTheme(t.pallet.name);
    });
  }, []);

  return (
    <div id="seven-json-viewer-popup">
      <header>
        <div className="icon"></div>
        <div className="header-content">
          <h1>Seven JSON Viewer</h1>
          <h3>Minimal JSON Viewer with JSON Path</h3>
        </div>
      </header>

      <div className="row theme">
        <p>Theme</p>
        <div className="color-pallets">
          <ul>
            {themes.map((theme) => (
              <li key={theme.name}>
                <a
                  className={
                    'color-circle ' +
                    (activeTheme === theme.name ? 'active' : '')
                  }
                  style={{ backgroundColor: theme.color }}
                  onClick={changeTheme(theme)}
                ></a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="row history">
        <div className="heading">
          <p>History (Coming Soon)</p>
          <div
            className={'toggle ' + (isHistoryEnabled ? 'on' : 'off')}
            onClick={toggleHistory}
          >
            {isHistoryEnabled ? 'on' : 'off'}
          </div>
        </div>

        <div className="item-container">
          <ul className="history-list">
            {history.map((i, _) => (
              <li className="history-item" key={_}>
                <div className="icon"></div>
                <p>JSON Text</p>
                <div className="actions">
                  <a className="bookmark active ">
                    <BookmarkIcon></BookmarkIcon>
                  </a>
                  <a className="delete warn">
                    <DeleteIcon></DeleteIcon>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer>
        <a>Send Feedback</a>
        <a>Home</a>
      </footer>
    </div>
  );
};

export { AppContainer };
