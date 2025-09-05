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
        const element = document.querySelector('body');
        switch(theme) {
            case Theme.LIGHT: element.classList.remove('theme-dark'); element.classList.add('theme-light'); break;
            case Theme.DARK: element.classList.remove('theme-light'); element.classList.add('theme-dark'); break;
            case Theme.SYSTEM:
            default: element.classList.remove('theme-dark'); element.classList.remove('theme-light');
        }
    }
}