import * as React from 'react';
import { JArray } from '../JArray';
import { JString } from '../JString';
import { JBoolean } from '../JBoolean';
import { JNumber } from '../JNumber';
import { JObject } from '../JObject';
import { JBlock } from '../JBlock';

const getView = (label, value, isLast, isOpen) => {
  if (Array.isArray(value)) {
    return (
      <JArray label={label} value={value} isLast={isLast} isOpen={isOpen} />
    );
  }

  if (value !== null && typeof value === 'object') {
    return (
      <JObject label={label} value={value} isLast={isLast} isOpen={isOpen} />
    );
  }

  if (typeof value === 'number') {
    return <JNumber label={label} value={value} isLast={isLast} />;
  }

  if (typeof value === 'boolean') {
    return <JBoolean label={label} value={value} isLast={isLast} />;
  }

  return <JString label={label} value={value} isLast={isLast} />;
};

const JView = ({ label, value, isLast }) => {
  const [active, setActive] = React.useState(false);

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setActive(!active);
  };

  return (
    <JBlock
      onArrowClick={handleClick}
      active={active}
      collapsible={typeof value === 'object'}
      copyData={label ? { [label]: value } : value}
    >
      {getView(label, value, isLast, !active)}
    </JBlock>
  );
};

export { JView };
