const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const roomContainer = document.getElementById('room-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

if(messageForm != null) {
    const name = prompt('enter your Nickname');
    appendMessage(`welcome ${name}!`)
    socket.emit('new-user', roomName, name);
    
    //handeling user input
    messageForm.addEventListener('submit', e=>{
        e.preventDefault();
        const message = messageInput.value;
        socket.emit('send-chat-msg', roomName, name + ": "+ message);
        messageInput.value = '';
        appendMessage(`you: ${message}`);
    });
    
}

socket.on('room-created', room=>{
    const roomElement = document.createElement('div');
    roomElement.innerText = room;
    const roomLink = document.createElement('a');
    roomLink.href = `${room}`;
    roomLink.innerText = "Join";
    roomContainer.append(roomElement);
    roomContainer.append(roomLink);
});

socket.on('chat-message', data=>{
    appendMessage(data);
});

socket.on('user-disconnect', user=>{
    appendMessage(`${user} has disconnected`);
});


function appendMessage(message){
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    messageContainer.append(msgElement);
}

