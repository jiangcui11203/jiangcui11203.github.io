export class Record {
    public static async addRecord(string: string): Promise<void> {
        const element = document.querySelector("div.record") as HTMLElement;
        const child = document.createElement("h2");
        child.innerText = string;
        element.appendChild(child);
    }
}