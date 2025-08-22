export class Transfer {
    constructor(storage) {
        this.storage = storage;
    }

    import(json) {
        let ms = 1;
        for(let [key, value] of Object.entries(json)) {
            if(this.storage.get(key) !== null){
                key = Date.now() + ms;
                ms++;
            }

            this.storage.set(key, value);
        }
    }

    export() {
        const json = {};
        
        for(let key of this.storage.keys()){
            json[key] = this.storage.get(key);
        }
        
        const jsonString = JSON.stringify(json, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = `${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }
}