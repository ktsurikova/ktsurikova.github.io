import {NewsProvider} from './newsProvider'
import {Article} from './article'

const newsProvider = new NewsProvider();
let selectedChannel;
let numberOfRecords = 4;

document.addEventListener("DOMContentLoaded", async () => {
    let data = await newsProvider.getNewsChannel();
    initialize(data);
});

async function initialize(data) {
    initChannelInput(data);
    initNumberOfRecordsInput();
    let res = await newsProvider.getRecords(selectedChannel, 1, numberOfRecords);
    addArticles(res.articles);
}

function initNumberOfRecordsInput() {
    const numberOfRecordsInput = document.getElementById("numberOfRecordsInput");
    numberOfRecordsInput.disabled = false;
    numberOfRecordsInput.oninput = (e) => {
        const newNumber = e.target.value;
        if (newNumber === numberOfRecords) return;
        numberOfRecordsChanged(newNumber);
    }
}

function initChannelInput(channels) {
    const select = document.getElementById("channelInput");
    for (let i = 0; i < channels.length; i++) {
        const channel = channels[i];
        const option = document.createElement("option");
        option.value = channel.id;
        option.text = channel.name;
        select.add(option, i);
    }

    selectedChannel = channels[0].id;
    const channelBlock = document.getElementById("channel");
    channelBlock.onchange = (e) => {
        const selected = e.target.value;
        if (selected === selectedChannel) return;
        channelChanged(selected);
    }

    select.disabled = false;
}

async function channelChanged(selected) {
    selectedChannel = selected;
    if (numberOfRecords <= 0) return;
    let res = await newsProvider.getRecords(selected, 1, numberOfRecords);
    addArticles(res.articles);
}

async function numberOfRecordsChanged(newNumber) {
    numberOfRecords = newNumber;
    if (!selectedChannel) return;
    if (numberOfRecords < 0 ) {
        removeChildren(document.getElementById("articles"));
        return;
    }
    var res = await newsProvider.getRecords(selectedChannel, 1, numberOfRecords);
    addArticles(res.articles);
}

function addArticles(articles) {
    const articlesBlock = document.getElementById("articles");
    removeChildren(articlesBlock);
    for (let article of articles) {
      const element = new Article(article);
      articlesBlock.appendChild(element.getMarkUp());
    }
}

function removeChildren(parent) {
    parent.innerHTML = "";
}
