import {NewsProvider} from './newsProvider'
import {Article} from './article'

let newsProvider = new NewsProvider();
let domready = false;
let channelsLoaded = false;
let channels;
let selectedChannel;
let numberOfRecords = 4;

document.addEventListener("DOMContentLoaded", () => {
    domready = true;
    if (channelsLoaded) {
        initialize(channels);
    }
});

loadChannels();

function loadChannels() {
    newsProvider.getNewsChannel()
    .then(data => {
        if (domready) {
            initialize(data);
        } else {
            channelsLoaded = true;
            channels = data;
        }
    });
}

function initialize(data) {
    initChannelInput(data);
    initNumberOfRecordsInput();
    newsProvider.getRecords(selectedChannel, 1, numberOfRecords)
        .then(res => addArticles(res.articles))
}

function initNumberOfRecordsInput() {
    let numberOfRecordsInput = document.getElementById("numberOfRecordsInput");
    numberOfRecordsInput.disabled = false;
    numberOfRecordsInput.onchange = (e) => {
        let newNumber = e.target.value;
        if (newNumber === numberOfRecords) return;
        numberOfRecordsChanged(newNumber);
    }
}

function initChannelInput(channels) {
    let select = document.getElementById("channelInput");
    for (let i = 0; i < channels.length; i++) {
        let channel = channels[i];
        let option = document.createElement("option");
        option.value = channel.id;
        option.text = channel.name;
        select.add(option, i);
    }

    selectedChannel = channels[0].id;
    let channelBlock = document.getElementById("channel");
    channelBlock.onchange = (e) => {
        let selected = e.target.value;
        if (selected === selectedChannel) return;
        channelChanged(selected);
    }

    select.disabled = false;
}

function channelChanged(selected) {
    selectedChannel = selected;
    if (numberOfRecords <= 0) return;
    newsProvider.getRecords(selected, 1, numberOfRecords)
        .then(res => addArticles(res.articles))
}

function numberOfRecordsChanged(newNumber) {
    numberOfRecords = newNumber;
    if (!selectedChannel) return;
    if (numberOfRecords < 0 ) {
        removeChildren(document.getElementById("articles"));
        return;
    }
    newsProvider.getRecords(selectedChannel, 1, numberOfRecords)
        .then(res => addArticles(res.articles))
}

function addArticles(articles) {
    let articlesBlock = document.getElementById("articles");
    removeChildren(articlesBlock);
    for (let article of articles) {
      let element = new Article(article);
      articlesBlock.appendChild(element.getMarkUp());
    }
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}
