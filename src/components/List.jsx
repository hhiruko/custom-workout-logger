import { useState } from "preact/hooks";
import { ExerciseTable } from "./ExerciseTable";

export function List({storage, collection}) {
    const ACTIVE_KEY = 'exercise-active-key';
    const [key, setKey] = useState(storage.get(ACTIVE_KEY) ?? null);

    const handleAddLog = () => {
        let newKey = !key ? Date.now() : key;
        storage.set(ACTIVE_KEY, newKey);
        setKey(newKey);
    };

    return (
        <>
            {key && (
                <ExerciseTable exerciseKey={key} collection={collection} readonly={false} />
            )}
            <button onClick={handleAddLog}>add log</button>
            {collection.keys().filter(k => k.toString() !== key).map(k => (
                <ExerciseTable exerciseKey={k} collection={collection} readonly={true} />
            ))}
        </>
    );
}