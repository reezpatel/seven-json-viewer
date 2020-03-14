import * as React from 'react';
import { JView } from '../JView';

const JArray = ({ label, value, isLast, isOpen }) => {
  const length = value.length;

  return (
    <section>
      {label ? (
        <span>
          <span className="key">"{label}"</span>
          {': '}
          <span className="bracket">{'['}</span>
        </span>
      ) : (
        <span className="bracket">{'['}</span>
      )}
      {isOpen ? (
        value.map((v, i) => (
          <JView
            label={''}
            key={`${v}_${i}`}
            isLast={i + 1 === length}
            value={v}
          />
        ))
      ) : (
        <span>{'.. '}{length} Items{' ..'}</span>
      )}
      <span className="bracket">{']'}</span>
      {!isLast && ','}
    </section>
  );
};

export { JArray };
