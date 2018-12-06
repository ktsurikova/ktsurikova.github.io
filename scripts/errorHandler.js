class ErrorHandler {
    constructor() {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = this;
        }
        return ErrorHandler.instance;
    };
    handle(error) {
        if (error.code) {
            alert(error.code);
        } else {
            alert(error.message);
        }
    };
}

const instance = new ErrorHandler();
Object.freeze(instance);

export default instance;
