import {NewsProvider} from './newsProvider'
import {Article} from './article'

let newsProvider = new NewsProvider();
let domready = false;
let channelsLoaded = false;
let channels;

let loadChannels = function () {
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
    AddSelectChannelsToMarkUp(data);
    ShowNumberOfRecordsInput();
    newsProvider.getRecords(selectedChannel, 1, numberOfRecords)
        .then(res => AddArticles(res.articles))
}

loadChannels();

document.addEventListener("DOMContentLoaded", () => {
    domready = true;
    if (channelsLoaded) {
        initialize(channels);
    }
});

function ShowNumberOfRecordsInput() {
    let numberOfRecordsInput = document.getElementById("numberOfRecordsInput");
    numberOfRecordsInput.disabled = false;

    numberOfRecordsInput.onchange = function (e) {
        let newNumber = e.target.value;
        if (newNumber === numberOfRecords) return;
        numberOfRecordsChanged(newNumber);
    }
}

let selectedChannel;
let numberOfRecords = 4;

function AddSelectChannelsToMarkUp(channels) {

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

    channelBlock.onchange = function (e) {
        let selected = e.target.value;
        if (selected === selectedChannel) return;
        ChannelChanged(selected);
    }

    select.disabled = false;
}

function ChannelChanged(selected) {
    selectedChannel = selected;
    if (numberOfRecords <= 0) return;
    newsProvider.getRecords(selected, 1, numberOfRecords)
        .then(res => AddArticles(res.articles))
}

function numberOfRecordsChanged(newNumber) {
    numberOfRecords = newNumber;
    if (!selectedChannel) return;
    if (numberOfRecords < 0 ) {
        removeChildren(document.getElementById("articles"));
        return;
    }
    newsProvider.getRecords(selectedChannel, 1, numberOfRecords)
        .then(res => AddArticles(res.articles))
}

function AddArticles(articles) {
    let articlesBlock = document.getElementById("articles");
    removeChildren(articlesBlock);

    for (let i = 0; i < articles.length; i++) {
        let article = new Article(articles[i]);
        articlesBlock.appendChild(article.getMarkUp());
    }
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}

// //remove childs
// while (channelBlock.firstChild) {
//     channelBlock.firstChild.remove();
// }
