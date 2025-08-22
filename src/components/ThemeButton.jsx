import { render } from 'preact';
import { useRef } from 'preact/hooks';
import { Storage } from "../models/Storage";
import { Theme } from "../models/Theme";

export const ThemeButton = () => {
    const storage = Storage;
    const theme = new Theme(storage);
    const themeButtonRef = useRef(null);
    const ThemeIcon = theme.getIcon();

    const handleThemeButton = () => {
        theme.toggle();
        themeButtonRef.current.innerHTML = '';
        const ThemeIcon = theme.getIcon();
        render(<ThemeIcon />, themeButtonRef.current);
    };

    return (
        <button id="theme-button" ref={themeButtonRef} onClick={handleThemeButton}><ThemeIcon /></button>
    );
};