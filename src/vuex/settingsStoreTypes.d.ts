interface SettingsStore {
    colour_properties: string[];
    themes: Theme[];
    settings: Setting;
    navigation_bar_status: boolean;
  }

interface Theme {
    name: string;
    colours: string[];
    dark_colours?: string[];
}

interface Setting{
  general: object;
  theme: ThemeSetting;
  ai: object;
}

enum THEME_MODE{
  DARK= "dark",
  LIGHT= "light",
  SYSTEM= "system"
}

interface ThemeSetting{
  mode: THEME_MODE;
  selectedThemeID: number;
  themes: object;
}

export {SettingsStore,Theme,Settings,ThemeSetting};