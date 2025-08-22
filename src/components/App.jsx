import { ThemeButton } from "./ThemeButton";
import { BookDashed, Settings2 } from "lucide-preact";
import { Delete } from "./Delete";
import { ImportExport } from "./ImportExport";

export function App() {
    const handleSettings = () => {
        const settingsContainer = document.querySelector('.system-actions-container');
        if (!settingsContainer) {
            return;
        }

        if(settingsContainer.style.display === 'block') {
            settingsContainer.style.display = 'none';
        } else {
            settingsContainer.style.display = 'block';
        }
    };

    return (
        <>
            <header>
                <h1><BookDashed width={30} height={30} />Site:</h1>
                <div id="header-right-container">
                    <ThemeButton />
                    <Settings2 onClick={handleSettings} />
                </div>
            </header>
            <div className="system-actions-container">
                <ImportExport />
                <Delete />
            </div>
        </>
    );
}