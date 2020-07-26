import * as React from 'react';

const JString = ({ label, value, isLast }) => {
  return (
    <section>
      {label && (
        <React.Fragment>
          <span className="key">"{label}"</span>
          {': '}
        </React.Fragment>
      )}
      {value === null ? (
        <span className="null">null</span>
      ) : (
        <span className="string">"{value}"</span>
      )}
      {!isLast && ','}
    </section>
  );
};

export { JString };
