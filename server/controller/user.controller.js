import User from "../model/user.model.js";
import Chat from "../model/chat.model.js";

export const getUser = async (req, res) => {
  try {
    if (!req.user._id || !req.user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const users = await User.find();
    if (!users) {
      return res
        .status(404)
        .json({ message: "No users were found", success: false });
    }

    return res.json({
      message: "Users fetched successfully",
      users,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const addUserToChat = async (req, res) => {
  const { userId } = req.params;
  const { chatId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return resizeBy
        .status(404)
        .json({ message: "Chat not found", success: false });
    }

    if (!chat.participants.includes(req.user._id)) {
      return resizeBy
        .status(403)
        .json({ message: "You have no access to this chat", success: false });
    }

    if (chat.participants.includes(userId)) {
      return res
        .status(409)
        .json({ message: "User already exists in the chat", success: false });
    }

    chat.participants.push(userId);
    await chat.save();

    return res
      .status(201)
      .json({ message: "User added successfully", success: true, chat });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const removeUserFromChat = async (req, res) => {
  const { userId } = req.params;
  const { chatId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(404)
        .json({ message: "Chat not found", success: false });
    }

    if (!chat.participants.includes(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You have no access to this chat", success: false });
    }

    if (!chat.participants.includes(userId)) {
      return res
        .status(404)
        .json({ message: "User not found in the chat", success: false });
    }

    chat.participants = chat.participants.filter(
      (participant) => participant._id.toString() !== userId.toString()
    );
    await chat.save();

    return res
      .status(201)
      .json({ message: "User removed successfully", success: true, chat });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
