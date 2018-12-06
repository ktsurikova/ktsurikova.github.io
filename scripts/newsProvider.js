import { getRequestObject } from './requestProxy';
import { handleError } from './handlerLoader'

'use strict'

export class NewsProvider {
    constructor() {
        this.apiKey = "9412f748f1da48ea91dc092f9e37a498";
    }
    async getNewsChannel() {
        try {
            let url = `https://newsapi.org/v2/sources?apiKey=${this.apiKey}&category=sports`;
            let requestObject = getRequestObject();
            let response = await requestObject.makeRequest(url);
            return response.sources;
        } catch (error) {
            handleError(error);
        }
    };
    async getRecords(channelId, pageNumber, pageSize) {
        try {
            let url = `https://newsapi.org/v2/top-headlines?sources=${channelId}&pageSize=${pageSize}&page=${pageNumber}&apiKey=${this.apiKey}`;
            let requestObject = getRequestObject();
            return await requestObject.makeRequest(url);
        } catch (error) {
            handleErrorr(error);
        }
    }
};
