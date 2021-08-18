"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _message = require("../models/message");

var _user = require("../models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getMessages: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _message.Message.find().sort({ created_at: 1 }).exec(function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, messages) {
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!err) {
                            _context.next = 2;
                            break;
                          }

                          return _context.abrupt("return", res.status(200).json({
                            status: false,
                            message: "Error occurred while retrieving messages"
                          }));

                        case 2:
                          return _context.abrupt("return", res.status(200).json({ status: true, data: messages }));

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    function getMessages(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return getMessages;
  }(),

  getActiveUsers: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _user.User.find().exec(function () {
                var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(err, users) {
                  return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          if (!err) {
                            _context3.next = 2;
                            break;
                          }

                          return _context3.abrupt("return", res.status(200).json({
                            status: false,
                            message: "Error occurred while retrieving messages"
                          }));

                        case 2:
                          return _context3.abrupt("return", res.status(200).json({ status: true, data: users }));

                        case 3:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, undefined);
                }));

                return function (_x7, _x8) {
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

    function getActiveUsers(_x5, _x6) {
      return _ref3.apply(this, arguments);
    }

    return getActiveUsers;
  }()
};