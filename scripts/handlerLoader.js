let errorHandler;
export function handleError(error) {
    if (errorHandler) {
        errorHandler.handle(error);
    } else {
        import('./errorHandler').then(module => {
            errorHandler = module.default;
            errorHandler.handle(error);
        });
    }
}
