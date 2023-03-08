import User from "../Models/auth.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    User.findById(id, (err, doc) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (!doc) {
          res.status(400).json({ msg: "User not found." });
        } else {
          res.status(200).json(doc);
        }
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const usereDetail = await User.findById(id);
    const friends = await Promise.all(
      usereDetail.friends.map((id) => User.findById(id))
    );
    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friend } = req.params;
    const usereDetail = await User.findById(id);
    const friendDetail = await User.findById(friend);
    if (usereDetail.friends.includes(friend)) {
      usereDetail.friends = await usereDetail.friends.filter(
        (item) => item !== friend
      );
      friendDetail.friends = friendDetail.friends.filter((item) => item !== id);
    } else {
      usereDetail.friends.push(friend);
      friendDetail.friends.push(id);
    }
    await usereDetail.save();
    await friendDetail.save();
    const friends = await Promise.all(
      usereDetail.friends.map((item) => User.findById(item))
    );
    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
