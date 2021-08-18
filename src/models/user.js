import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user_schema = new Schema(
  {
    name: { type: String },
    socket_id: { type: String }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports.User = mongoose.model("user", user_schema, "users");
