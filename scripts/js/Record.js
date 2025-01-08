var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Record {
    static addRecord(string) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = document.querySelector("div.record");
            const child = document.createElement("h2");
            child.innerText = string;
            child.id = "id";
            element.appendChild(child);
        });
    }
    static removeRecord() {
        return __awaiter(this, void 0, void 0, function* () {
            const element = document.querySelector("div.record");
            while (true) {
                let child = document.querySelector("h2#id");
                if (child)
                    element.removeChild(child);
                else
                    return;
            }
        });
    }
}
