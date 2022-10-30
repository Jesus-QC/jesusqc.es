let win = undefined;
let input = undefined;
let handlingCommand = false;

$(document).ready(() => {
    win = $("#window")
    input = $("#input");
    
    log("Welcome!");
    logLineWithColor(" JesusCore V 0.0.1", "#57befa")
    logLineWithColor("Feel free to use both the interactive buttons or the input at the end!", "red")
    
    appendInput();
});

function showContact(){
    logLineWithColor("😉 You can contact me in the following platforms:", "#f6ce4b");
    logWithColor("- Email: ", "#f6ce4b");
    logLinkLine("contact@jesusqc.es", "mailto:contact@jesusqc.es")
    logWithColor("- Discord: ", "#f6ce4b");
    logLinkLine("https://discord.com/users/430960270433845249", "https://discord.com/users/430960270433845249")
    
    appendInput();
}

function showProjects(){
    logLineWithColor("😶 I don't have a projects page yet! While I make it you can check some of my public projects in my github account. 😃", "#f6ce4b");
    logWithColor("- Github: ", "#f6ce4b");
    logLinkLine("https://github.com/Jesus-QC", "https://github.com/Jesus-QC");
    logLineWithColor("👀 There you can also find the code of this website!", "#42c2f5")
    appendInput();
}

function showInfo(){
    let d = new Date();
    let years = d.getFullYear() - 2005
    if(d.getMonth() < 3)
        years--;
    
    logLineWithColor("Hi! My name is Jesus and I am a " + years + " years old student who lives in Spain <span class='output' style='color: red'>■</span><span class='output'>■</span><span class='output' style='color:red'>■</span>! 😃", "#f6ce4b");
    appendInput();
}

function restartSystem(){
    logWithColor("Restart command received. Restarting system", "red")
    
    setTimeout(() => {
        logWithColor(".", "red")
    }, 1000);

    setTimeout(() => {
        logWithColor(".", "red")
    }, 2000);

    setTimeout(() => {
        logWithColor(".", "red")
    }, 3000);

    setTimeout(() => {
        location.reload()
    }, 3500);
    
    win.scrollTop(win[0].scrollHeight)
}

function showSecret(){
    logLine("You have been hacked!");
    
    setTimeout(() =>{
        logLine("<span class='output' style='color: #ebab34'>[debug]</span> Getting IP")
    }, 500);

    setTimeout(() =>{
        logLine("<span class='output' style='color: #ebab34'>[debug]</span> IP Granted: localhost")
    }, 2000);
    
    setTimeout(() =>{
        logLine("<span class='output' style='color: #349eeb'>[info]</span> Sending DOS Attack")
    },3000);

    setTimeout(() =>{
        logLine("<span class='output' style='color: #f74940'>[error]</span> FATAL ERROR 500, ENABLING RESCUE MODE")
    },4500);

    setTimeout(() =>{
        restartSystem()
    },5500);
}

function rickProcedure(){
    setTimeout(() =>{
        logLine("<span class='output' style='color: #f74940'>[fatal error]</span> System Corrupted");
    }, 500);

    setTimeout(() =>{
        logLine("<span class='output' style='color: #349eeb'>[info]</span> Starting Rick Procedure...");
    }, 1500);

    setTimeout(() =>{
        location.assign("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }, 3000);
}

function showHelp(){
    logLineWithColor("Available commands:", "#f55e5b");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='handleCommand(\"contact\")'>Contact</span><br>");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='handleCommand(\"projects\")'>Projects</span><br>");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='handleCommand(\"information\")'>Information</span><br>");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='handleCommand(\"help\")'>Help</span><br>");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='handleCommand(\"restart system\")'>Restart System</span><br>");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='handleCommand(\"clear\")'>Clear</span><br>");
    logWithColor("- ", "#57befa")
    win.append("<span class='option output' onclick='handleCommand(\"#6/qa@w!\")'>#6/qa@w!</span><br>");
    
    appendInput();
}

function appendInput(options = ["Contact","Projects","Information","Help"]){
    win.scrollTop(win[0].scrollHeight)
    setTimeout(() => {
        win.append("<br><div></div>");
        let container = win.find("div:last");
        container.append("<span class='output' style='color: #05e85d'>jesusqc@core </span>")
        container.append("<span class='cursor output'>$ </span>")

        for (let i = 0; i < options.length; i++) {
            container.append("<span class='option output' onclick='handleCommand(\"" + options[i] + "\");'>" + options[i] + "</span> ");
        }
        win.scrollTop(win[0].scrollHeight)
        handlingCommand = false;
    }, 500);
}

function commandNotFound(){
    logWithColor("Command not found! Use ", "#f55e5b");
    win.append("<span class='option output' style='color: #3480eb' onclick='handleCommand(\"help\")'>Help</span>");
    logLineWithColor(" for showing a list of available commands.", "#f55e5b");
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

function handleCommand(command){
    if (handlingCommand)
        return;
    
    handlingCommand = true;
    
    deleteInput();
    logWithColor("> ", "#f55e5b");
    logLine(capitalizeTitle(command));
    
    switch (command.toLowerCase()){
        case "help" || "h":
            showHelp();
            break;
            
        case "projects":
            showProjects();
            break;
            
        case "contact":
            showContact();
            break;
            
        case "info":
        case "information":
            showInfo();
            break;
            
        case "restart":
        case "restart system":
            restartSystem();
            break;
            
        case "clear":
            win.empty();
            logLine("Console cleared.")
            appendInput();
            break;
            
        case "#6/qa@w!":
            showSecret();
            break;
            
        case ":(){ :|:& };:":
            rickProcedure();
            break;
            
        default:
            commandNotFound();
            appendInput();
            break;
    }
}

function capitalizeTitle(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$("#close").click(() => {
    handleCommand("restart system")
});

$("#minimize").click(() => {
    handleCommand(":(){ :|:& };:")
});

$("#input").change(() => {
    handleCommand(input.val());
    input.val("")
});