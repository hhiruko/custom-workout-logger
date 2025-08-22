import { Storage } from "./Storage";

export class CollectionStorage {

    constructor(COLLECTION_KEY) {
        this.COLLECTION_KEY = COLLECTION_KEY;
    }

    get(key) {
        return this.#getElements()[key];
    }

    set(key, value) {
        const elements = this.#getElements();
        elements[key] = value;
        this.#setElements(elements);
    }

    remove(key) {
        const elements = this.#getElements();
        delete elements[key];
        this.#setElements(elements);
    }

    clear() {
        Storage.remove(this.COLLECTION_KEY);
    }

    keys() {
        const elements = this.#getElements();
        const keys = Object.keys(elements).map(key => parseInt(key));
        keys.sort((a,b) => b - a);
        return keys;
    }

    #getElements() {
        return JSON.parse(Storage.get(this.COLLECTION_KEY) ?? '{}');
    }

    #setElements(elements) {
        Storage.set(this.COLLECTION_KEY, JSON.stringify(elements));
    }
}