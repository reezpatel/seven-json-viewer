interface LineOptions {
  keyQuotes?: boolean;
  valueQuotes?: boolean;
  keyClass?: string;
  valueClass?: string;
}

const getKeyString = ({
  key,
  addQuotes,
  className
}: {
  key?: string;
  addQuotes?: boolean;
  className?: string;
}) => {
  if (!key) {
    return `<span class="key"></span>`;
  }

  let str = key;

  if (addQuotes) {
    str = `"${str}"`;
  }

  return `</span><span class="key">${str}</span>: `;
};

const getValueString = ({
  value,
  addQuotes,
  className
}: {
  value: string;
  addQuotes?: boolean;
  className: string;
}) => {
  let str = value;

  if (addQuotes) {
    str = `"${str}"`;
  }

  return `<span class="value ${className}">${str}</span>`;
};

const getLine = (
  key,
  value,
  level,
  options: LineOptions = {
    keyQuotes: true,
    valueQuotes: true,
    valueClass: '',
    keyClass: ''
  }
): string => {
  const keyString = getKeyString({
    key,
    addQuotes: options.keyQuotes,
    className: options.keyClass
  });
  const valueString = getValueString({
    value,
    addQuotes: options.valueQuotes,
    className: options.valueClass
  });

  return `<section>
    <code>${keyString} ${valueString}</code>
  </section>`;
};

const getHTML = (key: string, data: any, level: number = 0): string => {
  if (typeof data === 'string') {
    return getLine(key, data, level, {
      valueClass: 'string',
      keyQuotes: true,
      valueQuotes: true
    });
  } else if (typeof data === 'number') {
    return getLine(key, data, level, { valueClass: 'number', keyQuotes: true });
  } else if (typeof data === 'boolean') {
    return getLine(key, data, level, {
      valueClass: 'boolean',
      keyQuotes: true
    });
  } else if (Array.isArray(data)) {
    return [
      `<section><span class="coll-start open"></span>`,
      getLine(key, '[', level, {
        valueClass: 'bracket',
        keyQuotes: true,
        keyClass: 'coll-start'
      }),
      `<a class="hint">${data.length} items </a>`,
      ...data.map(d => getHTML('', d, level + 1)),
      getLine('', ']', level, {
        valueClass: 'bracket',
        keyQuotes: true,
        keyClass: 'coll-end'
      }),
      '</section>'
    ].join('');
  } else if (typeof data === 'object') {
    return [
      `<section><span class="coll-start open"></span>`,
      getLine(key, '{', level, {
        valueClass: 'bracket',
        keyQuotes: true,
        keyClass: 'coll-start'
      }),
      `<a class="hint">${Object.keys(data).length} items </a>`,
      ...Object.keys(data).map(key => getHTML(key, data[key], level + 1)),
      getLine('', '}', level, {
        valueClass: 'bracket',
        keyQuotes: true,
        keyClass: 'coll-end'
      }),
      '</section>'
    ].join('');
  }

  return JSON.stringify(data);
};

const renderJSONViewer = (element: HTMLElement, json: any): void => {
  element.innerHTML = getHTML('', json);
};

export { renderJSONViewer };
