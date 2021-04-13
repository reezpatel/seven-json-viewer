interface Theme {
  name: string;
  color: string;
  pallet: {
    'bg-color': string;
    'accent-color': string;
    'accent-color-light': string;
    'string-color': string;
    'hyperlink-color': string;
    'number-color': string;
    'boolean-color': string;
    'label-color': string;
    'null-color': string;
    'bracket-color': string;
  };
}

const themes: Theme[] = [
  {
    name: 'dracula',
    color: '#1e1e1e',
    pallet: {
      'bg-color': '#1e1e1e',
      'accent-color': '#00cc7d',
      'accent-color-light': '#00cc7e69',
      'string-color': '#d69d85',
      'hyperlink-color': '#d69d85',
      'number-color': '#b5cea8',
      'boolean-color': '#4ec9b0',
      'label-color': '#569cd6',
      'null-color': '#7d8c93',
      'bracket-color': '#ffffff'
    }
  },

  {
    name: 'blush',
    color: '#e1b01b',
    pallet: {
      'bg-color': '#f5f5f5',
      'accent-color': '#e1b01b',
      'accent-color-light': '#00cc7e69',
      'string-color': '#ec8022',
      'hyperlink-color': '#ec8022',
      'number-color': '#284e3e',
      'boolean-color': '#4788d2',
      'label-color': '#569cd6',
      'null-color': '#7d8c93',
      'bracket-color': '#000000'
    }
  }
];

export default themes;

export { Theme };
