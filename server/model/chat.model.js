import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    chatName: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
