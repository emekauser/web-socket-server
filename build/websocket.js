"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _message = require("./models/message");

var _user = require("./models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = void 0;
// initiate websocket server
var initiateServer = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(server) {
    var config;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = {
              path: "/rockay_socket"
            };

            io = (0, _socket2.default)(server, config);
            io.on("connection", function (socket) {
              socket.on("start", function (name) {
                _user.User.create({ name: name, socket_id: socket.id });
              });

              socket.on("disconnect", function () {
                _user.User.deleteOne({ socket_id: socket.id }, function (err, result) {});
              });

              socket.on("message", function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
                  var info, messageCount;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          info = validateData(data);

                          if (!info) {
                            _context.next = 3;
                            break;
                          }

                          return _context.abrupt("return", io.to(socket.id).emit("error", info));

                        case 3:
                          if (!checkForFowlWords(data.message.toLowerCase())) {
                            _context.next = 7;
                            break;
                          }

                          io.to(socket.id).emit("error", "cannot send message with bad words");
                          _context.next = 12;
                          break;

                        case 7:
                          _context.next = 9;
                          return _message.Message.find().countDocuments();

                        case 9:
                          messageCount = _context.sent;

                          if (messageCount > 49) {
                            deleteOldestMessage();
                          }

                          _message.Message.create(data, function (err, result) {
                            if (err || !result) {
                              io.to(socket.id).emit("error", "Error saving this message");
                            } else {
                              io.emit("message", result);
                            }
                          });

                        case 12:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function initiateServer(_x) {
    return _ref.apply(this, arguments);
  };
}();

//use to delete older messages
var deleteOldestMessage = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _message.Message.find().limit(1).exec(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(err, message) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!err) {
                          _message.Message.deleteOne({ _id: message._id }, function (err, result) {});
                        }

                      case 1:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x3, _x4) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function deleteOldestMessage() {
    return _ref3.apply(this, arguments);
  };
}();

//use to check ofr any bad words in a message
var checkForFowlWords = function checkForFowlWords(message) {
  var badWords = ["fuck", "bastard", "dickhead", "pussy", "f**k"];
  return badWords.some(function (word) {
    return message.indexOf(word) !== -1;
  });
};

//chat message validation
var validateData = function validateData(data) {
  if (!data.name) {
    return "Name is required";
  }

  if (!data.message) {
    return "message is required";
  }

  if (data.name.length <= 3 && data.name.length <= 30) {
    return "Name is less than 3 or greater than 30";
  }

  if (data.message.length <= 2 && data.message.length <= 100) {
    return "Message is less than 2 or greater than 100";
  }
  return null;
};

exports.default = { initiateServer: initiateServer };