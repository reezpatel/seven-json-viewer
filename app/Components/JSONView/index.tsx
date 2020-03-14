import * as React from 'react';
import { JView } from './JView';
import { EventEmitter } from '../../Utils/EventEmitter';
import { EventContext } from '../../Context/EventsBusContext';
import { JSONPath } from 'jsonpath-plus';
import { Snackbar } from '../Snackbar';

const JSONView = ({ initialJSON, path }) => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    if (!path) {
      setData(initialJSON);
    } else {
      setData(JSONPath({ path: path, json: initialJSON }));
    }
  }, [path]);

  return (
    <EventContext.Provider value={new EventEmitter()}>
      <Snackbar />
      <div className="json-view">
        <JView value={data} label={''} isLast={true} />
      </div>
    </EventContext.Provider>
  );
};

export { JSONView };
