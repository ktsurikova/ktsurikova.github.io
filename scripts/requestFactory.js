import 'whatwg-fetch'
import { polyfill } from 'es6-promise';
import { handleError } from './handlerLoader'
polyfill();

'use strict'

export function createRequest() {
    return {
        makeRequest: async (url, options) => {
            try {
                let request = new Request(url, options);
                let response = await fetch(request);
                let result = await response.json();
                if (result.status === "ok") {
                    return result;
                }
                handleError(result);
            } catch (error) {
                handleError(error);
            }
        }
    }
}
