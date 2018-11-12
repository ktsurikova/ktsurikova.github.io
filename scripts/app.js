//import {NewsProvider} from './newsProvider'

let newsProvider = new NewsProvider();

let loadChannels = function () {
    newsProvider.getNewsChannel()
    .then(data => {
        AddSelectChannelsToMarkUp(data);
        ShowNumberOfRecordsInput();
    });
}

document.addEventListener("DOMContentLoaded", loadChannels);

function ShowNumberOfRecordsInput() {
    let numberOfRecordsBlock = document.getElementById("numberOfRecords");
    numberOfRecordsBlock.style.display = "block";
}

let selectedChannel;
let numberOfRecordsBlock = 5;

function AddSelectChannelsToMarkUp(channels) {

    let channelBlock = document.getElementById("channel");

    //remove childs
    while (channelBlock.firstChild) {
        channelBlock.firstChild.remove();
    }

    let select = document.createElement("select");
    select.name = "channel";

    for (let i = 0; i < channels.length; i++) {
        let channel = channels[i];
        let option = document.createElement("option");
        option.value = channel.id;
        option.text = channel.name;
        select.add(option, i);
    }

    selectedChannel = channels[0].id;

    channelBlock.appendChild(select);

    channelBlock.onchange = function (e) {
        let selected = e.target.value;
        if (selected === selectedChannel) return;
        ChannelChanged(selected);
    }
}

function ChannelChanged(selected) {
    if (numberOfRecords <= 0) return;
    newsProvider.getRecords(selected, 1, numberOfRecords)
        .then(res => AddArticles(res.articles))
}

function AddArticles(articles) {
    let articlesBlock = document.getElementById("articles");
    for (let i = 0; i < articles.length; i++) {
        let article = new Article(articles[i]);
        articlesBlock.appendChild(article.getMarkUp());
    }
}
