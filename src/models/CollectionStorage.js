import { Storage } from "./Storage";

export class CollectionStorage {

    constructor(COLLECTION_KEY) {
        this.COLLECTION_KEY = COLLECTION_KEY;
        this.listeners = new Set();
    }

    get(key) {
        return this.#getElements()[key];
    }

    set(key, value) {
        const elements = this.#getElements();
        elements[key] = value;
        this.#setElements(elements);
        this.#notify();
    }

    remove(key) {
        const elements = this.#getElements();
        delete elements[key];
        this.#setElements(elements);
        this.#notify();
    }

    clear() {
        Storage.remove(this.COLLECTION_KEY);
        this.#notify();
    }

    keys() {
        const elements = this.#getElements();
        const keys = Object.keys(elements).map(key => parseInt(key));
        keys.sort((a,b) => b - a);
        return keys;
    }

    list() {
        return this.#getElements();
    }

    #getElements() {
        return JSON.parse(Storage.get(this.COLLECTION_KEY) ?? '{}');
    }

    #setElements(elements) {
        Storage.set(this.COLLECTION_KEY, JSON.stringify(elements));
    }

    subscribe(cb) {
        this.listeners.add(cb);
    }

    unsubscribe(cb) {
        this.listeners.delete(cb);
    }

    #notify() {
        this.listeners.forEach(cb => cb());
    }
}