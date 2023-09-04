const userName = document.querySelector(".userName");
const socket = io();
let nameUser = "";

Swal.fire({
  title: "Ingrese su Nombre",
  input: "text",
  inputAttributes: {
    autocapitalize: "on",
  },
  showCancelButton: false,
  confirmButtonText: "Ingesar",
}).then((result) => {
  userName.textContent = result.value;
  nameUser = result.value;
  socket.emit("userConnection", {
    user: result.value,
  });
});

const chatMessage = document.querySelector(".chatMessage");
let idUser = "";
const messageInnerHTML = (data) => {
  let message = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i].info === "connection") {
      message += `<p class="connection">${data[i].message}</p>`;
    }
    if (data[i].info === "message") {
      message += `
        <div class="messageUser">
            <h5>${data[i].name}</h5>
            <p>${data[i].message}</p>
        </div>
        `;
    }
  }

  return message;
};

socket.on("userConnection", (data) => {
  chatMessage.innerHTML = "";
  const connection = messageInnerHTML(data);
  chatMessage.innerHTML = connection;
});

const inputMessage = document.getElementById("inputMessage");
const btnMessage = document.getElementById("btnMessage");

btnMessage.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("userMessage", {
    message: inputMessage.value,
  });
});

socket.on("userMessage", (data) => {
  chatMessage.innerHTML = "";
  const message = messageInnerHTML(data);
  chatMessage.innerHTML = message;
});

inputMessage.addEventListener("keypress", () => {
  socket.emit("typing", { nameUser });
});

const typing = document.querySelector(".typing");
socket.on("typing", (data) => {
  typing.textContent = `${data.nameUser} escribiendo...`;
});
