import * as React from 'react';

const JNumber = ({ label, value, isLast }) => {
  return (
    <section>
      {label && (
        <React.Fragment>
          <span className="key">"{label}"</span>
          {': '}
        </React.Fragment>
      )}
      <span className="number">{value}</span>
      {!isLast && ','}
    </section>
  );
};

export { JNumber };
