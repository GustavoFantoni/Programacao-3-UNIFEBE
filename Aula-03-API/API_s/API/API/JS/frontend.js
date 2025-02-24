let background = document.querySelector('body');
let date = new Date();
let hour = date.getHours();

if (hour >= 5 && hour < 12) {
    bc("manha");
} else if (hour >= 12 && hour < 18) {
    bc("dia");
} else if (hour >= 18 && hour < 20) {
    bc("tarde");
} else {
    bc("noite");
}

function bc(i) {
    background.style.backgroundImage = `url(images/${i}.jpg)`;
}
