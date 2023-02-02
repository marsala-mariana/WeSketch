var path = require("path");
var express = require("express");
var app = express();
const socketio = require("socket.io");

var server = app.listen(1337, function () {
  console.log("Servidor levantado en el puerto  1337! 😊");
});

var io = socketio(server);
var strockes = [];

io.on("connection", function (socket) {
  console.log("Nueva conexion", socket.id);

  strockes.forEach(function (draw) {
    socket.emit("newDraw", draw.start, draw.end, draw.color);
  });

  socket.on("ownDraw", function (start, end, color) {
    strockes.push({ start, end, color });
    socket.broadcast.emit("newDraw", start, end, color);
  });
  socket.on("disconnect", function () {
    console.log("usuario desconectado");
  });
});

app.use(express.static(path.join(__dirname, "browser")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
