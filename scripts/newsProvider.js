'use strict'

export class NewsProvider {
    getNewsChannel() {
        return fetch('https://newsapi.org/v2/sources?apiKey=9412f748f1da48ea91dc092f9e37a498&category=sports')
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => data.sources);
    };
    getRecords(channelId, pageNumber, pageSize) {
        return fetch(`https://newsapi.org/v2/top-headlines?sources=${channelId}
            &pageSize=${pageSize}&page=${pageNumber}&apiKey=9412f748f1da48ea91dc092f9e37a498`)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
    }
};
