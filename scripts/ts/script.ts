(function () {
    const _ = class {
        static {

        }
        private static async click(): Promise<void> {
            const item = document.getElementById("click") as HTMLElement;
            item.addEventListener('click', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
            });
        }
        private static 
    }
})();