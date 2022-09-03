let topBar = document.getElementsByClassName("top")[0];
let availableColors = ["lightcoral", "lightpink", "lightgreen", "lightseagreen", "lightyellow", "lightgoldenrodyellow", "lightcyan", "lightsteelblue", "lightblue", "lightskyblue", "coral"];

rainbowWheel();

function rainbowWheel(){
    topBar.style.backgroundColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    window.setTimeout(() => rainbowWheel(),  2000);
}