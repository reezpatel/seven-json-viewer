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
      <span className="string">"{value}"</span>
      {!isLast && ','}
    </section>
  );
};

export { JString };
