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
      ) : isValidHttpUrl(value) ? (
        <span className="hyperlink">"<a href={String(value)} target='_blank'>{value}</a>"</span>
      ) : <span className="string">"{value}"</span>}
      {!isLast && ','}
    </section>
  );
};

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export { JString };
