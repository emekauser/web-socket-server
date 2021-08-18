import socket from "socket.io";
import { Message } from "./models/message";
import { User } from "./models/user";

let io;
// initiate websocket server
const initiateServer = async server => {
  let config = {
    path: "/rockay_socket"
  };
  io = socket(server, config);
  io.on("connection", socket => {
    socket.on("start", name => {
      User.create({ name, socket_id: socket.id });
    });

    socket.on("disconnect", () => {
      User.deleteOne({ socket_id: socket.id }, (err, result) => {});
    });

    socket.on("message", async data => {
      const info = validateData(data);
      if (info) {
        return io.to(socket.id).emit("error", info);
      }

      if (checkForFowlWords(data.message.toLowerCase())) {
        io.to(socket.id).emit("error", "cannot send message with bad words");
      } else {
        const messageCount = await Message.find().countDocuments();
        if (messageCount > 49) {
          deleteOldestMessage();
        }

        Message.create(data, (err, result) => {
          if (err || !result) {
            io.to(socket.id).emit("error", "Error saving this message");
          } else {
            io.emit("message", result);
          }
        });
      }
    });
  });
};

//use to delete older messages
const deleteOldestMessage = async () => {
  Message.find()
    .limit(1)
    .exec(async (err, message) => {
      if (!err) {
        Message.deleteOne({ _id: message._id }, (err, result) => {});
      }
    });
};

//use to check ofr any bad words in a message
const checkForFowlWords = message => {
  const badWords = ["fuck", "bastard", "dickhead", "pussy", "f**k"];
  return badWords.some(word => {
    return message.indexOf(word) !== -1;
  });
};

//chat message validation
const validateData = data => {
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

export default { initiateServer };
