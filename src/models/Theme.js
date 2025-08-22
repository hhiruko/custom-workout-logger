import { SunMoon, Moon, Sun } from 'lucide-preact';

export class Theme {
    static THEME_KEY = 'theme-preference';

    static SYSTEM = 'system';
    static LIGHT = 'light';
    static DARK = 'dark';

    constructor(storage) {
        this.storage = storage;
        this.#switchTheme(this.#getTheme());
    }

    toggle() {
        const themes = [Theme.SYSTEM, Theme.DARK, Theme.LIGHT];
        let index = themes.findIndex(t => t === this.#getTheme());
        if(index === 2) {
            index = 0;
        } else {
            index++;
        }
        const theme = themes[index];
        this.#switchTheme(theme);
        this.#setTheme(theme);
    }

    getIcon() {
        let icon = null;
        switch(this.#getTheme()) {
            case Theme.LIGHT: icon = Sun;  break;
            case Theme.DARK: icon = Moon;  break;
            case Theme.SYSTEM:
            default: icon = SunMoon;
        }
        return icon;
    }

    #getTheme() {
        return this.storage.get(Theme.THEME_KEY) ?? Theme.SYSTEM;
    }

    #setTheme(theme) {
        this.storage.set(Theme.THEME_KEY, theme);
    }

    #switchTheme(theme) {
        const element = document.getElementById(Theme.THEME_KEY);
        const path = import.meta.env.VITE_APP_PATH ?? '/';
        switch(theme) {
            case Theme.LIGHT: element.setAttribute('href', `/${path}cdn/water.light.min.css`); break;
            case Theme.DARK: element.setAttribute('href', `/${path}cdn/water.dark.min.css`); break;
            case Theme.SYSTEM:
            default: element.setAttribute('href', `/${path}cdn/water.system.min.css`);
        }
    }
}