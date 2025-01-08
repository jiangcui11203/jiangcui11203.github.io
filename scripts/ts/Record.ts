export class Record {
    public static async addRecord(string: string): Promise<void> {
        const element = document.querySelector("div.record") as HTMLElement;
        const child = document.createElement("h2");
        child.innerText = string;
        child.id = "id";
        element.appendChild(child);
    }
    public static async removeRecord(): Promise<void> {
        const element = document.querySelector("div.record") as HTMLElement;
        while(true) {
            let child = document.querySelector("h2#id");
            if (child) element.removeChild(child);
            else return;
        }
    }
}