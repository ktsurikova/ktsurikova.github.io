'use strict'

export class Article {
    constructor(options) {
        this.source = options.source;
        this.author = options.author;
        this.title = options.title;
        this.description = options.description;
        this.url = options.url;
        this.urlToImage = options.urlToImage;
        this.publishedAt = options.publishedAt
        this.content = options.content;
    };

    getMarkUp() {
        const articleBlock = document.createElement("div");
        articleBlock.classList += "articleItem";

        const articleInfoBlock = this.getInfoBlock();
        const articleImage = this.getImageBlock();

        articleBlock.appendChild(articleInfoBlock);
        articleBlock.appendChild(articleImage);

        return articleBlock;
    };

    getInfoBlock() {
        const articleInfoBlock = document.createElement("div");
        articleInfoBlock.classList += "articleInfo";

        const articconstitle = document.createElement("p");
        articconstitle.innerText = this.title;

        const articleAuthor = document.createElement("p");
        articleAuthor.innerText = this.author;

        const articlePublishedDate = this.getPublishedDate();

        const articleDesc = document.createElement("p");
        articleDesc.innerText = this.description;

        const articleReadMore = document.createElement("a");
        articleReadMore.href = this.url;
        articleReadMore.text = "Read More";

        articleInfoBlock.appendChild(articconstitle);
        articleInfoBlock.appendChild(articleAuthor);
        articleInfoBlock.appendChild(articlePublishedDate);
        articleInfoBlock.appendChild(articleDesc);
        articleInfoBlock.appendChild(articleReadMore);

        return articleInfoBlock;
    };

    getPublishedDate() {
        const articlePublishedDate = document.createElement("p");
        const date = new Date(this.publishedAt);
        articlePublishedDate.innerText = date.toDateString();
        return articlePublishedDate;
    };

    getImageBlock() {
        const articleImage = document.createElement("img");
        articleImage.src = this.urlToImage;
        articleImage.height = "300";
        articleImage.width = "200";
        articleImage.classList += "articleImage";
        return articleImage;
    };
}
