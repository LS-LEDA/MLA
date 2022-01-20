const Store = require('electron-store');

const schema = {
    general: {
        type: 'object',
        properties: {
            gpu: { type: 'boolean' },
            openOnStartup: { type: 'boolean' },
            tray: { type: 'boolean' },
        },
        default: {
            gpu: true,
            openOnStartup: false,
            tray: true,
        }
    },
    theme: {
        type: 'object',
        properties: {
            modes: {
                type: 'string',
                enum: ['dark', 'light', 'system'],
                default: 'dark',
            },
            themes: {
                type: 'object',
                properties: {
                    name: { type: 'string'},
                    colours: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        // TODO: Add default theme
                        default: [],
                    },
                    default: {}
                }
            }
        },
        default: {}
    }
};

// MLA Settings
const config = new Store({schema});

export default config;