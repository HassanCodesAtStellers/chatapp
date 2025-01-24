import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import Chat from "../model/chat.model.js";
import e from "express";

export const getMessages = (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "message recieved successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { message } = req.body;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res
        .status(404)
        .json({ message: "Chat not found", success: false });
    }

    if (!chat.participants.includes(req.user._id)) {
      return res.status(403).json({
        message: "You don't have access to this chat",
        success: false,
      });
    }

    const newMessage = new Message({
      sender: req.user._id,
      content: message,
      chat: chatId,
    });

    await newMessage.save();

    return res.status(200).json({
      message: "Message sent successfully",
      success: true,
      newMessage,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const removeMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res
        .status(404)
        .json({ message: "Message not found", success: false });
    }

    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You don't have permission to delete this message",
        success: false,
      });
    }

    await Message.findByIdAndDelete(messageId);

    return res.status(204).json({ message: "Message deleted", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { updatedMessage } = req.body;
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res
        .status(404)
        .json({ message: "Message not found", success: false });
    }

    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You don't have permission to update this message",
        success: false,
      });
    }

    message.content = updatedMessage;
    await message.save();

    return res.status(201).json({
      message: "Message updated successfully",
      success: true,
      message,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
