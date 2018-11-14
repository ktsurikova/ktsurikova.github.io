/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/app.js":
/*!************************!*\
  !*** ./scripts/app.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _newsProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newsProvider */ \"./scripts/newsProvider.js\");\n/* harmony import */ var _article__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./article */ \"./scripts/article.js\");\n\n\n\nconst newsProvider = new _newsProvider__WEBPACK_IMPORTED_MODULE_0__[\"NewsProvider\"]();\nlet selectedChannel;\nlet numberOfRecords = 4;\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    newsProvider.getNewsChannel().then(data => initialize(data));\n});\n\nfunction initialize(data) {\n    initChannelInput(data);\n    initNumberOfRecordsInput();\n    newsProvider.getRecords(selectedChannel, 1, numberOfRecords).then(res => addArticles(res.articles));\n}\n\nfunction initNumberOfRecordsInput() {\n    const numberOfRecordsInput = document.getElementById(\"numberOfRecordsInput\");\n    numberOfRecordsInput.disabled = false;\n    numberOfRecordsInput.onchange = e => {\n        const newNumber = e.target.value;\n        if (newNumber === numberOfRecords) return;\n        numberOfRecordsChanged(newNumber);\n    };\n}\n\nfunction initChannelInput(channels) {\n    const select = document.getElementById(\"channelInput\");\n    for (let i = 0; i < channels.length; i++) {\n        const channel = channels[i];\n        const option = document.createElement(\"option\");\n        option.value = channel.id;\n        option.text = channel.name;\n        select.add(option, i);\n    }\n\n    selectedChannel = channels[0].id;\n    const channelBlock = document.getElementById(\"channel\");\n    channelBlock.onchange = e => {\n        const selected = e.target.value;\n        if (selected === selectedChannel) return;\n        channelChanged(selected);\n    };\n\n    select.disabled = false;\n}\n\nfunction channelChanged(selected) {\n    selectedChannel = selected;\n    if (numberOfRecords <= 0) return;\n    newsProvider.getRecords(selected, 1, numberOfRecords).then(res => addArticles(res.articles));\n}\n\nfunction numberOfRecordsChanged(newNumber) {\n    numberOfRecords = newNumber;\n    if (!selectedChannel) return;\n    if (numberOfRecords < 0) {\n        removeChildren(document.getElementById(\"articles\"));\n        return;\n    }\n    newsProvider.getRecords(selectedChannel, 1, numberOfRecords).then(res => addArticles(res.articles));\n}\n\nfunction addArticles(articles) {\n    const articlesBlock = document.getElementById(\"articles\");\n    removeChildren(articlesBlock);\n    for (let article of articles) {\n        const element = new _article__WEBPACK_IMPORTED_MODULE_1__[\"Article\"](article);\n        articlesBlock.appendChild(element.getMarkUp());\n    }\n}\n\nfunction removeChildren(parent) {\n    while (parent.firstChild) {\n        parent.firstChild.remove();\n    }\n}\n\n//# sourceURL=webpack:///./scripts/app.js?");

/***/ }),

/***/ "./scripts/article.js":
/*!****************************!*\
  !*** ./scripts/article.js ***!
  \****************************/
/*! exports provided: Article */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Article\", function() { return Article; });\n\n\nclass Article {\n    constructor(options) {\n        this.source = options.source;\n        this.author = options.author;\n        this.title = options.title;\n        this.description = options.description;\n        this.url = options.url;\n        this.urlToImage = options.urlToImage;\n        this.publishedAt = options.publishedAt;\n        this.content = options.content;\n    }\n\n    getMarkUp() {\n        const articleBlock = document.createElement(\"div\");\n        articleBlock.classList += \"articleItem\";\n\n        const articleInfoBlock = this.getInfoBlock();\n        const articleImage = this.getImageBlock();\n\n        articleBlock.appendChild(articleInfoBlock);\n        articleBlock.appendChild(articleImage);\n\n        return articleBlock;\n    }\n\n    getInfoBlock() {\n        const articleInfoBlock = document.createElement(\"div\");\n        articleInfoBlock.classList += \"articleInfo\";\n\n        const articconstitle = document.createElement(\"p\");\n        articconstitle.innerText = this.title;\n\n        const articleAuthor = document.createElement(\"p\");\n        articleAuthor.innerText = this.author;\n\n        const articlePublishedDate = this.getPublishedDate();\n\n        const articleDesc = document.createElement(\"p\");\n        articleDesc.innerText = this.description;\n\n        const articleReadMore = document.createElement(\"a\");\n        articleReadMore.href = this.url;\n        articleReadMore.text = \"Read More\";\n\n        articleInfoBlock.appendChild(articconstitle);\n        articleInfoBlock.appendChild(articleAuthor);\n        articleInfoBlock.appendChild(articlePublishedDate);\n        articleInfoBlock.appendChild(articleDesc);\n        articleInfoBlock.appendChild(articleReadMore);\n\n        return articleInfoBlock;\n    }\n\n    getPublishedDate() {\n        const articlePublishedDate = document.createElement(\"p\");\n        const date = new Date(this.publishedAt);\n        articlePublishedDate.innerText = date.toDateString();\n        return articlePublishedDate;\n    }\n\n    getImageBlock() {\n        const articleImage = document.createElement(\"img\");\n        articleImage.src = this.urlToImage;\n        articleImage.height = \"300\";\n        articleImage.width = \"200\";\n        articleImage.classList += \"articleImage\";\n        return articleImage;\n    }\n}\n\n//# sourceURL=webpack:///./scripts/article.js?");

/***/ }),

/***/ "./scripts/newsProvider.js":
/*!*********************************!*\
  !*** ./scripts/newsProvider.js ***!
  \*********************************/
/*! exports provided: NewsProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NewsProvider\", function() { return NewsProvider; });\n\n\nclass NewsProvider {\n    constructor() {\n        this.apiKey = \"9412f748f1da48ea91dc092f9e37a498\";\n    }\n    getNewsChannel() {\n        return fetch(`https://newsapi.org/v2/sources?apiKey=${this.apiKey}&category=sports`).then(res => res.json()).catch(console.error).then(data => data.sources);\n    }\n    getRecords(channelId, pageNumber, pageSize) {\n        return fetch(`https://newsapi.org/v2/top-headlines?sources=${channelId}\n            &pageSize=${pageSize}&page=${pageNumber}&apiKey=${this.apiKey}`).then(res => res.json()).catch(console.error);\n    }\n};\n\n//# sourceURL=webpack:///./scripts/newsProvider.js?");

/***/ })

/******/ });