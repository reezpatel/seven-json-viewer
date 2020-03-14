import * as React from 'react';
import { JView } from '../JView';

const JObject = ({ label, value, isLast, isOpen }) => {
  const entries = Object.entries(value);
  const length = entries.length;

  return (
    <section>
      {label ? (
        <span>
          <span className="key">"{label}"</span>
          {': '}
          <span className="bracket">{'{'}</span>
        </span>
      ) : (
        <span className="bracket">{'{'}</span>
      )}
      {isOpen ? (
        entries.map(([key, value], index) => (
          <JView
            label={key}
            key={key}
            value={value}
            isLast={index + 1 === length}
          />
        ))
      ) : (
        <span>
          {'.. '}
          {length} Items{' ..'}
        </span>
      )}
      <span className="bracket">{'}'}</span>
      {!isLast && ','}
    </section>
  );
};

export { JObject };
