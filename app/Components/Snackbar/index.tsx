import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EventContext } from '../../Context/EventsBusContext';

const STATE_OPEN = 'open';
const STATE_OPENED = '';
const STATE_CLOSE = 'close';

const SnackbarItem = ({ type, message, _id, onRemove }) => {
  const [state, setState] = React.useState(STATE_OPEN);

  setTimeout(() => {
    setState(STATE_CLOSE);
  }, 4000);

  setTimeout(() => {
    setState(STATE_OPENED);
  }, 3000);

  setTimeout(() => {
    onRemove(_id);
  }, 4500);

  return (
    <div className={`snackbar-item ${type} ${state}`}>
      <span>{message}</span>
    </div>
  );
};

const Snackbar = () => {
  const events = React.useContext(EventContext);
  const [items, setItems] = React.useState([]);

  const removeItem = _id => {
    setItems(items.filter(item => item._id !== _id));
  };

  events.on('message', ({ type, message, _id }) => {
    setItems([...items, { type, message, _id }]);
  });

  if (items.length) {
    const element = document.createElement('div');
    document.getElementById('snackbar').appendChild(element);

    return ReactDOM.createPortal(
      items.map(item => (
        <SnackbarItem key={item._id} {...item} onRemove={removeItem} />
      )),
      element
    );
  }

  return <React.Fragment />;
};

export { Snackbar };
