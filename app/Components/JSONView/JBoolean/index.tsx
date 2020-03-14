import * as React from 'react';

const JBoolean = ({ label, value, isLast }) => {
  return (
    <section>
      {label && (
        <React.Fragment>
          <span className="key">"{label}"</span>
          {': '}
        </React.Fragment>
      )}
      <span className="boolean">{value ? 'true' : 'false'}</span>
      {!isLast && ','}
    </section>
  );
};

export { JBoolean };
