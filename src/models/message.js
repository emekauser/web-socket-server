import mongoose from "mongoose";
const Schema = mongoose.Schema;

const message_schema = new Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports.Message = mongoose.model("message", message_schema, "messages");
