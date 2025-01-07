export class Record {
    public static async addRecord(string: string): Promise<void> {
        const element = document.querySelector("div.record") as HTMLElement;
        const child = document.createElement("h2");
        child.innerText = string;
        element.appendChild(child);
    }
    public static async removeRecord(): Promise<void> {
        const element = document.querySelector("div.record") as HTMLElement;
        const child = document.querySelectorAll("h2");
        child.forEach((e) => {
            element.removeChild(e);
        })
    }
}