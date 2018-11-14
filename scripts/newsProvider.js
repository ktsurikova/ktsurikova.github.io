'use strict'

export class NewsProvider {
    constructor() {
        this.apiKey = "9412f748f1da48ea91dc092f9e37a498";
    }
    getNewsChannel() {
        return fetch(`https://newsapi.org/v2/sources?apiKey=${this.apiKey}&category=sports`)
        .then(res => res.json())
        .catch(console.error)
        .then(data => data.sources);
    };
    getRecords(channelId, pageNumber, pageSize) {
        return fetch(`https://newsapi.org/v2/top-headlines?sources=${channelId}
            &pageSize=${pageSize}&page=${pageNumber}&apiKey=${this.apiKey}`)
        .then(res => res.json())
        .catch(console.error)
    }
};
