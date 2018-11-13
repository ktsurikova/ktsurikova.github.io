'use strict'

export class Article {

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

        let articleInfoBlock = this.getInfoBlock();
        let articleImage = this.getImageBlock();

        articleBlock.appendChild(articleInfoBlock);
        articleBlock.appendChild(articleImage);

        return articleBlock;
    };

    getInfoBlock() {
        let articleInfoBlock = document.createElement("div");
        articleInfoBlock.classList += "articleInfo";

        let articleTitle = document.createElement("p");
        articleTitle.innerText = this.title;

        let articleAuthor = document.createElement("p");
        articleAuthor.innerText = this.author;

        let articlePublishedDate = this.getPublishedDate();

        let articleDesc = document.createElement("p");
        articleDesc.innerText = this.description;

        let articleReadMore = document.createElement("a");
        articleReadMore.href = this.url;
        articleReadMore.text = "Read More";

        articleInfoBlock.appendChild(articleTitle);
        articleInfoBlock.appendChild(articleAuthor);
        articleInfoBlock.appendChild(articlePublishedDate);
        articleInfoBlock.appendChild(articleDesc);
        articleInfoBlock.appendChild(articleReadMore);

        return articleInfoBlock;
    };

    getPublishedDate() {
        let articlePublishedDate = document.createElement("p");
        let date = new Date(this.publishedAt);
        articlePublishedDate.innerText = date.toDateString();
        return articlePublishedDate;
    };

    getImageBlock() {
        let articleImage = document.createElement("img");
        articleImage.src = this.urlToImage;
        articleImage.height = "300";
        articleImage.width = "200";
        articleImage.classList += "articleImage";
        return articleImage;
    };
}
