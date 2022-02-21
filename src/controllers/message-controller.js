import { Message } from "../models/message";
import { User } from "../models/user";

export default {
  getMessages: async (req, res) => {
    Message.find()
      .sort({ created_at: 1 })
      .exec(async (err, messages) => {
        if (err)
          return res.status(400).json({
            status: false,
            message: "Error occurred while retrieving messages"
          });

        return res.status(200).json({ status: true, data: messages });
      });
  },

  getActiveUsers: async (req, res) => {
    User.find().exec(async (err, users) => {
      if (err)
        return res.status(400).json({
          status: false,
          message: "Error occurred while retrieving users"
        });

      return res.status(200).json({ status: true, data: users });
    });
  }
};
