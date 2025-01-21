import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import config from "../config/env.config.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (user) {
      return res
        .status(400)
        .json({ message: "user already registered", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(200)
      .json({ message: "New user registered!!!", newUser, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Password not matched", success: false });
    }

    const jwtSecret = config.jwt_secret;
    const jwtToken = jwt.sign(
      {
        username: user.username,
        _id: user._id,
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: "5d",
      }
    );

    user.isOnline = true;
    await user.save();

    return res.status(200).json({
      message: "User logged in successfully",
      jwtToken,
      _id: user._id,
      username: user.username,
      email: user.email,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
