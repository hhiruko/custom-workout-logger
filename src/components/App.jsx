import { ThemeButton } from "./ThemeButton";
import { Dumbbell, Settings2 } from "lucide-preact";
import { Delete } from "./Delete";
import { ImportExport } from "./ImportExport";
import { CollectionStorage } from "../models/CollectionStorage";
import { List } from "./List";
import { Storage } from "../models/Storage";
import { Stats } from "./Stats";
import { useState } from "preact/hooks";

export function App() {
    const exerciseStorage = new CollectionStorage("exercise-collection");

    const handleSettings = () => {
        const settingsContainer = document.querySelector('.system-actions-container');
        if (!settingsContainer) {
            return;
        }
        settingsContainer.style.display = settingsContainer.style.display === 'block' ? 'none' : 'block';
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
            <List storage={Storage} collection={exerciseStorage} />
            <Stats collection={exerciseStorage} />
        </>
    );
}