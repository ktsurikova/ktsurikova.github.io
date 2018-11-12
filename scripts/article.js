'use strict'

class Article {

    constructor(data) {
        this.source = data.source;
        this.author = data.author;
        this.title = data.title;
        this.description = data.description;
        this.url = data.url;
        this.urlToImage = data.urlToImage;
        this.publishedAt = data.publishedAt
        this.content = data.content;
    };

    getMarkUp() {
        let articleBlock = document.createElement("div");
        articleBlock.classList += "articleItem";

        let articleInfoBlock = document.createElement("div");
        articleInfoBlock.classList += "articleInfo";

        let articleAuthor = document.createElement("p");
        articleAuthor.innerText = this.author;

        articleInfoBlock.appendChild(articleAuthor);

        let articleImage = document.createElement("img");
        articleImage.src = this.urlToImage;
        articleImage.height = "300";
        articleImage.width = "200";
        articleImage.classList += "articleImage";

        articleBlock.appendChild(articleInfoBlock);
        articleBlock.appendChild(articleImage);

        return articleBlock;
    }
}
//
//
// source": {
//     "id": "nbc-news",
//     "name": "NBC News"
// },
// "author": "Jared Grossman, Associated Press",
// "title": "Armed security guard killed by police officer responding to shooting",
// "description": "Jemel Roberson, an armed security guard working at Manny's Blue Room in Robbins, Illinois, was fatally shot by an officer who was responding to a call of shots fired.",
// "url": "https://www.nbcnews.com/news/us-news/armed-security-guard-killed-police-officer-responding-shooting-n935311",
// "urlToImage": "https://media2.s-nbcnews.com/j/newscms/2018_46/2643406/181112-jemel-roberson-guard-killed-illinois-se-135p_b29799e3ef0fea804024c8c78e8a9aab.1200;630;7;70;5.jpg",
// "publishedAt": "2018-11-12T19:06:33Z",
// "content": "Get breaking news alerts and special reports. The news and stories that matter, delivered weekday mornings. SUBSCRIBE Nov. 12, 2018 / 7:06 PM GMT By Jared Grossman and Associated Press An armed guard working at a bar in a Chicago suburb was killed early Sunda… [+819 chars]"
