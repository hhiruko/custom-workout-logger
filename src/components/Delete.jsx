import { useRef } from 'preact/hooks';
import { Trash2 } from "lucide-preact";
import { Storage } from '../models/Storage';

export function Delete() {
    const deleteAllDialogRef = useRef(null);

    const handleDeleteAllButton = () => {
        Storage.clear();
        location.reload();
    }

    const handleDeleteAllDialogTriggerButton = () => {
        deleteAllDialogRef.current.showModal();
    };

    return (
        <>
            <h2>Delete Data <Trash2 /></h2>
            <div id="delete-container">
                <p>You can delete all your data. This process is irreversible.</p>
                <div className='delete-buttons-container'>
                    <button id="delete-all-dialog-trigger-button" onClick={handleDeleteAllDialogTriggerButton}>Delete All</button>
                </div>
            </div>
            <dialog id="delete-all-dialog" ref={deleteAllDialogRef} closedby="any">
                <p>Are you sure you want to delete all your data?</p>
                <form class="delete-dialog-form" method="dialog">
                    <button autofocus>Cancel</button>
                    <button id="delete-all-button" onClick={handleDeleteAllButton}>Delete</button>
                </form>
            </dialog>
        </>
    );
}