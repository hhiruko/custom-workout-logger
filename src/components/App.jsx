import { ThemeButton } from "./ThemeButton";
import { Dumbbell, Settings2 } from "lucide-preact";
import { Delete } from "./Delete";
import { ImportExport } from "./ImportExport";
import { ExerciseTable } from "./ExerciseTable";
import { CollectionStorage } from "../models/CollectionStorage";

export function App() {
    const exerciseStorage = new CollectionStorage("exercise-collection");

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
                <h1><Dumbbell width={30} height={30} />Workout Logger</h1>
                <div id="header-right-container">
                    <ThemeButton />
                    <Settings2 onClick={handleSettings} />
                </div>
            </header>
            <div className="system-actions-container">
                <ImportExport />
                <Delete />
            </div>
            <ExerciseTable storage={exerciseStorage} readonly={false} />
        </>
    );
}