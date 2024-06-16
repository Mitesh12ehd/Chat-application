const socket = io();

let username;
let textarea = document.getElementById("textarea");
let messageArea = document.querySelector(".messeges_area");

do{
    username = prompt("please enter your name")
}while(!username)

textarea.addEventListener("keyup", (e) => {
    if(e.key == "Enter"){
        sendMessage(e.target.value)
    }
} )

function sendMessage(msgContent){
    let msg = {
        user : username,
        message  :msgContent.trim()
    }

    //append message in chat section
    appendMessage(msg, "outgoing");
    textarea.value = "";

    //send message to server
    socket.emit("message",msg);
}

function appendMessage(message, type){
    let mainDiv = document.createElement('div');
    let classname = type;
    mainDiv.classList.add(classname,"message");

    let markUp = `
        <h4> ${message.user} </h4>
        <p> ${message.message}</p>
    `;

    mainDiv.innerHTML = markUp;
    messageArea.appendChild(mainDiv);
}

//recieve distributes message
socket.on("message",(msg) => {
    // console.log(msg);

    appendMessage(msg,"incoming");
});