import { useState, useEffect } from "preact/hooks";
import { ExerciseTable } from "./ExerciseTable";

export function List({storage, collection}) {
    const ACTIVE_KEY = 'exercise-active-key';
    const [key, setKey] = useState(storage.get(ACTIVE_KEY) ?? null);

    const handleAddLog = () => {
        let newKey = !key ? Date.now() : key;
        storage.set(ACTIVE_KEY, newKey);
        setKey(newKey);
    };

    const handleSaveLog = () => {
        storage.remove(ACTIVE_KEY);
        setKey(null);
    };

    useEffect(() => {
        const logButton = document.querySelector('.log-button');
        const saveButton = document.querySelector('.save-button');

        logButton.disabled = !!key;
        saveButton.disabled = !key;
    }, [key]);

    return (
        <>
            {key && (
                <ExerciseTable exerciseKey={key} collection={collection} readonly={false} />
            )}
            <button disabled={!!key} className="log-button" onClick={handleAddLog}>Log</button>
            <button disabled={!key} className="save-button" onClick={handleSaveLog}>Save</button>
            {collection.keys().filter(k => k.toString() !== key).map(k => (
                <ExerciseTable exerciseKey={k} collection={collection} readonly={true} />
            ))}
        </>
    );
}