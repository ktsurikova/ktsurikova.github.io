import 'whatwg-fetch'
import { polyfill } from 'es6-promise';
polyfill();

'use strict'

export class NewsProvider {
    constructor() {
        this.apiKey = "9412f748f1da48ea91dc092f9e37a498";
    }
    async getNewsChannel() {
        try {
            let response = await fetch(`https://newsapi.org/v2/sources?apiKey=${this.apiKey}&category=sports`);
            let newsChannel = await response.json();
            return newsChannel.sources;
        } catch (error) {
            console.error(error);
        }
    };
    async getRecords(channelId, pageNumber, pageSize) {
        try {
            let response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${channelId}
                &pageSize=${pageSize}&page=${pageNumber}&apiKey=${this.apiKey}`);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
};
