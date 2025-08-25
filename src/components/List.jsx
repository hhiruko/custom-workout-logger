import { useState, useEffect, useRef } from "preact/hooks";
import { Fragment } from "preact";
import { ExerciseTable } from "./ExerciseTable";
import { Pencil, Trash, ChevronDown } from "lucide-preact";

export function List({storage, collection}) {
    const ACTIVE_KEY = 'exercise-active-key';
    const [key, setKey] = useState(storage.get(ACTIVE_KEY) ?? null);
    const deleteLogDialogRef = useRef(null);
    const [deleteKey, setDeleteKey] = useState(null);

    const editLog = (key) => {
        storage.set(ACTIVE_KEY, key);
        setKey(key);
    };

    const handleAddLog = () => {
        let newKey = !key ? Date.now() : key;
        editLog(newKey);
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

    useEffect(() => {
        if (key !== null) {
            document.querySelector('body').scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }, [key]);

    const deleteLog = (key) => {
        setDeleteKey(key);
        deleteLogDialogRef.current.showModal();
    };

    const handleDeleteLogButton = () => {
        collection.remove(deleteKey);
        location.reload();
    }

    const handleLogsDropdown = (event) => {
        const logsContainer = document.querySelector('.logs-container');
        if (!logsContainer) {
            return;
        }

        const isOpen = logsContainer.style.display === 'block';
        logsContainer.style.display = isOpen ? 'none' : 'block';
        event.currentTarget.classList.toggle('opened', !isOpen);
    }

    return (
        <>
            <h1>Log</h1>
            {key && (
                <ExerciseTable key={key} exerciseKey={key} collection={collection} readonly={false} />
            )}
            <button disabled={!!key} className="log-button" onClick={handleAddLog}>Add</button>
            <button disabled={!key} className="save-button" onClick={handleSaveLog}>Save</button>
            <hr/>

            <div className="logs-header">
                <h1>Logs</h1>
                <button className="logs-dropdown-button" onClick={handleLogsDropdown}><ChevronDown /></button>
            </div>
            <div className="logs-container">
                {collection.keys().filter(k => k.toString() !== key?.toString()).map(k => (
                    <Fragment key={k}>
                        <ExerciseTable exerciseKey={k} collection={collection} readonly={true} />
                        <div>
                            <button onClick={() => editLog(k)}><Pencil width={16} height={16} /></button>
                            <button class="delete-button" onClick={() => deleteLog(k)}><Trash width={16} height={16} /></button>
                        </div>
                    </Fragment>
                ))}
            </div>
            <hr/>
            
            <dialog id="delete-log-dialog" ref={deleteLogDialogRef} closedby="any">
                <p>Are you sure you want to delete this log?</p>
                <form class="delete-dialog-form" method="dialog">
                    <button autofocus>Cancel</button>
                    <button id="delete-log-button" onClick={handleDeleteLogButton}>Delete</button>
                </form>
            </dialog>
        </>
    );
}