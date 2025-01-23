import User from "../model/user.model.js";
import Chat from "../model/chat.model.js";
import { removeElementDuplications } from "../util/arrayMethods.js";

export const getChatRooms = async (req, res) => {
  try {
    const rooms = await Chat.find({ participants: req.user._id }).populate(
      "participants",
      "username email"
    );

    if (!rooms) {
      return res.status(404).json({ message: "No Room found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Rooms Fetched successfully", success: true, rooms });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const createChatRoom = async (req, res) => {
  let { participants, chatName } = req.body;
  participants.push(req.user._id);
  try {
    const users = await Promise.all(
      participants.map(async (participant) => {
        const user = await User.findById(participant);
        if (!user) {
          return res
            .status(404)
            .json({ message: "Invalid Users", success: false });
        }
        return user;
      })
    );

    if (!chatName) {
      chatName = `${Math.floor(Math.random() * 999999)}_${users[0]._id}`;
    }

    const userId = users.map((user) => user._id.toString());

    const filteredUsers = removeElementDuplications(userId);

    const newChat = await Chat.create({
      participants: filteredUsers,
      chatName,
    });
    await newChat.save();

    return res.status(201).json({
      message: "Room created Successfully",
      success: true,
      newChat,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};


