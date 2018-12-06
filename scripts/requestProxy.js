import { createRequest } from './requestFactory';

'use strict'

export function getRequestObject() {
    let request = createRequest();
    return new Proxy(request, handler);
}

const handler = {
    get(target, propKey, receiver) {
        const targetValue = Reflect.get(target, propKey, receiver);
        if (typeof targetValue === 'function') {
            return function (...args) {
                console.log(propKey, args);
                return targetValue.apply(this, args);
            }
        } else {
            return targetValue;
        }
    }
};
