//cliente

var socket = io(window.location.origin);

socket.on("connect", function () {
  console.log("Estoy conectado");
});

whiteboard.on("draw", function (start, end, color) {
  socket.emit("ownDraw", start, end, color);
});

socket.on("newDraw", function (start, end, color) {
  whiteboard.draw(start, end, color);
});
