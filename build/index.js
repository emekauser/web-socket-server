"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _messageController = require("./controllers/message-controller");

var _messageController2 = _interopRequireDefault(_messageController);

var _websocket = require("./websocket");

var _websocket2 = _interopRequireDefault(_websocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 4000;
var app = (0, _express2.default)();

_mongoose2.default.connect("mongodb://localhost:27017/rockay", { useNewUrlParser: true });

app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.json());
var corsOptions = {
  origin: true,
  credentials: true
};
app.use((0, _cors2.default)(corsOptions));

app.get("/", function (req, res) {
  res.send("Hello world");
});
app.get("/get_messages", _messageController2.default.getMessages);
app.get("/get_active_users", _messageController2.default.getActiveUsers);

var server = app.listen(port, function () {
  console.log("server listening on port " + port);
});
_websocket2.default.initiateServer(server);