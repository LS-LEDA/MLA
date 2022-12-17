const Store = require('electron-store');

const schema = {
  general: {
    type: 'object',
    properties: {
      gpu: { type: 'boolean' },
      openOnStartup: { type: 'boolean' },
      tray: { type: 'boolean' },
      ai: { type: 'boolean' },
    },
    default: {
      gpu: true,
      openOnStartup: true,
      tray: true,
    },
  },
  theme: {
    type: 'object',
    properties: {
      mode: {
        type: 'string',
        enum: ['dark', 'light', 'system'],
        default: 'light',
      },
      selectedThemeID: {
        type: 'number',
        default: 0,
      },
      themes: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          colours: {
            type: 'array',
            items: {
              type: 'string',
            },
            // TODO: Add default theme
            default: [],
          },
          default: {},
        },
      },
    },
    default: {},
  },
  ai: {
    type: 'object',
    properties: {
      word_reference: {
        type: 'object',
        default: {},
      },
      emotions: {
        type: 'array',
        default: [],
      },
      all_words: {
        type: 'array',
        default: [],
      },
    },
    default: {},
  },
};

// MLA Settings
const config = new Store({ schema });

export default config;
