const timer: any = {
    id: null,
    run: function run(callback: () => void, time: number) {
        this.id = window.setTimeout(callback, time);
    },
    clean: function clean() {
        this.id = window.clearTimeout(this.id);
    }
};
const screenHeight = window.innerHeight;
export const getKeyboardHeight = (input: any, evt?: any): Promise<number> => {
    return new Promise((reslove) => {
        let keyboardHeight = 0;
        function timeRun(e: any) {
            if (!keyboardHeight) {
                timer.run(function a() {
                    if (screenHeight !== window.innerHeight) {
                        keyboardHeight = screenHeight - window.innerHeight;
                        console.log('keyboardHeight', keyboardHeight);
                        timer.clean();
                        reslove(keyboardHeight);
                    }
                }, 50);
            }
        }
        if (input) {
            input.addEventListener('focus', timeRun);
            // input.focus();
        } else {
            timeRun(evt);
        }
    });
};
