if (!window.WebSocket) {
	document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
}

// создать подключение
let socket = new WebSocket("ws://localhost:8081");

// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
  socket.send(this.message.value);
  document.getElementById('message_text').value = '';
  return false;
};

// обработчик входящих сообщений
socket.onmessage = function(event) {
  if (event.data instanceof Blob) {
    reader = new FileReader();

    reader.onload = () => {
      showMessage(reader.result);
    };

    reader.readAsText(event.data);
  } else {
    showMessage(reader.result);
  }
};

// показать сообщение в div#subscribe
function showMessage(message) {
  let messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);
}
