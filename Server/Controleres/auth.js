import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../Models/auth.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile,
      impressions,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 100),
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({
      email,
    });
    if (!foundUser) {
      res.status(400).json({ msg: "User not found." });
    } else {
      const matched = await bcrypt.compare(password, foundUser.password);
      if (matched) {
        const token = await jwt.sign(
          { id: foundUser.id },
          process.env.JWT_SCECRATE
        );
        delete foundUser.password;
        res.status(200).json({ token, foundUser });
      } else {
        res.status(400).json({ msg: "Invalid credentials." });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
