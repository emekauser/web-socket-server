import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import messageController from "./controllers/message-controller";
import websocket from "./websocket";

const port = 4000;
const app = express();

mongoose.connect("mongodb://localhost:27017/test_db", {
  useNewUrlParser: true
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var corsOptions = {
  origin: true,
  credentials: true
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/get_messages", messageController.getMessages);
app.get("/get_active_users", messageController.getActiveUsers);

const server = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
websocket.initiateServer(server);
