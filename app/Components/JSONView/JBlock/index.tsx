import * as React from 'react';
import { MdPlayArrow } from 'react-icons/md';
import { FiGitCommit } from 'react-icons/fi';
import { FaRegClone } from 'react-icons/fa';
import { EventContext } from '../../../Context/EventsBusContext';

const JBlock = ({ children, collapsible, onArrowClick, active, copyData }) => {
  const [selected, setSelected] = React.useState(false);
  const id = React.useRef(Math.random());
  const events = React.useContext(EventContext);

  const handleSectionClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSelected(!selected);
    events.emit('click', id);
  };

  const blockClickEventListener = instance => {
    if (instance !== id) {
      setSelected(false);
    }
  };

  React.useEffect(() => {
    events.on('click', blockClickEventListener);
    return () => {
      events.off('click', blockClickEventListener);
    };
  }, []);

  const handleCopyJSONClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(JSON.stringify(copyData, null, 2))
        .then(() => {
          events.emit('message', {
            type: 'success',
            message: 'JSON copied to clipboard!!!',
            _id: new Date().getTime()
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  return (
    <section
      className={`block ${selected ? 'selected' : ''}`}
      onClick={handleSectionClick}
    >
      {collapsible && (
        <button
          className={`button button-white block--content__left ${
            active ? 'active' : ''
          }`}
          onClick={onArrowClick}
        >
          <MdPlayArrow />
        </button>
      )}
      {children}
      {selected && (
        <div className="block--content__right">
          {/* <button className="button popup popup-below" data-popup="Copy Branch">
            <FiGitCommit />
          </button> */}
          <button
            className="button popup popup-below"
            data-popup="Copy JSON"
            onClick={handleCopyJSONClick}
          >
            <FaRegClone />
          </button>
        </div>
      )}
    </section>
  );
};

export { JBlock };
