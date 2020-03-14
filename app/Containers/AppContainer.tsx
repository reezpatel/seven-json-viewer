import * as React from 'react';
import { JSONView } from '../Components/JSONView';
import { useDebounce } from '../Utils/DebounceHook';

const AppContainer = () => {
  const [jsonPath, setJsonPath] = React.useState('');
  const path = useDebounce(jsonPath, 500);

  const handleJSONPathInput = e => {
    setJsonPath(e.target.value);
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <JSONView initialJSON={window.json} path={path} />
      </div>
      <div className="app-toolbar">
        <input
          className="json-path-input"
          placeholder="$.theater[*].movies"
          type="text"
          onChange={handleJSONPathInput}
          value={jsonPath}
        />
        {/* <button
          className="button btn-clear popup popup-top"
          data-popup="Add to Left Compare"
        >
          <IoIosReturnLeft />
        </button>
        <button
          className="button btn-clear popup popup-top"
          data-popup="Add to Right Compare"
        >
          <IoIosReturnRight />
        </button> */}
        {/* <button
          className="button btn-clear popup popup-top"
          data-popup="Change Theme"
        >
          <FaPalette />
        </button> */}
        {/* <button className="button btn-clear popup popup-top" data-popup="Save">
          <FaRegSave />
        </button>
        <button
          className="button btn-clear popup popup-top"
          data-popup="History"
        >
          <AiOutlineHistory />
        </button> */}
      </div>
    </div>
  );
};

export { AppContainer };
