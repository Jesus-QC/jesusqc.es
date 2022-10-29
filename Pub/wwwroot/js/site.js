let win = undefined;
let systemsRestarting = false;

$(document).ready(() => {
    win = $("#window")
    
    log("Welcome!");
    logLineWithColor(" JesusCore V 0.0.1", "#57befa")
    
    appendInput();
});

function showContact(){
    logWithColor("> ", "#f55e5b")
    logLine("Contact")
    logLineWithColor("😉 You can contact me in the following platforms:", "#f6ce4b");
    logWithColor("- Email: ", "#f6ce4b");
    logLinkLine("contact@jesusqc.es", "mailto:contact@jesusqc.es")
    logWithColor("- Discord: ", "#f6ce4b");
    logLinkLine("https://discord.com/users/430960270433845249", "https://discord.com/users/430960270433845249")
    
    appendInput();
}

function showProjects(){
    logWithColor("> ", "#f55e5b")
    logLine("Projects")
    logLineWithColor("😶 I don't have a projects page yet! While I make it you can check some of my public projects in my github account. 😃", "#f6ce4b");
    logWithColor("- Github: ", "#f6ce4b");
    logLinkLine("https://github.com/Jesus-QC", "https://github.com/Jesus-QC");
    appendInput();
}

function showInfo(){
    logWithColor("> ", "#f55e5b")
    logLine("Info")

    let d = new Date();
    let years = d.getFullYear() - 2005
    if(d.getMonth() < 3)
        years--;
    
    logLineWithColor("Hi! My name is Jesus and I am a " + years + " years old student who lives in Spain <span class='output' style='color: red'>■</span><span class='output'>■</span><span class='output' style='color:red'>■</span>! 😃", "#f6ce4b");
    appendInput();
}

function restartSystem(){
    if (systemsRestarting)
        return;
    
    systemsRestarting = true;
    
    logWithColor("> ", "#f55e5b")
    logLine("Restart")
    logWithColor("Restarting system", "red")
    setTimeout(() => {
        logWithColor(".", "red")
        setTimeout(() => {
            logWithColor(".", "red")
            setTimeout(() => {
                logWithColor(".", "red")
                setTimeout(() => {
                    location.reload()
                }, 500);
            }, 500);
        }, 500);
    }, 500);
}

function showHelp(){
    logWithColor("> ", "#f55e5b")
    logLine("Help")
    logLineWithColor("Available commands:", "#f55e5b");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='deleteInput(); showContact()'>Contact</span><br>");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='deleteInput(); showProjects()'>Projects</span><br>");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='deleteInput(); showHelp()'>Help</span><br>");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='deleteInput(); restartSystem()'>Restart System</span><br>");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='deleteInput(); log(\"You have been hacked! IP: localhost<br>Ups 🤦 error 500.<br>\"); appendInput();'>#6/qa@w!</span><br>");
    
    appendInput();
}

function appendInput(options = ["showContact()","Contact","showProjects()","Projects","showInfo()","Information","showHelp()","Help"]){
    setTimeout(() => {
        win.append("<br><div></div>");
        let container = win.find("div:last");
        container.append("<span class='output' style='color: #05e85d'>jesusqc@core </span>")
        container.append("<span class='cursor output'>$ </span>")

        for (let i = 0; i < options.length; i += 2) {
            container.append("<span class='option output' onclick='deleteInput(); " + options[i] + "'>" + options[i + 1] + "</span> ");
        }
    }, 500);
}

function deleteInput(){
    win.find("div:last").remove();
}

function log(text){
    win.append("<span class='output'>" + text + "</span>");
}

function logLine(text){
    win.append("<span class='output'>" + text + "</span>" + "<br>");
}

function logWithColor(text, color){
    win.append("<span class='output' style='color: " + color + "'>" + text + "</span>");
}

function logLineWithColor(text, color){
    win.append("<span class='output' style='color: " + color + "'>" + text + "</span>" + "<br>");
}

function logLinkLine(text, link){
    win.append("<a href='" + link + "' class='option output'>" + text + "</a><br>")
}

$("#close").click(() => {
    deleteInput();
    restartSystem();
});