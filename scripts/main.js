import './../main.css';

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById('showNewsButton');
    button.onclick = function () {
        button.style.display = "none";
        document.getElementById('contentBlock').style.display = "block";
        return import('./app').then(module => {
            let appLoader = module.default;
            appLoader();
        });
    }
});
